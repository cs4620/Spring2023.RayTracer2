



/**
 * Run our ray tracer
 * @param {Number} width The width of the rendederd image
 * @param {Number} height The height of the rendered image
 */
function main(width = 100, height = 100) {

  //Create a new image object to save as a file
  let image = new Image(width, height);

  //Setup the canvas element for realtime results
  let canvas = document.querySelector("canvas");
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext("2d")

  //Ray Tracer start
  let s = new Sphere(new Vector3(-20, 0, -10), 25);
  let s2 = new Sphere(new Vector3(20, 0, -10), 30);

  let spheres = [s, s2]

  let directionToSun = new Vector3(1,-1,1).normalize();

  //Loop over every pixel in our image
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      //A great place to drop a breakpoint if we need to debug
      if (x == 50 && y == 50) {
        console.log("stop")
      }
      let lowestPositiveT = 10000;
      //Create the default pixel
      //We change this if hit anything
      let rayTracedPixel = new Pixel(255, 0, 0);
      for (let s of spheres) {

        //Adjust the start x and y values so that we
        //go from [-width/2,width/2] instead of [0,width]
        //Same with height.
        let startX = x - width / 2;
        let startY = y - height / 2;

        //Calculate the origin of a ray that is part of 
        //an orthographic projection
        let origin = new Vector3(startX, startY, 51);

        //The direction of our ray. 
        //In a perspective project, this would change to go 
        //through the pixel in question.
        let direction = new Vector3(0, 0, -1);

        //Generate the sphere against which we will ray trace

        //Calculate the point of intersection between the
        //ray and the sphere
        let collision = s.intersect(origin, direction);



        //If we hit an object
        if (collision && collision.t < lowestPositiveT) {
          lowestPositiveT = collision.t

          let c = collision.v;

          //Calculate the normal at the collision point
          //Since we are working with spheres centered around 
          //the origin, this is a trival calculation.
          let normal = c.minus(s.center).normalize()

          //Calculate the dot product between the normal and 
          //the direction to the "sun"
          let dot = normal.dot(directionToSun);

          //If the dot product is negative, 
          //clamp it to 0
          if (dot <= 0)
            dot = 0

          //Update the color of the pixel based on our shading
          rayTracedPixel = new Pixel(255 * dot, 255 * dot, 255 * dot);
        }

        //Assign the pixel to the image
        image.setPixel(x, y, rayTracedPixel);


        //Grab the pixel information for (x,y)
        let pixel = image.getPixel(x, y);
        //Get the color into a string that js understands
        let pixelString = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
        //Set the fill style to be the color of the pixel
        ctx.fillStyle = pixelString;
        //Fill one pixel (which is why the width and height are just 1)
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }
}
//Run the main ray tracer
main();
