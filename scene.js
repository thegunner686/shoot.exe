function Scene() {
  var renderer = new Renderer();
  var camTransform = new Transform(new Vector3(0, 0, -10),
                                   new Vector3(0, 0, 0));

  function setup() {
    box.setup();
    renderer.initRender();
    // var pos = new Vector3(0, 0, -10);
    // var rot = new Vector3(0, 0, 0);
    // camTransform = new Transform(pos, rot);
  }

  function update() {
    box.update();
    renderer.render([box.model], camTransform);
  }
}
