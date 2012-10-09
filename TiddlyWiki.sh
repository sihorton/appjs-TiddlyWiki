#!/bin/sh

basedir=`dirname "$0"`
$basedir/data/bin/node --harmony $basedir/data/tiddlywiki.js $1 & wait
