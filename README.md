AppJS-TiddlyWiki
================

A port of http://tiddlywiki.com/ to http://appjs.org/ (which uses http://nodejs.org/). The end result is a wiki packaged together 
with a webkit browser (the browser used on iphone / ipad / android). This is very suitable for running from a usb-stick and 
allows you to take your wiki with you wherever you go!

You may need to click "AdvancedOptions" in the blue sidebar on the right. Uncheck "Hide editing features when viewed over HTTP" (chkHttpReadOnly).
Check "AutoSave" to persist changes as soon as you close a tiddler / page.

Quick Download
==============

You can download AppJS with built in TiddlyWiki from the following download links:

* linux-32bit: https://github.com/downloads/sihorton/appjs-TiddlyWiki/appjs-tiddlywiki-linux-ia32.tar.gz
* windows: https://github.com/downloads/sihorton/appjs-TiddlyWiki/appjs-tiddlywiki-win32.zip

The code to work in internet explorer / firefox and other browsers is still intact so you are able to use the same index.html
in both AppJS and a normal browser interchangeably.

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
functions allow TiddlyWiki to use the nodejs backend to load and save files. The tiddlywiki code also had to be modified 
where it was checking to make sure that a file:// url was being used.

Search for "AppJS" within the TiddlyWiki code to see what changes have been made.

Currently plugins may break when running within AppJS the main reason for this tends to be checks for the file:// protocol
being used (we don't use that protocol but still support saving).




