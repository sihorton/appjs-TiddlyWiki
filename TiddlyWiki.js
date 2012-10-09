/**
* TiddlyWiki running inside AppJS.
* @author: github.com/sihorton
*
* Modified by github.com/JohnHind
* Added ability to pass filename or full file path of TiddlyWiki file as parameter:
* TiddlyWiki                                ;index.html in data/content (as before)
* TiddlyWiki empty.html                     ;empty.html in data/content
* TiddlyWiki K:\Notes\Wisdom.html           ;Wisdom.html in K:\Notes\ (on Windows)
* TiddlyWiki /Volumes/key/Notes/Wisdom.html ;Wisdom.html in /Volumes/key/Notes/ (on a Mac)
* (On Windows use, "TiddlyWiki.exe", on other systems "TiddlyWiki.sh")
* Internally, the TiddlyWiki may access other files in the same directory using "http://appjs/{filename}"
*/
var app = module.exports = require('appjs');
var fs = require('fs');

var dx = "";
var fn = "";
var s = process.argv[2];
var p = 0;
if (s) {
  s = s.replace(/\\/g, "/");
  p = s.lastIndexOf("/");
  if (p > 0) {
    dx = s.substring(0, p);
    fn = s.substring(p);
  } else {
    fn = "/" + s;
  }
}
if (dx.length < 1) dx = __dirname + "/content";
if (fn.length < 1) fn = "/index.html";
app.serveFilesFrom(dx);

var window = app.createWindow("http://appjs" + fn, {
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
    if (fileUrl == '\\\\appjs\\') {
      fileUrl = dx + fn;
    } else {
      fileUrl = fileUrl.split('\\\\appjs\\').join("");
      fileUrl = dx + "/" + fileUrl;
    }
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
    if (fileUrl == '\\\\appjs\\') {
      fileUrl = dx + fn;
    } else {
      fileUrl = fileUrl.split('\\\\appjs\\').join("");
      fileUrl = dx + "/" + fileUrl;
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
