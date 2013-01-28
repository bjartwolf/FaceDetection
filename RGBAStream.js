// This module is inspired and a lot is copied from from https://github.com/TooTallNate/node-drone-video
// It does require a recent build of FFMPEG, I followed:
// https://ffmpeg.org/trac/ffmpeg/wiki/UbuntuCompilationGuide
// On mac some instructions are given on TooTallNates side

var util   = require('util');
var spawn = require('child_process').spawn;
var Stream = require('stream').Stream;

module.exports = RGBAStream;
util.inherits(RGBAStream, Stream);

//var h = 180;
var h = 90;
var w = 160;
//var w = 320;
var nrOfPixels = w*h;
var nrOfBytesPrImage = nrOfPixels*4; 

function RGBAStream() {
   var self = this;
   Stream.call(this);
   this.writable = true;
   this.readable = true;

   this.videoEncoder = this._initVideoEncoder(); 
   this.rgba = [];
   this._buf = new Buffer(0);
   for (var i = 3; i < nrOfBytesPrImage; i+=4) {
       this.rgba[i] = 0; // Alpha channel should be 0, no need to parse, even noe need to set it except init
   }
   this.videoEncoder.stdout.on('data', function (buffer) {
       // Just append the videodata to exising buffer
       self._buf = Buffer.concat([self._buf, buffer]);
       if (self._buf.length > nrOfBytesPrImage) {
           var buf = self._buf;
           var rgba = self.rgba;
           var i;
           for (i = 0; i < nrOfBytesPrImage-3; i+=4) {
                rgba[i] = buf[i]; 
                rgba[i+1] = buf[i+1]; 
                rgba[i+2] = buf[i+2]; 
           }
          // Emit the parsed data
          self.emit('data', rgba); 
          // Remove the parsed data from the buffer
          self._buf = self._buf.slice(nrOfBytesPrImage);
       };
   });
}
RGBAStream.prototype.write = function (buffer) {
    this.videoEncoder.stdin.write(buffer.payload);
}

RGBAStream.prototype._initVideoEncoder = function () {
    return spawn('ffmpeg', [
    '-i', 'pipe:0',
    '-f', 'rawvideo',
    '-analyzeduration', '0',
    //'-s', '320x180',
    '-s', '160x90',
    '-pix_fmt', 'rgba',
    '-r', '29.97', 
    'pipe:1'
  ]);
};

