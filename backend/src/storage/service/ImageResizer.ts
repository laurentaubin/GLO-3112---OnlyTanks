const sharp = require("sharp");

class ImageResizer {
  private readonly MAXIMUM_PIXEL_WIDTH: number = 300;
  private readonly MAXIMUM_PIXEL_HEIGHT: number = 300;

  private readonly THUMBNAIL_PIXEL_WIDTH: number = 100;
  private readonly THUMBNAIL_PIXEL_HEIGHT: number = 100;

  private readonly PREVIEW_PIXEL_WIDTH: number = 192;
  private readonly PREVIEW_PIXEL_HEIGHT: number = 192;

  public async resizeToNormal(filepath: string): Promise<Buffer> {
    return this.resize(filepath, this.MAXIMUM_PIXEL_WIDTH, this.MAXIMUM_PIXEL_HEIGHT);
  }

  public resizeToThumbnail(filepath: string): Promise<Buffer> {
    return this.resize(filepath, this.THUMBNAIL_PIXEL_WIDTH, this.THUMBNAIL_PIXEL_HEIGHT);
  }

  public resizeToPreview(filepath: string): Promise<Buffer> {
    return this.resize(filepath, this.PREVIEW_PIXEL_WIDTH, this.PREVIEW_PIXEL_HEIGHT);
  }

  private async resize(filepath: string, width: number, height: number): Promise<Buffer> {
    return sharp(filepath).resize({ width, height }).toBuffer();
  }
}

export default ImageResizer;
