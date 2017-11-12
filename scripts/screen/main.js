let air_console,
    canvas,
    ctx,
    width,
    height,
    main_scene;


function init() {

  //air_console = new AirConsole();

  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  ctx.fillRect(0, 0, width / 2, height);
  //main_scene = new Scene();

  setTimeout(() => {
    start();
  }, 0);
}

function start() {
  updateScreen();
}

function updateScreen() {
/*  main_scene.getEntities().map((entity) => {
    entity.update();
  });*/
  requestAnimationFrame(updateScreen);
}
