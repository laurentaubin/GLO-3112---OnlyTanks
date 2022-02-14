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

export default class S3FileRepository implements FileRepository {
  private storageInformation: S3StorageConfiguration;
  private storageReportAssembler: StorageReportAssembler;

  private readonly bucketName: string = getS3Config().AWS_BUCKET_NAME;
  private s3: S3;

  constructor(storageInformation: S3StorageConfiguration, storageReportAssembler: StorageReportAssembler) {
    this.storageInformation = storageInformation;
    this.storageReportAssembler = storageReportAssembler;
    const S3Constructor = this.storageInformation.getS3StorageConfig();
    this.s3 = new S3(S3Constructor);
  }

  public async storeImage(file: File): Promise<StorageReport> {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: this.bucketName,
      Body: fileStream,
      Key: file.fileName,
      ContentType: "image/jpeg"
    };

    const result: S3StorageReportResponse = await this.s3.upload(uploadParams).promise();

    await this.removeServerImage(file);

    return this.storageReportAssembler.assembleStorageReport(result);
  }

  public async removeServerImage(file: File) {
    const unlinkFile = util.promisify(fs.unlink);
    await unlinkFile(file.path);
  }
}
