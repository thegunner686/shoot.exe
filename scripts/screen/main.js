


function init() {
  let canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d"),
      width = canvas.width = window.innerWidth,
      height = canvas.height = window.innerHeight;

  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, width, height);


  var air_console = new AirConsole();

// Listen for messages from other devices
air_console.onMessage = function(from, data) {

  // We receive a message -> Send message back to the device
  air_console.message(from, "Full of pixels!");

  // Show message on device screen
  var info = document.createElement('DIV');
  info.innerHTML = data;
  document.body.appendChild(info);
};
}
