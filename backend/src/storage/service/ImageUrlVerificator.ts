import axios from "axios";
import { status } from "../../api/Status";

class ImageUrlVerificator {
  public async verifyThumbnail(url: string): Promise<string> {
    try {
      const thumbnailUrl = this.getThumbnailUrl(url);
      const response = await axios.get(thumbnailUrl);
      return response.status === status.OK ? thumbnailUrl : url;
    } catch (e) {
      return url;
    }
  }

  public async verifyPreview(url: string): Promise<string> {
    try {
      const previewUrl = this.getPreviewUrl(url);
      const response = await axios.get(previewUrl);
      return response.status === status.OK ? previewUrl : url;
    } catch (e) {
      return url;
    }
  }

  public getThumbnailUrl(url: string): string {
    return `${url}_thumbnail`;
  }

  public getPreviewUrl(url: string): string {
    return `${url}_preview`;
  }
}

export default ImageUrlVerificator;
