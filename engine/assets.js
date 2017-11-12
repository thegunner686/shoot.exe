

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

function loadMesh(filename) {
  fetch('https://firebasestorage.googleapis.com/v0/b/shah-cloud.appspot.com/o/box.obj?alt=media&token=ddad3948-e888-434b-b8d6-ea4f0e2cbeb5').then(function(response) {
    if (response.status !== 200) {
        throw response.status;
    }
    return response.text();
}).then(function(file_content) {
    console.log(file_content);
}).catch(function(status) {
    console.log('Error ' + status);
});
}

function xhr(){
  var xmlHttp;
  try{
    xmlHttp=new XMLHttpRequest();
  } catch(e) {
    try {
      xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    } catch(e) {
      try {
        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
      } catch(e) {
        alert("Your browser does not support AJAX!");
        return false;
      }
    }
  }
  return xmlHttp;
}
