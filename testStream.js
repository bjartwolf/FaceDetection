var net = require('net');
var rx = require('rx');
require('./extendObservable.js'); // Adds the toObservable method to EventEmitter

var RGBAStream = require('./RGBAStream');
var PaVEParser = require('./node_modules/ar-drone/lib/video/PaVEParser');
var FaceStream = require('./FaceStream');

var parser = new PaVEParser();
var face = new FaceStream();
var RGBA = new RGBAStream();

var socket = net.connect({ host: '192.168.1.1', port: 5555});
socket.pipe(parser).pipe(RGBA).pipe(face);

face.toObservable('data')
    .select(function(faces) {
        return faces[0];
    })
    .where(function (face) {
        if (face) { return face.confidence > 0; }   
    })
    .select(function (face) {
        return "Face at " + face.x + ", " + face.y + ". Width is " + face.width;
    })
    .subscribe(function (x) {
        console.log(x);
    })
