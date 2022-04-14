export interface GoogleMediaMedata {
  creationTime: string;
  width: string;
  height: string;
  photo: any;
}

export interface GooglePhotoResponse {
  id: string;
  productUrl: string;
  baseUrl: string;
  mimeType: string;
  mediaMetadata: GoogleMediaMedata;
  filename: string;
}
