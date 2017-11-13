var canvas;
var ctx;
var width;
var height;
var scene1;

console.log("hello");

var mesh;
var box;
loadMesh("box.obj", function (m) {
  mesh = m;

  var boxModel = new Model(mesh, loadTex("firewatch2.jpg"));
  box = new Entity(boxModel,
    function (self) {

    },
    function (self) {
      var m = MatBuilder.rotationMatrix(0, 0, 1);
      self.model.mesh = SMath.multiplyMesh(self.model, m);
  });
});


setTimeout(() => {
  init();
}, 500);



function init() {
      canvas = document.getElementById("cnv"),
      ctx = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;

      scene1 = new Scene();
      scene1.setup();
      scene1.update();

  ctx.translate(width / 2, height / 2);
  update();
}

function update() {
  scene1.update();
  requestAnimationFrame(update);
}
