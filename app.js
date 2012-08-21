var app = module.exports = require('appjs');
var fs = require('fs');
app.serveFilesFrom(__dirname + '/content');

var window = app.createWindow({
  width  : 640,
  height : 460,
  icons  : __dirname + '/content/icons'
});

window.on('create', function(){
  window.frame.show();
  window.frame.center();
});

window.on('ready', function(){
  console.log("Window Ready");
  window.require = require;
  window.process = process;
  window.module = module;
  /* hooks for TiddlyWiki to allow it to save*/
  window.readOnly = false;
  window.isExternalJsSave = true;
  window.externalJsSave = function(fileUrl, content) {
	fs.writeFile("data/content/index.html", content, function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("The file was saved!",fileUrl);
		}
	}); 
	return true;
  }
  window.externalJsLoad = function(fileUrl) {
	console.log("loading file",fileUrl);
	var contents = fs.readFileSync("data/content/index.html").toString('UTF-8');
	console.log(contents);
	return contents;
 }
  window.addEventListener('keydown', function(e){
    if (e.keyIdentifier === 'F12') {
	  window.frame.openDevTools();
	  
    }
  });
});

window.on('close', function(){
  console.log("Window Closed");
});
