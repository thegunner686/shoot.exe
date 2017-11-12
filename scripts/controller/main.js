let canvas,
    ctx,
    width,
    height,
    player,
    air_console,
    driver;


document.onload = () => {
  init();
};

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  driver = new Driver(air_console);

  air_console = new AirConsole({
    device_motion: Math.floor(1000 / 60)
  });

}
