var express = require('express');
var router = express.Router();
var path = require('path');
var app = require('../app');
var Users = app.UsersDB;


/* GET home page. */
router.post('/login', function(req, res, next) {
	var data = req.body
	var user = {
		name: data.name,
		mail: data.mail
	};

	var users = new Users(user); //create new db instance
	//save the new user to db
	users.save(function(err, obj) {
		if (err)
			res.status(500).end("error"); //response on error with status code 500
		else
			res
			.status(200)
			.cookie('session', obj.id)
			.end("Added", user, "to db"); //response on success  with status code 200

	});
});

module.exports = router;