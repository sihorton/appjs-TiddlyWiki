appjs-TiddlyWiki
================

An experiment to port TiddlyWiki to AppJS

Extract a zip of the contents of this repository or git clone into the data directory of an AppJS install.

Quick Download
==============

You can download AppJS with this code added to it from the following links:

* linux-32bit: https://github.com/downloads/sihorton/appjs-TiddlyWiki/appjs-0.0.18-linux-ia32.tar.gz
* windows: https://github.com/downloads/sihorton/appjs-TiddlyWiki/appjs-tiddlywiki-win32-ia32.zip

Status
======

Currently TiddlyWiki is able to create new tiddlers and edit existing ones. It is able to save to disk but unfortunately 
the contents of the file is not correct so changes are lost.

Design
======

app.js adds externalJsLoad() function and externalJsSave() function to the window object. It also sets the readOnly property to false 
(tiddlywiki sees the protocol is not file:// and so defaults to readOnly = true). I have also added an isExternalJsSave property
to the window object so that it is easy to check if you are running within appjs.



