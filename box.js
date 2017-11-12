var boxModel = new Model(loadMesh("box.obj"), loadTex("firewatch2.jpg"));
var box = new Entity(boxModel,
  function (this) {

  },
  function (this) {
    var m = SMath.createRotationMatrix(0, 0, 1);
    this.model.mesh = SMath.multiplyMesh(this.model.mesh, m);
});
