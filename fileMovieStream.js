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
var fileStream = fs.createReadStream('./bc.mp4').pipe(RGBA.stdin);;
RGBA.stdout.pipe(frame).pipe(face);

// Choose this for httpstream from server
/*
var http = require('http');
var options = {
  hostname: 'www.tools4movies.com',
  port: 80,
  path: '/trailers/1012/Broken%20City.mp4',
  method: 'GET'
};
var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  res.pipe(RGBA.stdin);
});
req.end();
*/

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

