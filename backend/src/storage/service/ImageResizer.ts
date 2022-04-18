const sharp = require("sharp");

class ImageResizer {
  private readonly MAXIMUM_PIXEL_WIDTH: number = 400;

  private readonly THUMBNAIL_PIXEL_WIDTH: number = 100;

  private readonly PREVIEW_PIXEL_WIDTH: number = 200;

  public async resizeToNormal(filepath: string): Promise<Buffer> {
    return this.resize(filepath, this.MAXIMUM_PIXEL_WIDTH);
  }

  public resizeToThumbnail(filepath: string): Promise<Buffer> {
    return this.resize(filepath, this.THUMBNAIL_PIXEL_WIDTH);
  }

  public resizeToPreview(filepath: string): Promise<Buffer> {
    return this.resize(filepath, this.PREVIEW_PIXEL_WIDTH);
  }

  private async resize(filepath: string, width: number): Promise<Buffer> {
    return sharp(filepath)
      .resize({
        width,
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFormat("jpeg")
      .toBuffer();
  }
}

export default ImageResizer;
