var jsfeat = require('jsfeat');
var stream  = require('stream');
var jsfeat.bbf.face_cascade = require('./bbf_face.js');

var h = 135;
var w = 240;

FaceStream.prototype = Object.create(stream.Transform.prototype, {
  constructor: { value: FaceStream}
});

function FaceStream() {
   stream.Transform.call(this, {objectMode: true}); 
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

FaceStream.prototype._transform = function(rgbaImage, encoding, done) { 
     this.push(this.faceDetection(rgbaImage));
     done();
};

module.exports = FaceStream;
