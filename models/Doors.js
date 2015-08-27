var mongoose = require('mongoose');
mongoose.set('debug', true);

var DoorSchema = new mongoose.Schema({
	device_id: String,
	name: String,
	count: {type: Number, default: 0}
});

DoorSchema.methods.add = function(cb){
	this.count += 1;
	this.save(cb);
}

mongoose.model('Door', DoorSchema);