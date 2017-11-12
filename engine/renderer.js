
function Renderer() {
  var projMatrix;
  var winWidth;
  var winHeight;

  function initRender(winWidth, winHeight) {
    this.projMatrix = MatBuilder.projectionMatrix(50, .1, 1000); //fov, near, far
    this.winWidth = winWidth;
    this.winHeight = winHeight;
  }

  function render(worldModels, camTransform) {
    var wToC = camTransform.getMatrix().invert();
    var depthbuffer = [];
    for (var i = 0; i < this.winWidth*this.winHeight; i++) {
      depthbuffer.push(100000000000000);
    }
    var framebuffer = [];
    for (var i = 0; i < worldModels.length; i++) {
      var model = worldModels[i];
      model.mesh = SMath.multiplyMesh(model.mesh, wToC);
      model.mesh = SMath.multiplyMesh(model.mesh, this.projMatrix);
      var vs = model.mesh.verts;
      var ts = model.mesh.tris[0];
      var ttcs = model.mesh.tris[1];
      var tcs = model.mesh.texCoords;
      for (var i = 0; i < worldMesh.tris[0].length/3; i++) {
        var v1 = SMath.cvtNDCToRaster(vs[ts[3*i]]);
        var v2 = SMath.cvtNDCToRaster(vs[ts[3*i+1]]);
        var v2 = SMath.cvtNDCToRaster(vs[ts[3*i+2]]);
        v1.z = 1/v1.z;
        v2.z = 1/v2.z;
        v3.z = 1/v3.z;
        var maxx = Math.floor(Math.max(v1.x, Math.max(v2.x, p3.x)));
    		var minx = Math.floor(Math.min(v1.x, Math.min(v2.x, p3.x)));
    		var maxy = Math.floor(Math.max(v1.y, Math.max(v2.y, p3.y)));
    		var miny = Math.floor(Math.min(v1.y, Math.min(v2.y, p3.y)));

        if (!(minx > this.winWidth-1) && !(maxx < 0) && !(miny > this.winHeight-1) && !(maxy < 0)) {
          var x0 = Math.max(0, minx);
    			var x1 = Math.min(this.winWidth-1, maxx);
    			var y0 = Math.max(0,  miny);
    			var y1 = Math.min(this.winHeight-1, maxy);
    			var area = SMath.edgeFunction(v1, v2, v3);
          for (var y = y0; y < y1; y++) {
            for (var x = x0; x < x1; x++) {
              var w0 = SMath.edgeFunction(v2, p3, new Vec3(x, y, 0));
    					var w1 = SMath.edgeFunction(p3, v1, new Vec3(x, y, 0));
    					var w2 = SMath.edgeFunction(v1, v2, new Vec3(x, y, 0));

              if((w0 >= 0 && w1 >= 0 && w2 >= 0) || (w0 <= 0 && w1 <= 0 && w2 <= 0)) {
    			      w0 /= area;
    					  w1 /= area;
    					  w2 /= area;

    						var oneOverZ = v1.z * w0 + v2.z * w1 + p3.z * w2;
    		        var z = 1 / oneOverZ;

                if(z < depthbuffer[y*this.winWidth+x]) {
    		          depthbuffer[y*this.winWidth+x] = z;

                  var tc1 = tcs[ttcs[3*i]];
                  var tc2 = tcs[ttcs[3*i+1]];
                  var tc3 = tcs[ttcs[3*i+2]];

                  var texX = tc1.x*w0 + tc2.x*w1 + tc3.x*w2;
                  var texY = tc1.y*w0 + tc2.y*w1 + tc3.y*w2;
                  framebuffer[y*this.winWidth+x] = model.texture.data[texX, texY];
    		        }
              }
            }
          }
        }
      }
    }
    // finally
    for(var y = 0; y < this.winHeight; y++) {
      for (var x = 0; x < this.winWidth; x++) {
        ctx.fillStyle(getRGBA(framebuffer[y*this.winWidth+x]));
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  function getRGBA(arr) {
      return "rgba(" + arr[0] + "," + arr[1] + "," + arr[2] + "," + arr[3] + ")";
  }
}
