var net = require('net');
var fs = require('fs');
var rx = require('rx');
require('./extendObservable.js'); // Adds the toObservable method to EventEmitter

var RGBAStream = require('./RGBAStream');
var FrameStream = require('./FrameStream');
var FaceStream = require('./FaceStream');

var face = new FaceStream();
var frame = new FrameStream();
var RGBA = RGBAStream;
var fileStream = fs.createReadStream('./bc.mp4');
//var test  = fileStream.pipe(RGBA.stdin);
var test  = fileStream.pipe(RGBA.stdin);
RGBA.stdout.pipe(frame).pipe(face);
//RGBA.stdout.pipe(process.stdout);

face.toObservable('data')
    .select(function(faces) {
        return faces[0];
    })
    .where(function (face) {
        if (face) { return face.confidence > -1; }   
    })
    .select(function (face) {
        return "Face at " + face.x + ", " + face.y + ". Width is " + face.width;
    })
    .subscribe(function (x) {
        console.log(x);
    })

