var canvas;
var ctx;
var width;
var height;

console.log("hello");
init();
loadMesh("box.obj");


function init() {
      canvas = document.getElementById("cnv"),
      ctx = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;

  ctx.translate(width / 2, height / 2);
}
