var Mesh = function(tris, verts, texCoords) {
  this.tris = tris;
  this.verts = verts;
  this.texCoords = texCoords;
}
 var Model = function (mesh, texture) {
   this.mesh = mesh;
   this.texture = texture;
 }

 var Texture = function (height, width, data) {
   this.height = height;
   this.width = width;
   this.data = data;
 }
