var stream = require('stream');

var h = 135;
var w = 240;
var nrOfPixels = w*h;
var nrOfBytesPrImage = nrOfPixels*4; 

FrameStream.prototype = Object.create(stream.Transform.prototype, {
  constructor: { value: FrameStream}
});

function FrameStream() {
   stream.Transform.call(this, {objectMode: true}); 
   this.rgba = [];
   this._buf = new Buffer(0);
   for (var i = 3; i < nrOfBytesPrImage; i+=4) {
       this.rgba[i] = 0; // Alpha channel should be 0, no need to parse, even noe need to set it except init
   }

}

FrameStream.prototype._transform = function(chunk, encoding, done) { 
    // Just append the videodata to exising buffer
    this._buf = Buffer.concat([this._buf, chunk]);
    if (this._buf.length > nrOfBytesPrImage) {
        var buf = this._buf;
        var rgba = this.rgba;
        var i;
        for (i = 0; i < nrOfBytesPrImage-3; i+=4) {
             rgba[i] = buf[i]; 
             rgba[i+1] = buf[i+1]; 
             rgba[i+2] = buf[i+2]; 
        }
       // Emit the parsed data
       this.push(rgba); 
       // Remove the parsed data from the buffer
       this._buf = this._buf.slice(nrOfBytesPrImage);
    };
   done();
};
module.exports = FrameStream;
