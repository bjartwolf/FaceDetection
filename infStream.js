var stream  = require('stream');
var GreenStream  = require('./greenStream.js');
var SlowStream = require('../reactive-drone/slowStream.js');

InfStream.prototype = Object.create(stream.Readable.prototype, {
  constructor: { value: InfStream}
});

function InfStream() {
   stream.Readable.call(this, { objectMode: true}); 
   this.counter = 0;
}

InfStream.prototype._read = function() { 
     console.log('generating value');
     this.push((this.counter++).toString() + '\n');
};

var infStream = new InfStream();
var slowStream = new SlowStream(1);
var greenStream = new GreenStream();

infStream.pipe(process.stdout);
infStream.pipe(process.stdout);
infStream.pipe(slowStream).pipe(greenStream).pipe(process.stdout);
