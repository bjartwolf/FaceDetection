var net = require('net');
var rx = require('rx');
//var ardrone = require('ar-drone');
//var client = ardrone.createClient();
require('./extendObservable.js'); // Adds the toObservable method to EventEmitter

var RGBAStream = require('./RGBAStream');
var PaVEParser = require('./node_modules/ar-drone/lib/video/PaVEParser');
var FrameStream = require('./FrameStream');
var FaceStream = require('./FaceStream');
var SelectStream = require('./SelectStream');

var parser = new PaVEParser();
var payload = new SelectStream('payload');
var face = new FaceStream();
var frame = new FrameStream();
var RGBA = new RGBAStream();
var socket = net.connect({ host: '192.168.1.1', port: 5555});
socket.pipe(parser).pipe(payload).pipe(RGBA).pipe(frame).pipe(face);

//client.takeoff();

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
//        client.land();
    })

