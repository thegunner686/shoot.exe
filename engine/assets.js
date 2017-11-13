

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

function loadMesh(filename, onFinished) {
  var tris = [];
  var texCoords = [];
  var mesh;
  var verts = new Array(0);

  fetch('https://raw.githubusercontent.com/thegunner686/shoot.exe/master/box.obj').then(function(response) {
      if (response.status !== 200) {
          throw response.status;
      }
      return response.text();
  }).then(function(file_content) {
      var str = new String(file_content);
      var split = str.split("\n");
      var index = 0;
      for (var line = 0; line < split.length; line++) {
          var words = split[line].split(" ");
          switch (words[0]) {
            case "v":
              var x = parseFloat(words[1]);
              var y = parseFloat(words[2]);
              var z = parseFloat(words[3]);
              verts.push(new Vector3(x, y, z));
              console.log(new Vector3(x, y, z));
              console.log(verts);
              break;

            case "f":
              var tvs = [];
              var ttcs = [];
              tvs.push(parseInt(words[1].split("/")[0])-1);
              tvs.push(parseInt(words[2].split("/")[0])-1);
              tvs.push(parseInt(words[3].split("/")[0])-1);
              ttcs.push(parseInt(words[1].split("/")[1])-1);
              ttcs.push(parseInt(words[2].split("/")[1])-1);
              ttcs.push(parseInt(words[3].split("/")[1])-1);
              tris.push(tvs);
              tris.push(ttcs);
              console.log("tri: " + tvs + "\n" + ttcs);
              break;

            case "vt":
              var u = parseFloat(words[1]);
              var v = parseFloat(words[2]);
              var w = parseFloat(words[3]);
              texCoords.push(new Vector3(u, v, w));
              console.log("texCoord: " + u + "," + v + "," + w);
              break;

            default:

          }

      }
      //console.log(verts);
      mesh = new Mesh(tris, verts, texCoords);
      console.log(mesh);
      onFinished(mesh);
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
