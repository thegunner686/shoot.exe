

function loadTex(filename) {
  console.log("loading ");
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  var img = new Image();
  img.onLoad = function () {
    context.drawImage(img, 0, 0);
    let width = img.clientWidth,
        height = img.clientHeight;
    var data = context.getImageData(0, 0, width, height).data;
    tex = new Texture(height, width, data);
    return tex;
  };
  img.src = filename;
}

function loadMesh() {

}
