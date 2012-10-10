/**
* TiddlyWiki running inside AppJS.
* @author: github.com/sihorton
*
* TiddlyWiki                                ;index.html in data/content (as before)
* TiddlyWiki empty.html                     ;empty.html in data/content
* TiddlyWiki K:\Notes\Wisdom.html           ;Wisdom.html in K:\Notes\ (on Windows)
* TiddlyWiki /Volumes/key/Notes/Wisdom.html ;Wisdom.html in /Volumes/key/Notes/ (on a Mac)
* (On Windows use, "TiddlyWiki.exe", on other systems "TiddlyWiki.sh")
* Internally, the TiddlyWiki may access other files in the same directory using "http://appjs/{filename}"
*/
var app = module.exports = require('appjs');
var fs = require('fs');

var wikiDir = "";
var wikiFile = "";
var s = process.argv[2];
var p = 0;
if (s) {
  s = s.replace(/\\/g, "/");
  p = s.lastIndexOf("/");
  if (p > 0) {
    wikiDir = s.substring(0, p);
    wikiFile = s.substring(p);
  } else {
    wikiFile = "/" + s;
  }
}
if (wikiDir.length < 1) wikiDir = __dirname + "/content";
if (wikiFile.length < 1) wikiFile = "/index.html";
app.serveFilesFrom(wikiDir);

var window = app.createWindow("http://appjs" + wikiFile, {
/**
  width  : 640,
  height : 460,
**/
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
  window.allowSave = true;
  window.externalJsSave = function(fileUrl, content) {
    fileUrl = fileUrl.split('\\\\appjs\\').join("");
    fileUrl = wikiDir + "/" + fileUrl;
    fs.writeFile(fileUrl, content, function(err) {
      if(err) {
        console.log("error saving:",err);
      } else {
        console.log("saved:",fileUrl);
      }
    });
    return true;
  }
  window.externalJsLoad = function(fileUrl) {
    fileUrl = fileUrl.split('\\\\appjs\\').join("");
    fileUrl = wikiDir + "/" + fileUrl;
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
