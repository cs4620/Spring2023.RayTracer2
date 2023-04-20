



/**
 * Run our ray tracer
 * @param {Number} width The width of the rendederd image
 * @param {Number} height The height of the rendered image
 */
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
}
//Run the main ray tracer
main();
