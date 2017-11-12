class Box extends Renderable
{
  function setup() {
    var mesh = loadMesh("box.obj");
    var tex = loadTex("firewatch2.jpg");
    this.model = new Model(mesh, tex);
  }

  function update() {
    m = SMath.createRotationMatrix(0, 0, 1);
    this.model.mesh = SMath.multiplyMesh(this.model.mesh, m);
  }

  function getModel() {
    return this.model;
  }
}
