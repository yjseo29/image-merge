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
	var outputFileName = new Date().getTime()+".jpg";
	var marginPx = "x"+req.body.margin;
	var qualityVal = parseInt(req.body.quality);
	var sharpenVal = req.body.sharpen;

	if(req.body.append == "+append"){
		marginPx = req.body.margin+"x";
	}
	var img = gm().out("-size", marginPx);

	for(var i=0;i<req.files.length;i++){
		if(i != req.files.length-1){
			img.out(req.files[i].path).out("xc:none");
		}else{
			img.out(req.files[i].path);
		}
	}

	img.out(req.body.append)
		.sharpen(sharpenVal)
		.quality(qualityVal)
		.fontSize(100)
		.drawText(0, 0, 'from scratch', 'Center')
		.write("./public/output/"+outputFileName, function (err) {
		if (err) console.log(err);
		res.redirect("output/"+outputFileName);
	});

});

function randomString(){
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for( var i=0; i < 6; i++ ) text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

module.exports = router;
