/**
 * An image class to store pixel
 * These pixels can then be sent to an image
 */
class Image {
  /**
   * Create an image with the given width and height
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.pixelData = [];

    //Loop over all the pixels and assign them to the default pixel values
    for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
      let rowData = [];
      this.pixelData.push(rowData);
      for (let columnIndex = 0; columnIndex < this.width; columnIndex++) {
        rowData.push(new Pixel());
      }
    }
  }
  /**
   * Set an individual pixel
   * @param {Number} x - The x coordinate of the pixel to set.
   * @param {Number} y - The y coordinate of the pixel to set.
   * @param {Pixel} pixel - The r,g,and b value to set.
   */
  setPixel(x, y, pixel) {
    this.pixelData[x][y] = pixel;
  }
  /**
   * Get the r,b,and b values at a given (x,y) location.
   * @param {Number} x - The x coordinate of the pixel to get.
   * @param {Number} y - The y coordinate of the pixel to get.
   */
  getPixel(x, y) {
    return this.pixelData[x][y];
  }
}