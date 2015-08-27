var mongoose = require('mongoose');
mongoose.set('debug', true);

var DoorSchema = new mongoose.Schema({
	device_id: String,
	name: String,
	gender: String,
	status: String,
	floor: String,
	count: {type: Number, default: 0}
});

DoorSchema.methods.add = function(cb){
	this.count += 1;
	var counts = this.count;

	if (counts > 60)
	{
		//send email
		this.status = "dirty";
	}
	else if (counts > 45)
	{
		this.status = "warning";
	}
	else 
	{
		this.status = "clean";
	}
	
	this.save(cb);
}

DoorSchema.methods.clean = function(cb){
	this.count = 0;
	this.status= "clean";
	this.save(cb);
}

mongoose.model('Door', DoorSchema);