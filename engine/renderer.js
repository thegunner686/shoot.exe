
class Renderer {
  var projMatrix;
  var winWidth;
  var winHeight;

  function initRender(winWidth, winHeight) {
    this.projMatrix = CMath.createProjMatrix(50, .1, 1000); //fov, near, far
    this.winWidth = winWidth;
    this.winHeight = winHeight;
  }

  function render(worldModels, camTransform) {
    var wToC = camTransform.getMatrix().invert();
    var depthbuffer;
    for (var i = 0; i < this.winWidth*this.winHeight; i++) {
      depthbuffer[i] = 100000000000000;
    }
    var framebuffer;
    for (var model in worldModels) {
      if (worldModels.hasOwnProperty(model)) {


        model.mesh = CMath.multiplyMesh(model.mesh, wToC);
        model.mesh = CMath.multiplyMesh(model.mesh, this.projMatrix);
        var vs = model.mesh.verts;
        var ts = model.mesh.tris;
        for (var i = 0; i < worldMesh.tris.length/3; i++) {
          var v1 = CMath.cvtNDCToRaster(vs[ts[3*i]]);
          var v2 = CMath.cvtNDCToRaster(vs[ts[3*i+1]]);
          var v2 = CMath.cvtNDCToRaster(vs[ts[3*i+2]]);
          v1.z = 1/v1.z;
          v2.z = 1/v2.z;
          v3.z = 1/v3.z;

          var maxx = Math.floor(Math.max(p1.x, Math.max(p2.x, p3.x)));
      		var minx = Math.floor(Math.min(p1.x, Math.min(p2.x, p3.x)));
      		var maxy = Math.floor(Math.max(p1.y, Math.max(p2.y, p3.y)));
      		var miny = Math.floor(Math.min(p1.y, Math.min(p2.y, p3.y)));

          if (!(minx > this.winWidth-1) && !(maxx < 0) && !(miny > this.winHeight-1) && !(maxy < 0)) {
            var x0 = Math.max(0, minx);
      			var x1 = Math.min(this.winWidth-1, maxx);
      			var y0 = Math.max(0,  miny);
      			var y1 = Math.min(this.winHeight-1, maxy);

      			var area = edgeFunction(v1, v2, v3);

            for (var y = y0; y < y1; y++) {
              for (var x = x0; x < x1; x++) {
                var w0 = edgeFunction(p2, p3, new Vec3(x, y, 0));
      					var w1 = edgeFunction(p3, p1, new Vec3(x, y, 0));
      					var w2 = edgeFunction(p1, p2, new Vec3(x, y, 0));

                if((w0 >= 0 && w1 >= 0 && w2 >= 0) || (w0 <= 0 && w1 <= 0 && w2 <= 0) {
      			      w0 /= area;
      					  w1 /= area;
      					  w2 /= area;

      						var oneOverZ = p1.z * w0 + p2.z * w1 + p3.z * w2;
      		        var z = 1 / oneOverZ;

                  if(z < depthbuffer[y*winWidth+x]) {
      		          depthbuffer[y*winWidth+x] = z;
      		        }
                }
              }
            }
          }
        }
      }
    }
  }
}
