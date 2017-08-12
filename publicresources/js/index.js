
var board;

//Create BoardUI
window.onload = function(){
	// var board;
	var p1 = new Player("Not set yet1", "none", "none", true); // Why is there no difference? Is it because there is no
	var p2 = new Player("Not set yet2", "none", "none", false);
	p1.setUp();
	p2.setUp();
	board = new Board(p1, p2);
	// setUpTable();
	// setUpButtonListeners(board);

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:8080/board", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			
			var jsonBoard = JSON.parse(xhr.response);
			updateLocalBoardWithXHRBoard(board, jsonBoard);
			setUpTable()
			setUpButtonListeners(board);
		}

	}

	// alert('playerid=0&cell=' + spotId);
	xhr.send(/*'playerid=0&cell=' + spotId*/);
}

function updateLocalBoardWithXHRBoard(board, jsonBoard){
	board.arr = jsonBoard.arr;
	board.playerTurn = jsonBoard.playerTurn;
	board.p1.name = jsonBoard.p1.name;
	board.p1.wins = jsonBoard.p1.wins;
	board.p2.name = jsonBoard.p2.name;
	board.p2.wins = jsonBoard.p2.wins;
	board.ties = jsonBoard.ties;
	board.p1.domUpdateName();
	board.p2.domUpdateName();


}

function convertNullArray(arr){
	for(var i = 0; i < arr.length; i++){
		arr[i] === undefined;
	}
	return arr;
}



// document.addEventListener('DOMContentLoaded', function(){
// 	alert("yea");
// });


