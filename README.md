AppJS-TiddlyWiki
================

A plugin for [TiddlyWiki](http://tiddlywiki.com/) to support running inside [AppJS](http://appjs.org/). This gives you a wiki that runs inside its
own webkit browser (the browser used on iphone / ipad / android). This is ideal for carrying around with you on a usb-stick
and it lets you take your wiki with you wherever you go!

Quick Download
==============

You can download AppJS with TiddlyWiki containing the AppJS plugin that lets you save changes:

* Linux [32 bit](https://github.com/downloads/sihorton/appjs-TiddlyWiki/appjs-tiddlywiki-linux-ia32.tar.gz) / [64 bit](https://github.com/downloads/sihorton/appjs-TiddlyWiki/appjs-tiddlywiki-linux-x64.tar.gz)
* [Mac](https://github.com/downloads/sihorton/appjs-TiddlyWiki/appjs-tiddlywiki-darwin-ia32.zip)
* [Windows](https://github.com/downloads/sihorton/appjs-TiddlyWiki/appjs-tiddlywiki-win32.zip)

Plugin
======
The AppJS Plugin is hosted at http://sihorton.tiddlyspace.com/ 


Advantages
----------
* taking the browser with you means it won't break after getting some kind of auto update.
* no complex procedures or permissions dialogs are needed, it is able to save out of the box

Disadvantages
-------------
* it takes extra space (20 meg+)
* not all plugins / functions may work


Developers
==========

Upon startup AppJS adds an allowSave flag together with an externalJsSave() function and externalJsLoad() function. These 
functions allow TiddlyWiki to use the nodejs backend to load and save files. The plugin notices these functions and uses them
to read and write the TiddlyWiki file.



