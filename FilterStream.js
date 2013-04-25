var stream = require('stream');

FilterStream.prototype = Object.create(stream.Transform.prototype, {
  constructor: { value: FilterStream}
});

function FilterStream(filter) {
   this.filter = filter;
   stream.Transform.call(this, {objectMode: true}); 
}

FilterStream.prototype._transform = function(chunk, encoding, done) { 
   this.push(chunk.filter); 
   done();
};
