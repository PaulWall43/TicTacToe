
function setUpTable(){
	var table = document.getElementById('table');
	for(var i = 0; i < 3; i++){
		var tr = document.createElement('tr');
		
		for(var j = 0; j < 3; j++){
			var td = document.createElement('td');
			var b = document.createElement('button');
			b.type = 'button';
			b.innerHTML = '-';
			b.id = ((i * 3) + j).toString();
			td.append(b);
			tr.append(td);

		}
		table.append(tr);
	}
}

function setUpButtonListeners(board){
	// alert(board.handleMouseClick);
	for(var i = 0; i < 9; i++){
		var t = i.toString();

		document.getElementById(t).onclick = function(e) {
			board.handleMouseClick(e);
		}
	}
}