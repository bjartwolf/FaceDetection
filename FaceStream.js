var jsfeat = require('jsfeat');
var Stream  = require('stream');
var util   = require('util');
jsfeat.bbf.face_cascade = require('./bbf_face.js');
module.exports = FaceStream;
util.inherits(FaceStream, Stream);

var h = 90;
var w = 160;
//var h = 180;
//var w = 320;
var nrOfPixels = w*h;

function FaceStream() {
   Stream.call(this);
   this.writable = true;
   this.readable = true;
 //  this.counter = 0;
   this.gray_img = new jsfeat.matrix_t(w, h, jsfeat.U8_t | jsfeat.C1_t);
   jsfeat.bbf.prepare_cascade(jsfeat.bbf.face_cascade);
}

FaceStream.prototype.faceDetection = function (rgbaImage) {
    var gray_img = this.gray_img;
    jsfeat.imgproc.grayscale(rgbaImage, gray_img.data);
    var pyr = jsfeat.bbf.build_pyramid(gray_img, 24*2, 24*2, 4);
    var rects = jsfeat.bbf.detect(pyr, jsfeat.bbf.face_cascade);
    return jsfeat.bbf.group_rectangles(rects, 1);
}

FaceStream.prototype.write = function (rgbaImage) {
//   this.counter++;
 //  if (this.counter > 5) { // Have to speed up the RGBA parser to increase speed
       this.emit('data', this.faceDetection(rgbaImage));
   //    this.counter = 0;
  // }
}
