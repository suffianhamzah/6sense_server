var mongoose = require('mongoose');

var DoorSchema = new mongoose.Schema({
	deviceID: String,
	count: {type: Number, default: 0}
});

DoorSchema.methods.upvote = function(cb){
	this.count += 1;
	this.save(cb);
}

mongoose.model('Door', Door Schema)