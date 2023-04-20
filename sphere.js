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