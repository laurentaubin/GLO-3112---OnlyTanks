import FileRepository from "../domain/FileRepository";
import S3 from "aws-sdk/clients/s3";
import fs from "fs";
import S3StorageConfiguration from "./S3StorageConfiguration";
import util from "util";
import S3StorageReportResponse from "./S3StorageReportResponse";
import { getS3Config } from "../../config";
import StorageReportAssembler from "./StorageReportAssembler";
import StorageReport from "../domain/StorageReport";
import File from "../domain/File";
import ImageUrlVerificator from "../service/ImageUrlVerificator";
import ImageResizer from "../service/ImageResizer";

export default class S3FileRepository implements FileRepository {
  private readonly storageInformation: S3StorageConfiguration;
  private readonly storageReportAssembler: StorageReportAssembler;
  private readonly imageResizer: ImageResizer;
  private readonly imageUrlVerifcator: ImageUrlVerificator;

  private readonly bucketName: string = getS3Config().AWS_BUCKET_NAME;
  private s3: S3;

  constructor(
    storageInformation: S3StorageConfiguration,
    storageReportAssembler: StorageReportAssembler,
    imageResizer: ImageResizer,
    imageUrlVerificator: ImageUrlVerificator
  ) {
    this.storageInformation = storageInformation;
    this.storageReportAssembler = storageReportAssembler;
    this.imageResizer = imageResizer;
    this.s3 = new S3(this.storageInformation.getS3StorageConfig());
    this.imageUrlVerifcator = imageUrlVerificator;
  }

  public async storeImage(file: File, thumbnail?: boolean, preview?: boolean): Promise<StorageReport> {
    if (thumbnail) {
      await this.uploadThumbnailImage(file);
    }

    if (preview) {
      await this.uploadPreviewImage(file);
    }

    const storageResponse: S3StorageReportResponse = await this.uploadNormalImage(file);

    await this.removeServerImage(file);

    return this.storageReportAssembler.assembleStorageReport(storageResponse);
  }

  private async uploadNormalImage(file: File): Promise<S3StorageReportResponse> {
    const buffer = await this.imageResizer.resizeToNormal(file.path);

    return this.uploadImageToS3(buffer, file.fileName);
  }

  private async uploadThumbnailImage(file: File): Promise<void> {
    const thumbnailBuffer = await this.imageResizer.resizeToThumbnail(file.path);
    const thumbNailFileName = this.imageUrlVerifcator.getThumbnailUrl(file.fileName);

    await this.uploadImageToS3(thumbnailBuffer, thumbNailFileName);
  }

  private async uploadPreviewImage(file: File): Promise<void> {
    const previewBuffer = await this.imageResizer.resizeToPreview(file.path);
    const previewFilename = this.imageUrlVerifcator.getPreviewUrl(file.fileName);

    await this.uploadImageToS3(previewBuffer, previewFilename);
  }

  private async uploadImageToS3(buffer: Buffer, filename: string) {
    const uploadParams = {
      Bucket: this.bucketName,
      Body: buffer,
      Key: filename,
      ContentType: "image/jpeg"
    };

    return this.s3.upload(uploadParams).promise();
  }

  public async removeServerImage(file: File) {
    const unlinkFile = util.promisify(fs.unlink);
    await unlinkFile(file.path);
  }
}
