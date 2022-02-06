import PictureStorage from "../domain/PictureStorage";
import S3 from "aws-sdk/clients/s3";
import fs from "fs";
import StorageInformation from "./StorageInformation";
import util from "util";
import StorageResponse from "../domain/S3StorageResponse";
import { FileRequest } from "../domain/FileRequest";
import { getS3Config } from "../../config/index";

export default class S3PictureStorage implements PictureStorage {
  private storageInformation: StorageInformation;

  private readonly bucketName: string = getS3Config().AWS_BUCKET_NAME;
  private s3: S3;

  constructor(storageInformation: StorageInformation) {
    this.storageInformation = storageInformation;
    const S3Constructor = this.storageInformation.getS3StorageConfig();
    this.s3 = new S3(S3Constructor);
  }

  public async store(file: FileRequest): Promise<StorageResponse> {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: this.bucketName,
      Body: fileStream,
      Key: file.filename,
      ContentType: "image/jpeg"
    };

    const result = await this.s3.upload(uploadParams).promise();

    this.removeServerImage(file);

    return result;
  }

  public async removeServerImage(file: FileRequest) {
    const unlinkFile = util.promisify(fs.unlink);
    await unlinkFile(file.path);
  }
}
