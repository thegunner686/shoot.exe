var boxModel = new Model(loadMesh("box.obj"), loadTex("firewatch2.jpg"));
var box = new Entity(boxModel,
  function (self) {

  },
  function (self) {
    var m = SMath.createRotationMatrix(0, 0, 1);
    self.model.mesh = SMath.multiplyMesh(self.model.mesh, m);
});
