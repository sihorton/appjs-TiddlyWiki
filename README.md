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

AppJS is customised to host TiddlyWiki (TW) which may be supplied on the command line, taken by default from the 'content'
folder or dragged and dropped onto the AppJS browser window. AppJS supplies a customised UserAgent string which causes the
plugin inside TW to hijack 'getLocalPath', 'loadFile' and 'saveFile' functions which it delegates to functions supplied by
the customised AppJS. To enable TW to save when loaded from an AppJS URL, the Plugin hijacks 'saveChanges' to use a
new 'allowSave' function. When running in a standard browser, this hijack behaves identically to original TW code. When
running in the customised AppJS, 'allowSave' is hijacked again to make saving unconditional. Other plugins which use
'saveFile' should be adapted to use 'allowSave' rather than hard-coding a test for the "file:" URL prefix.

