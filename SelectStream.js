var stream = require('stream');
//Takes a steam of object and selects one key in the objectream and
//prints that key's value.
//Could throw an error... but it doesn't

SelectStream.prototype = Object.create(stream.Transform.prototype, {
  constructor: { value: SelectStream}
});

function SelectStream(select) {
   this.select = select;
   stream.Transform.call(this, {objectMode: true}); 
}

SelectStream.prototype._transform = function(chunk, encoding, done) { 
   this.push(chunk[this.select]); 
   done();
};
module.exports = SelectStream; 
