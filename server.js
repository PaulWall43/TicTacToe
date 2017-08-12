#!/usr/bin/env node
var http = require('http');
var fs = require("fs");
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var tools = require('./tools');


var p1 = tools.Player("player1", "none", "none");
var p2 = tools.Player("player2", "none", "none");
var board = tools.Board(p1, p2); //undefined


app.use(bodyParser.urlencoded({
	extended: true
}))

app.use(bodyParser.json());

app.get('/', function(req, res) {
	// res.send('Hello World');
	console.log('SOMEBODY IS HEREEEEEEEEEEE');
	res.sendFile(path.join(__dirname, 'index.html'));
})


app.get('/board', function(req, res){
	app.set('json spaces', 2);
	// res.setHeader('Contsent-Type', 'application/json');
	res.json(board);
})



app.post('/', function(req, res){	
	board.processMove(req.body.cell);
	console.log(board.arr);
	res.json(board);
})	


app.post('/playerwin', function(req, res){
	board.clearArr();
	board.updatePlayerScore();
	board.resetPlayerTurn();
	res.json(board);
})

app.post('/playerwin', function(req, res){
	board.clearArr();
	board.updateTieScore();
	board.resetPlayerTurn();
	res.json(board);
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