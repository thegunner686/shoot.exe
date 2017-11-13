function SMath () {}
SMath.multiplyMesh = function (model, mat) {
  var mesh = model.mesh;
  for (var i = 0; i < mesh.verts.length; i++) {
   mesh.verts[i] = SMath.multVecMat(mesh.verts[i], mat);
  }
  model.mesh = mesh;
  return mesh;
}

SMath.cvtNDCToRaster = function (ndc, winWidth, winHeight) {
  var raster = new Vector3();
	raster.x = (ndc.x+1) * .5 * winWidth;
	raster.y = (1-ndc.y) * .5 * winHeight;
	raster.z = ndc.z;
	return raster;
}

SMath.edgeFunction = function (a, b, c) {
  return (c.x - a.x) * (b.y - a.y) - (c.y - a.y) * (b.x - a.x);
}

SMath.toRadians = function (degrees) {
  return degrees * Math.PI / 180;
}

SMath.toDegrees = function (radians) {
  return radians * 180 / Math.PI;
}

function MatBuilder() {}

MatBuilder.xAxisRotationMatrix = function (degrees) {
  var r = SMath.toRadians(degrees);
  return [1,	     	   0,	           0, 0,
					0, Math.cos(r), -Math.sin(r), 0,
					0, Math.sin(r),  Math.cos(r), 0,
					0,		       0,		         0, 1];
}

MatBuilder.yAxisRotationMatrix = function (degrees) {
  var r = SMath.toRadians(degrees);
	return [Math.cos(r),  0,  Math.sin(r), 0,
			 		0, 	          1, 	          0, 0,
				 	-Math.sin(r), 0,  Math.cos(r), 0,
				 	0, 	 	        0,	          0, 1];
}

MatBuilder.zAxisRotationMatrix = function (degrees) {
  var r = SMath.toRadians(degrees);
	return [Math.cos(r), -Math.sin(r), 0, 0,
				  Math.sin(r),  Math.cos(r), 0, 0,
			    0,	                    0, 1, 0,
					0,			                0, 0, 1];
}

MatBuilder.rotationMatrix = function (x, y, z) {
  var xMat = MatBuilder.xAxisRotationMatrix(x);
	var yMat = MatBuilder.yAxisRotationMatrix(y);
	var zMat = MatBuilder.zAxisRotationMatrix(z);
  var temp = SMath.multMatMat(xMat, yMat);
  return SMath.multMatMat(temp, zMat);
}

MatBuilder.translationMatrix = function (x, y, z) {
  return [1, 0, 0, 0,
					0, 1, 0, 0,
					0, 0, 1, 0,
					x, y, z, 1];
}

MatBuilder.scaleMatrix = function (x, y, z) {
  return [x, 0, 0, 0,
					0, y, 0, 0,
					0, 0, z, 0,
					0, 0, 0, 1];
}

MatBuilder.projectionMatrix = function (fov, f, n) {
  var fovRad = SMath.toRadians(fov);
	var scale = 1/Math.tan(fovRad/2);
	return [scale, 	0, 		    	  0,  0,
					0, 	scale, 		  	    0,  0,
					0,			0, 	   -f/(f-n), -1,
					0,			0, -(f*n)/(f-n),  0];
}

SMath.multVecMat = function (v, m) {
  var w = 1;
	var ans = new Vector3();
	ans.x = v.x*m[0][0] + v.y*m[1][0] + v.z*m[2][0] + w*m[3][0];
	ans.y = v.x*m[0][1] + v.y*m[1][1] + v.z*m[2][1] + w*m[3][1];
	ans.z = v.x*m[0][2] + v.y*m[1][2] + v.z*m[2][2] + w*m[3][2];
	w 	  = v.x*m[0][3] + v.y*m[1][3] + v.z*m[2][3] + w*m[3][3];

	// for projection matricies
	if(w==1||w==0)
		return ans;
	ans.x/=w;
	ans.y/=w;
	ans.z/=w;
	return ans;
}

SMath.multMatMat = function (A, B) {
  var aRows = A.length;
  var aColumns = A[0].length;
  var bRows = B.length;
  var bColumns = B[0].length;

  var C = new Array(aRows);
  for (var i = 0; i < C.length; i++) {
    C[i] = new Array(bRows);
    for (var j = 0; j < C[i].length; j++) {
      C[i][j] = 0.00000;
    }
  }

  for (var i = 0; i < aRows; i++) { // aRow
      for (var j = 0; j < bColumns; j++) { // bColumn
          for (var k = 0; k < aColumns; k++) { // aColumn
              C[i][j] += A[i][k] * B[k][j];
          }
      }
  }

  return C;
}

SMath.matInverse = function (m) {
  var a = m;
	var n = a.length;
  var x = new Array(n);
  for (var i = 0; i < x.length; i++) {
    x[i] = new Array(n);
  }
  var b = new Array(n);
  for (var i = 0; i < b.length; i++) {
    b[i] = new Array(n);
  }
  var index = new Array(n)
  for (var i=0; i<n; ++i)
      b[i][i] = 1;

 // Transform the matrix into an upper triangle
 SMath.gaussian(a, index);

 // Update the matrix b[i][j] with the ratios stored
 for (var i=0; i<n-1; ++i)
    for (var j=i+1; j<n; ++j)
        for (var k=0; k<n; ++k)
            b[index[j]][k]
            	    -= a[index[j]][i]*b[index[i]][k];

 // Perform backward substitutions
  for (var i=0; i<n; ++i) {
      x[n-1][i] = b[index[n-1]][i]/a[index[n-1]][n-1];
      for (var j=n-2; j>=0; --j) {
          x[j][i] = b[index[j]][i];
          for (var k=j+1; k<n; ++k) {
              x[j][i] -= a[index[j]][k]*x[k][i];
          }
          x[j][i] /= a[index[j]][j];
      }
    }
        return x;
	}

SMath.gaussian = function(a, index) {
  var n = index.length;
  var c = new Array(n);

  // Initialize the index
  for (var i=0; i<n; ++i)
    index[i] = i;

  // Find the rescaling factors, one from each row
  for (var i=0; i<n; ++i) {
    var c1 = 0;
    for (var j=0; j<n; ++j) {
      var c0 = Math.abs(a[i][j]);
      if (c0 > c1) c1 = c0;
    }
    c[i] = c1;
  }

 // Search the pivoting element from each column
  var k = 0;
  for (var j=0; j<n-1; ++j) {
    var pi1 = 0;
    for (var i=j; i<n; ++i) {
      var pi0 = Math.abs(a[index[i]][j]);
      pi0 /= c[index[i]];
      if (pi0 > pi1) {
        pi1 = pi0;
        k = i;
      }
    }

   // Interchange rows according to the pivoting order
    var itmp = index[j];
    index[j] = index[k];
    index[k] = itmp;
    for (var i=j+1; i<n; ++i) {
      var pj = a[index[i]][j]/a[index[j]][j];
      // Record pivoting ratios below the diagonal
      a[index[i]][j] = pj;

      // Modify other elements accordingly
      for (var l=j+1; l<n; ++l)
        a[index[i]][l] -= pj*a[index[j]][l];
    }
  }
}

function Vector3(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

function Vector2(x, y) {
  this.x = x;
  this.y = y;
}

function Transform(pos, rot) {
  this.pos = pos;
  this.rot = rot;
  this.posMat = SMath.multMatMat(MatBuilder.translationMatrix(pos.x, pos.y, pos.z),
                           MatBuilder.rotationMatrix(rot.x, rot.y, rot.z));
  this.rotMat = SMath.multMatMat(MatBuilder.translationMatrix(rot.x, rot.y, rot.z),
                           MatBuilder.rotationMatrix(rot.x, rot.y, rot.z));

  function setPosition(p) {
    this.pos = p;
    this.posMat = SMath.multMatMat(MatBuilder.translationMatrix(pos.x, pos.y, pos.z),
                             MatBuilder.rotationMatrix(rot.x, rot.y, rot.z));
  }

  function setRotation(r) {
    this.rot = r;
    this.rotMat = SMath.multMatMat(MatBuilder.translationMatrix(rot.x, rot.y, rot.z),
                             MatBuilder.rotationMatrix(rot.x, rot.y, rot.z));
  }
}
