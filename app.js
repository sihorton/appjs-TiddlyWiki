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
  window.require = require;
  window.process = process;
  window.module = module;
  /* hooks for TiddlyWiki to allow it to save*/
  window.readOnly = false;
  window.isExternalJsSave = true;
  window.externalJsSave = function(fileUrl, content) {
	if (fileUrl == '\\\\appjs\\') {
		fileUrl = "data/content/index.html";
	} else {
		fileUrl = fileUrl.split('\\\\appjs\\').join('data/content/');
	}
	fs.writeFile(fileUrl, content, function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("The file was saved!",fileUrl);
		}
	});
	return true;
  }
  window.externalJsLoad = function(fileUrl) {
	if (fileUrl == '\\\\appjs\\') {
		fileUrl = "data/content/index.html";
	} else {
		fileUrl = fileUrl.split('\\\\appjs\\').join('data/content/');
	}
	
	return fs.readFileSync(fileUrl).toString('UTF-8');
 }
  window.addEventListener('keydown', function(e){
    if (e.keyIdentifier === 'F12') {
	  window.frame.openDevTools();
    }
  });
});

window.on('close', function(){
  //console.log("Window Closed");
});
