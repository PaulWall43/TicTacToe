module.exports = {
  Player: function(name, img, bio, isPlayerOne){
  return {
    name: name, 
    img: img, 
    bio: bio,
    wins: 0,
    isPlayerOne: isPlayerOne, 
    greeting: function (){
      console.log(this.name + 'says hi');
    },
    setName: function(name){
      this.name = name;
      var domUpdateEvent = new CustomEvent('setName', {});
      document.dispatchEvent(domUpdateEvent);
    },
    domUpdateName: function(){
      if(this.isPlayerOne){
        document.getElementById('P1tab').innerHTML = this.name + ' Wins: ' + this.wins; 
      } else {
        document.getElementById('P2tab').innerHTML = this.name + ' Wins: ' + this.wins; 
      }
    },
    setUp: function() {
      that = this;
      document.addEventListener('setName', function(e){
        that.domUpdateName();
      })
      this.domUpdateName()
      // var myInput = document.createElement('input');
      // myInput.addEventListener('change', function(e){
      //   console.log(e);
      //   that.setName(e.target.value); 
      // })
    }
  }
},
  Board: function(p1, p2){
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
		updateBoardUI:function(spotId){
			if(this.playerTurn){
				document.getElementById(spotId).innerHTML = 'X';
			} else {
				document.getElementById(spotId).innerHTML = 'O';
			}
		},
		processMove: function(cell){
			console.log(typeof cell);
			// alert('Click was detected on board ' + id);
			if(!this.checkValidClick(parseInt(cell))){
				console.log('INVALID CLICK');
				return;
			}
			this.updateBoardArray(parseInt(cell));
			this.updatePlayerTurn();
			// this.updateBoardUI(cell);
			// if(this.checkWin()){
			// 	this.declareWinner();
			// 	this.clearArr();
			// 	this.updatePlayerScore();
			// 	this.resetPlayerTurn();
			// } else {
			// 	if(this.checkTie()){
			// 		this.declareTie();
			// 		this.clearArr();
			// 		this.clearBoardUI();
			// 		this.updateTieScore();
			// 		this.resetPlayerTurn();
			// 	} else {
			// 		this.updatePlayerTurn();
			// 	}	
			// }
		},
		handleMouseClick(e){
			alert('IN HANDLE MOUSE CLICK');
			var spotId = e.toElement.id;

			var xmlHttp = new XMLHttpRequest();


			xmlHttp.open("POST", "http://localhost:8080/", true);
			xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			xmlHttp.onreadystatechange = function(){
				if(xmlHttp.readyState == 4 && xmlHttp.status == 200)
					alert(xmlHttp.responseText);
			}

			alert('playerid=0&cell=' + spotId);
			xmlHttp.send('playerid=0&cell=' + spotId);
		},
		checkWin: function (){
			// console.log('STARTING CHECKWIN');
			arr = this.arr;
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
				arr[winConditions[i][0]] !== undefined && 
				arr[winConditions[i][1]] !== undefined && 
				arr[winConditions[i][2]] !== undefined){
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
			if(this.playerTurn){
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
				
			} else {
				this.p2.wins = this.p2.wins + 1;
	
			}
		},
		updateTieScore: function(){
			this.ties = this.ties + 1;
			
		},
		resetPlayerTurn: function(){
			this.playerTurn = true;
		},
		myXOR: function (a,b) {
  			return ( a || b ) && !( a && b );
		}
		}
	}
};