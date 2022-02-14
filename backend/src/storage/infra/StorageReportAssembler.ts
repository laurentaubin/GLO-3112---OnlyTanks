import S3StorageReportResponse from "./S3StorageReportResponse";
import StorageReport from "../domain/StorageReport";

class StorageReportAssembler {
  public assembleStorageReport(s3StorageReportResponse: S3StorageReportResponse): StorageReport {
    return {
      imageUrl: s3StorageReportResponse.Location
    };
  }
}

export default StorageReportAssembler;
