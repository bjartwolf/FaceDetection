// This module is inspired and a lot is copied from from https://github.com/TooTallNate/node-drone-video
// It does require a recent build of FFMPEG, I followed:
// https://ffmpeg.org/trac/ffmpeg/wiki/UbuntuCompilationGuide
// On mac some instructions are given on TooTallNates side

// IMPORTANT: ONLY PAYLOAD GOES IN HERE! Must be parsed somewhere first

var spawn = require('child_process').spawn;

var h = 135;
var w = 240;
var res = w+'x'+h; 

module.exports = spawn('ffmpeg', [
    '-i', 'pipe:0',
    '-f', 'rawvideo',
    '-analyzeduration', '0',
    '-s', res, 
    '-pix_fmt', 'rgba',
    '-r', '5', //framerate
    'pipe:1'
]);

