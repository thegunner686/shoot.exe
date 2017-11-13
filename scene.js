function Scene() {
  this.renderer = new Renderer();
  this.camTransform = new Transform(new Vector3(0, 0, 10),
                                   new Vector3(0, 0, 0));
}

Scene.prototype.setup = function() {
    box.setup();
    this.renderer.initRender(window.innerWidth, window.innerHeight);
    // var pos = new Vector3(0, 0, -10);
    // var rot = new Vector3(0, 0, 0);
    // camTransform = new Transform(pos, rot);
  }

Scene.prototype.update = function() {
  box.update();
  // console.log(box.model.mesh.verts);
  this.renderer.render([box.model], this.camTransform);
  //console.log("blah");
}
