var stream = require('stream');

GreenStream.prototype = Object.create(stream.Transform.prototype, {
  constructor: { value: GreenStream }
});

function GreenStream() {
  stream.Transform.call(this, {objectModel: true});
}

GreenStream.prototype._transform = function(chunk, encoding, done) {
  this.push('\u001b[32m' + chunk + '\u001b[39m');
  done();
};
module.exports = GreenStream;
