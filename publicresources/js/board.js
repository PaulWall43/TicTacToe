function Board(p1, p2){
	var t = 5;
	return {
		arr: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
		playerTurn: true,
		p1: p1,
		p2: p2,
		ties: 0,
		updatePlayerTurn: function(){
			this.playerTurn = !this.playerTurn;
		},
		checkValidClick: function(numSpotId){
			//Check if the box is empty
			if(this.arr[numSpotId] !== undefined){
				return false;
			}
			return true;
		},
		updateBoardArray: function(numSpotId){
			//Input boolean into array 
			this.arr[numSpotId] = this.playerTurn;
		},
		updateBoardUI:function(){
			for(var i = 0; i < this.arr.length; i++){
				if(this.arr[i]){
					document.getElementById(i.toString()).innerHTML = 'X';
				} else if(this.arr[i] === false) {
					document.getElementById(i.toString()).innerHTML = 'O';
				}
			}
			
		},
		processBoard: function(){
			// alert('Click was detected on board ' + id);
			// if(!this.checkValidClick(parseInt(cell))){
			// 	console.log('INVALID CLICK');
			// 	return;
			// }
			// this.updateBoardArray(parseInt(cell));
			this.updateBoardUI();
			if(this.checkWin()){
				alert('was a win');
				this.declareWinner();
				this.clearArr();
				this.clearBoardUI();
				// this.updatePlayerScore();
				// this.resetPlayerTurn();
				var xmlHttp = new XMLHttpRequest();
				xmlHttp.open("POST", "https://calm-everglades-95428.herokuapp.com/playerwin", true);
				// if(!playerTurn)
				// 	xmlHttp.open("POST", "https://calm-everglades-95428.herokuapp.com/playeronewin", true);
				// else 
				// 	xmlHttp.open("POST", "https://calm-everglades-95428.herokuapp.com/playertwowin", true);
				xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				that = this;
				xmlHttp.onreadystatechange = function(){
					if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
						var jsonBoard = JSON.parse(xmlHttp.response);
						updateLocalBoardWithXHRBoard(that, jsonBoard);	
						that.updateBoardUI();
					}

				}

				// alert('playerid='+playerid+'&cell=' + spotId);
				xmlHttp.send();

			} else {
				if(this.checkTie()){
					this.declareTie();
					// this.clearArr();
					this.clearBoardUI();
					// this.updateTieScore();
					// this.resetPlayerTurn();


					var xmlHttp = new XMLHttpRequest();
					xmlHttp.open("POST", "https://calm-everglades-95428.herokuapp.com/tie", true);
					xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					that = this;
					xmlHttp.onreadystatechange = function(){
						if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
							var jsonBoard = JSON.parse(xmlHttp.response);
							updateLocalBoardWithXHRBoard(that, jsonBoard);	
							that.updateBoardUI();
						}

					}

					// alert('playerid='+playerid+'&cell=' + spotId);
					xmlHttp.send();

				} else {
					this.updatePlayerTurn();
				}	
			}
		},
		handleMouseClick: function(e){
			var spotId = e.toElement.id;
			var playerid;
			if (this.playerTurn){
				playerid = '0';
			} else {
				playerid = '1';
			}
			var xmlHttp = new XMLHttpRequest();


			xmlHttp.open("POST", "https://calm-everglades-95428.herokuapp.com/", true);
			xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


			that = this;
			xmlHttp.onreadystatechange = function(){
				if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
					var jsonBoard = JSON.parse(xmlHttp.response);
					// alert(this.p1);
					// alert(jsonBoard.p1);
					updateLocalBoardWithXHRBoard(that, jsonBoard);	
					that.processBoard(spotId);
				}

			}

			// alert('playerid='+playerid+'&cell=' + spotId);
			xmlHttp.send('playerid=0&cell=' + spotId);
		},
		checkWin: function (){
			// console.log('STARTING CHECKWIN');
			
			arr = convertNullArray(this.arr);
			x = this.myXOR;
			if (arr.length != 9){
				console.log('ERROR, BOARD TAMPERED WITH');
				return false;
			}

			var winConditions = [
								[0,1,2],
								[3,4,5],
								[6,7,8],
								[0,3,6],
								[1,4,7],
								[2,5,8],
								[0,4,8],
								[2,4,6]
								];
			for(var i = 0; i < winConditions.length; i++){
				if(((arr[winConditions[i][0]] && 
				arr[winConditions[i][1]] && 
				arr[winConditions[i][2]]) || 
				(!arr[winConditions[i][0]] && 
				!arr[winConditions[i][1]] && 
				!arr[winConditions[i][2]])) && 
				arr[winConditions[i][0]] !== null && 
				arr[winConditions[i][1]] !== null && 
				arr[winConditions[i][2]] !== null){
					if(i == 1){
						// alert(winConditions[i][0]);
						// alert(arr[winConditions[i][0]]);
						// alert(arr[winConditions[i][0]] !== undefined);
					}
					return true;
				}
			}
			return false;
		},
		//ONLY VALID IF CALLED AFTER CHECK WIN
		checkTie: function(){
			for(var i = 0; i < this.arr.length; i++){
				if(this.arr[i] === null){
					return false;
				}
			}
			return true;
		},
		declareWinner: function(){
			if(!this.playerTurn){
				alert('Player 1 Wins!');
			} else {
				alert('Player 2 Wins!');
			}
		},
		declareTie: function(){
			alert('Tie Game!');
		},
		clearArr: function(){
			for(var i = 0; i < this.arr.length; i++){
				this.arr[i] = undefined;
			}
		},
		clearBoardUI: function(){
			for(var i = 0; i < 9; i++){
				document.getElementById(i.toString()).innerHTML = '-';
			}
		},
		//This shold call the player update method 
		updatePlayerScore: function(){
			if(!this.playerTurn){
				this.p1.wins = this.p1.wins + 1;
				document.getElementById('P1tab').innerHTML = this.p1.name + ' Wins: ' + this.p1.wins;
			} else {
				this.p2.wins = this.p2.wins + 1;
				document.getElementById('P2tab').innerHTML =  this.p2.name + ' Wins: ' + this.p2.wins;
			}
		},
		updateTieScore: function(){
			this.ties = this.ties + 1;
			document.getElementById('Tiestab').innerHTML = 'Ties : ' + this.ties;
		},
		resetPlayerTurn: function(){
			this.playerTurn = true;
		},
		myXOR: function (a,b) {
  			return ( a || b ) && !( a && b );
		}
	}
}