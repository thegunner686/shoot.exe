


function init() {
  let canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;

  ctx.fillRect(0, 0, width, height);
}
