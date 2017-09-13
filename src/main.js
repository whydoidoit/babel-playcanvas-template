// !!!REQUIRED IMPORTS!!!
import 'createscript';

/**********************************************/
/* Useful PlayCanvas polyfills and extensions */
/**********************************************/

// Add pc.Quat.temp() and pc.Vec3.temp() working vectors
import 'playcanvas-working-vectors';

// Add pc.utils.moveTowards to move a value towards another
// in a linear time step
import 'playcanvas-movetowards';

// Add pc.Entity.prototype.ofType(componentOrScriptName)
import 'playcanvas-of-type';

// Add hierarchy message calling on any script
// Add pc.Entity.prototype.broadcast(message, parameter, ...)
// Add pc.Entity.prototype.sendUpwards(message, parameter, ...)
// Add pc.Entity.prototype.send(message, parameter, ...)
import 'playcanvas-sendmessage';

// Add pc.Vec3.prototype.X(value) [.Y(), .Z()] and .addX(v) [.addY(), .addZ()]
import 'playcanvas-vector-extensions';

// Add pc.Vec3.prototype.angle
// Add pc.Vec3.prototype.mul(Quaternion)
// pc.Quat.prototype.lookAt(position)
// pc.Quat.prototype.fromToRotation(vector, vector)
// pc.Quat.prototype.twist(axis)
import 'playcanvas-vector-math';

// Patch Math.sign for browsers that don't support it
import 'whydoidoit-sign';

//Add multiple inheritance to pc.inherits
import 'javascript-dual-inherit'


/**********************************************/
/* Your code                                  */
/**********************************************/

import './example.js';

