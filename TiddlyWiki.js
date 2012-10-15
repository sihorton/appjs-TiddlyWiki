/**
* TiddlyWiki running inside AppJS.
* @author: github.com/sihorton
* @author: github.com/JohnHind
*
* TiddlyWiki                                ;index.html in data/content
* TiddlyWiki empty.html                     ;empty.html in data/content
* TiddlyWiki K:\Notes\Wisdom.html           ;Wisdom.html in K:\Notes\ (on Windows)
* TiddlyWiki /Volumes/key/Notes/Wisdom.html ;Wisdom.html in /Volumes/key/Notes/ (on a Mac)
* (On Windows use, "TiddlyWiki.exe", on other systems "TiddlyWiki.sh")
* Internally, the TiddlyWiki may access other files in the same directory using "{wikiUrl}/{filename}"
*/
var app = module.exports = require('appjs');
var fs = require('fs');
var path = require('path');

var wikiDir = ".";
var wikiFile = "";
var wikiUrl = "http://AppJS";
var s = process.argv[2];
if (s) {
	wikiDir = path.dirname(s);
	wikiFile = path.basename(s);
}
if (wikiDir === ".") wikiDir = path.join(__dirname, "content");
if (wikiFile === "") wikiFile = "index.html";

app.serveFilesFrom(wikiDir);

var window = app.createWindow(wikiUrl + "/" + wikiFile, {
  url : wikiUrl,
  icons  : __dirname + '/content/icons'
});

window.on('create', function(){
  window.frame.show();
  window.frame.center();
});

window.on('ready', function(){
  /* hooks for TiddlyWiki to allow it to save*/
  window.externalJsPath = function(fileUrl) {
    //console.log("JsPath in: " + fileUrl);
	if(fileUrl.toLowerCase().indexOf(wikiUrl.toLowerCase() + "/") == 0) {
        fileUrl = fileUrl.substr(wikiUrl.length + 1);
    }else if(fileUrl.toLowerCase().indexOf("file://") == 0) {
        fileUrl = fileUrl.substr(7);
        if(fileUrl.charAt(2) == ':') fileUrl = fileUrl.substr(1);
    }
	fileUrl = path.resolve(wikiDir, fileUrl);
	fileUrl = fileUrl.split("/").join(path.sep);
	//console.log("JsPath out: " + fileUrl);
	return fileUrl;
  }
  window.externalJsSave = function(filePath, content) {
    //console.log("JsSave: " + filePath);
	try{
		fs.writeFileSync(filePath, content);
		return true;
	}catch (err){
		return false;
	}
  }
  window.externalJsLoad = function(filePath) {
    //console.log("JsLoad: " + filePath);
    return fs.readFileSync(filePath).toString('UTF-8');
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
