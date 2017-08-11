#!/usr/bin/env node
var http = require('http');
var fs = require("fs");
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var tools = require('./tools');

var board = tools.Board(); //undefined


app.use(bodyParser.urlencoded({
	extended: true
}))

app.use(bodyParser.json());

app.get('/', function(req, res) {
	// res.send('Hello World');
	res.sendFile(path.join(__dirname, 'index.html'));
})



app.post('/', function(req, res){
	//Check player id
	var pid = req.body.playerId;
	if(board.p1 !== undefined && board.p2 !== undefined){
		if(pid !== '1' || pid !== '2' ){
			res.send('Already Two Players');
			return;
		} else {
			//handle the move and return something
		}
	} else if(board.p1 !== undefined && board.p2 === undefined){
		board.p2 = new Player("Player2", "none", "none", false);

	} else if(board.p1 === undefined){
		board.p1 = new Player("Player1", "none", "none", true);
		board.processMove(req.body.cell);
		
	}

	if(newGame){
		player1Assigned = true

	}
	
	req.body.cell;
})	

app.listen(8080);


app.use(express.static('publicresources'));

// http.createServer(function (req, res) {
//   // res.writeHead(200, {'Content-Type': 'text/html'});
//   // res.write('<h1>HELLO</h1>');
//   // res.end('Hello World\n');
//   	fs.readFile("index.html", function(err, data){
//   		res.writeHead(200, {'Content-Type': 'text/html'});
//   		res.write(data);
//   		res.end();
// 	});
// }).listen(8080, 'localhost');
// console.log('Server running at http://localhost:8080/');