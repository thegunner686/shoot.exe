
console.log("hello");
init();
scene = new Scene();


function init() {
  let canvas = document.getElementById("cnv"),
      ctx = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;

  ctx.translate(width / 2, height / 2);
}
