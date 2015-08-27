var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/*Database Declaration*/
var Door = mongoose.model('Door');
/*M2X Stuff*/
var config = require("./config");
var M2X = require("m2x");
var m2xClient = new M2X(config.api_key);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'API Bitch!'});
  res.render('index', { title: 'Express' });
});

/*GET list of all doors*/
router.get('/doors', function(req, res, next) {
	Door.find(function(err, doors){
		if(err){
			return next(err);
		}
		res.json(doors);
	});
});

/*POST create devide*/
router.post('/doors', function(req,res, next) {
	var newdoor = new Door({});
	newdoor.count = 1;
	newdoor.device_id = req.body.device_id;
	newdoor.name = req.body.name;
	newdoor.save(function(err, door){
		if (err) {return next(err);}

		res.json(door);
	});
});

/*DELETE everything*/
router.delete('/doors/delete', function(req,res, next){
	Door.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
        }
    );
});
/*POST value to door*/
router.post('/doors/update', function(req, res, next){
	var query = {"device_id": req.body.device_id};

	Door.findOne( query, function(err, door){
		if (err)
		{
		return (err)
		}
		if (door === null)
		{
				var newdoor = new Door({
				device_id: req.body.device_id,
				name: req.body.name,
				count: 1
			});

			newdoor.save(function(err,door){
				if (err) { return next(err);}
				res.json(door);
			});
		}
		else
		{
			door.add(function(err,door){
				if (err) {return err;}
				res.json(door);
			})
		}
	});
});
/*GET a door*/
//router.get('/doors/:door_id', function(req,res))
module.exports = router;

// FROM m2x API
router.get('/device', function(req,res) {
	m2xClient.devices.list(function(response) {
    if (response.isSuccess()) {
        response.json.devices.forEach(function(device) {
            console.log(device);
            res.json(device);
        });
    } else {
        console.log(response.error());
    }
});
});

// TO web app
// /api/doors -
// /api/