var canvas;
var ctx;
var width;
var height;

console.log("hello");
init();
var scene1 = new Scene();
scene1.setup();
scene1.update();


function init() {
      canvas = document.getElementById("cnv"),
      ctx = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;

  ctx.translate(width / 2, height / 2);
}
