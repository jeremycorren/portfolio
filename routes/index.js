const express = require('express');
const bodyParser = require('body-parser');
const id = require('uuid/v4');

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const data = [{
	id: id(),
	username: "jcorren"
}];

router.get('/users', function(req, res, next) {
  res.json(data);
});

router.post('/users', function(req, res, next) {
	const username = req.body.username
	data.push({ id: id(), username });
	res.json(data);
});

module.exports = router;
