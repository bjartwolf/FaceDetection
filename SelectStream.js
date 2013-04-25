var stream = require('stream');

SelectStream.prototype = Object.create(stream.Transform.prototype, {
  constructor: { value: SelectStream}
});

function SelectStream(select) {
   this.select = select;
   stream.Transform.call(this, {objectMode: true}); 
}

SelectStream.prototype._transform = function(chunk, encoding, done) { 
   this.push(chunk.select); 
   done();
};
module.exports = SelectStream; 
