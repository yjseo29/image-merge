var express = require('express')
  , router = express.Router()
  , multer = require('multer')
  , gm = require('gm').subClass({imageMagick: true});

var upload = multer({ dest: './public/uploads/' })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', upload.array('images', 20), function(req, res, next) {
	for(var i in req.files){
		console.log(req.files[i]);
	}
	gm(req.files[0].path)
		.quality(80)
		.resize(1024, 1024)
		.autoOrient()
		.write('./public/uploads/output.jpg', function (err) {
			if (err) console.log(err);
		});
	res.json(req.files);
});

module.exports = router;
