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
   * Calculates the intersection point between a ray and
   * this sphere.
   * @param {Vector3} o - The origin of the ray
   * @param {Vector3} d - The direction of the ray
   * @returns undefined if there are no real roots or both roots are 
   * behind the ray origin, the coordinate of the closest collision point otherwise
   * */
  intersect(o, d) {

    //Grab the sphere center and radius
    let c = this.center;
    let r = this.radius;
    let oMinusC = o.minus(c);
    let oMinusCSquared = oMinusC.dot(oMinusC);

    //Calculate the discriminant
    let discriminant = (d.dot(oMinusC)) ** 2 -(oMinusCSquared - r**2)

    //If the discriminant is not positive, 
    //We either don't have any collisions or we 
    //have a perfect "graze". 
    //In either case we indicate there was not a 
    //colission by returning undefined
    if (discriminant <= 0) {
      return undefined;
    }

    //Calculate the squart root of the determinant
    //and then store the two possible t values
    let sqrt = Math.sqrt(discriminant);
    let t1 = -d.dot(oMinusC) - sqrt
    let t2 = -d.dot(oMinusC) + sqrt

    //Initialize the t value we used to calculate
    //our return value
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
      else if (t2 > 0)
        t = t2;
      //They are both behind the ray origin
      else
        return undefined; //The only collision points were behind the origin of the ray
    }

    //Multiply the direction by t and then add it to the origin
    return new Vector3(o.x + t * d.x, o.y + t * d.y, o.z + t * d.z);
  }
}