


//Create BoardUI
window.onload = function(){
	var p1 = new Player("Player 1", "none", "none", true); // Why is there no difference? Is it because there is no
	var p2 = new Player("Player 2", "none", "none", false);
	p1.setUp();
	p2.setUp();
	var board = new Board(p1, p2);
	setUpTable();
	setUpButtonListeners(board);
}



// document.addEventListener('DOMContentLoaded', function(){
// 	alert("yea");
// });


