/**
     * Pixel class that store the r,g,and b values of a pixel
     */
class Pixel {
  /**
   * Constructor for the pixel class
   */
  constructor(r = 0, g = 0, b = 0) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}

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

/**
 * A class that explains a sphere parametrically
 */
class Sphere {
  /**
   * Create a sphere with the given center coordinate
   * and radius.
   * @param {Vector3} center The center of the sphere
   * @param {Number} radius - The radius of the sphere.
   * */
  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
  }
  /**
   * Calculate the intersection point between a ray and
   * this sphere.
   * @param {Vector3} o - The origin of the ray in question.
   * @param {Vector3} d - The direction of the ray in question.
   * @returns undefined if there are no real roots or both roots are 
   * behind the ray origin. The coordinate of the closest collision point otherwise.
   * */
  intersect(o, d) {
    let c = this.center;
    let r = this.radius;


    let A = 1;
    let B = 2 * o.dot(d);
    let C = o.dot(o) - r ** 2;

    let discriminant = B ** 2 - 4 * A * C;
    
    if (discriminant <= 0) {
      return undefined;
    }
    let sqrt = Math.sqrt(discriminant);
    let t1 = (-B - sqrt) / (2 * A)
    let t2 = (-B + sqrt) / (2 * A)
    
    let t;

    //If both collision points are positive, choose the closest one
    if (t1 > 0 && t2 > 0) {
      t = Math.min(t1, t2);
    }
    //Both collision points were not infront of the ray.
    else {
      //Check if t1 is positive
      if (t1 > 0)
        t = t1;
      //Check if t2 is positive
      else if(t2 > 0)
        t = t2;
      //They are both behind the ray origin
      else
        return undefined; //The only collision points were behind the origin of the ray
    }

    return new Vector3(o.x + t * d.x, o.y + t * d.y, o.z + t * d.z);
  }
}

/**
 * A class for storing x,y,and z values
 * */
class Vector3 {
  /**
   * Create a new Vector3.
   * Any parameters not supplied default to 0
   * */
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    Object.freeze(this);
  }
  /**
   * Create a new Vector3 of length 1
   * @returns {Vector3} A new Vector3 of length 1.
   * */
  normalize() {
    let length = this.length()
    return new Vector3(this.x / length, this.y / length, this.z / length);
  }

  length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2)
  }
  dot(other) {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }
  cross(other) {
    return new Vector3(this.y * other.z - this.z * other.y, this.z * other.x - this.x, other.z + this.x * other.y - this.y * other.x);
  }
  add(other) {
    return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
  }
  negate() {
    return new Vector3(-this.x, -this.y, -this.z);
  }
  minus(other) {
    return this.add(other.negate());
  }
}

function main() {
  let width = 100;
  let height = 100;
  let image = new Image(width, height);

  let canvas = document.querySelector("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d")

  //Test code
  let v3 = new Vector3(1, 2, 3);
  v3.x = 0;
  console.log(v3)
  let v4 = v3.normalize()
  console.log(v4)

  console.log(new Vector3(1, 1, 1).dot(new Vector3(0, 2, 0)))
  console.log(new Vector3(0, 0, 1).cross(new Vector3(1, 0, 0)))

  let sphere = new Sphere(new Vector3(-2, 0, 0), 1);
  let rayOrigin = new Vector3(0, 0, 0);
  let rayDirection = new Vector3(-1, 0, 0);
  let collision = sphere.intersect(rayOrigin, rayDirection)
  console.log(collision);

  //Ray Tracer starts

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (x == 50 && y == 52) {
        console.log("stop")
      }

      let startX = x - width / 2;
      let startY = y - height / 2;
      let origin = new Vector3(startX, startY, 51);
      let direction = new Vector3(0, 0, -1);
      let s = new Sphere(new Vector3(0, 0, 0), 50);
      let c = s.intersect(origin, direction);

      let rayTracedPixel = new Pixel(0, 0, 0);

      if(c){
        let normal = c.normalize()
        let dot = normal.dot(new Vector3(0,-1,0));
        if(dot <= 0)
          dot = 0
        rayTracedPixel = new Pixel(255 * dot,255*dot,255*dot);
      }

      image.setPixel(x, y, rayTracedPixel);


      let pixel = image.getPixel(x, y);
      let pixelString = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
      ctx.fillStyle = pixelString;
      ctx.fillRect(x, y, 1, 1);
    }
  }



  // for (let y = 0; y < height; y++) {
  //   for (let x = 0; x < width; x++) {
  //     if (x == 50 && y == 52) {
  //       console.log("stop")
  //     }
  //     let startX = x - width / 2;
  //     let startY = y - height / 2;
  //     let origin = new Vector3(startX, startY, 51);
  //     let direction = new Vector3(0, 0, -1);
  //     let s = new Sphere(new Vector3(0, 0, - 51), 50);
  //     let c = s.intersect(origin, direction);


  //     let rayTracedPixel = new Pixel(0, 0, 0);
  //     if (c) {
  //       let normal = c.minus(new Vector3(0,0,-51));

  //       let nNormalized = normal.normalize();
  //       let directionToSun = new Vector3(0, 1, 0);
  //       let brightness = nNormalized.dot(directionToSun);
  //       brightness *= -1
  //       if (brightness < 0)
  //         brightness = 0;
  //       rayTracedPixel = new Pixel(255 * brightness, 255 * brightness, 255 * brightness);

  //     }
  //     else {
  //       rayTracedPixel = new Pixel(0, 0, 0);

  //     }

  //     image.setPixel(x, y, rayTracedPixel);


  //     let pixel = image.getPixel(x, y);
  //     let pixelString = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
  //     ctx.fillStyle = pixelString;
  //     ctx.fillRect(x, y, 1, 1);
  //   }
  // }

}

main();