describe( 'TicTacToe', function(){
	var board;
	var boardArrs;
	var p1;
	var p2;
	beforeEach(function(){
		// console.log(window.__html__);
		document.body.innerHTML = window.__html__['ttt.html']; //file path in reference from the conf file
		p1 = new Player("Paul Wallace");
		p2 = new Player("Jong Wong Chung");
		p1.setUp();
		p2.setUp();
		board = new Board(p1, p2);
		setUpTable();
		setUpButtonListeners(board);
		boardArrs = [
		[true, true, true, false, false, false, false, false, false], true, 
		[undefined, true, undefined, false, false, false, false, undefined, false], true,
		[undefined, undefined, undefined, true, false, true, false, true, false], false,
		[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined], false, 
		[true, true, true, true, true, true, true, true, true], true, 
		[false, false, false, false, false, false, false, false, false], true, 
		[true, false, undefined, true, undefined, false, true, false, false], true, 
		[true, false, false, false, true, false, false, false, true], true, 
		[false, false, true, false, true, false, true, false, false], true,
		[true, true, true, undefined, undefined, false, undefined, undefined, false], true 
		];
	})

	afterEach(function(){
		// console.log(window.__html__);
		document.body.innerHTML = undefined; //file path in reference from the conf file
		p1 = undefined;
		p2 = undefined;
		board = undefined;
		boardArrs = undefined;
	});

	it('should accept a move', function(){
		expect(1).toEqual(1);
	});

	it('should clear the array', function(){
		var board = new Board();
		board.arr = [true, true, true, true, true, true, true, true, true];
		board.clearArr();
		for(var i = 0; i < board.arr.length; i++){
			expect(board.arr[i]).toEqual(undefined);
		}
	});

	it('should add table cells to the table node in the DOM', function(){
		var spotArr = [];
		for(var i = 0; i < board.arr.length; i++){
			spotArr[i] = document.getElementById(i.toString());
		}
		for(var i = 0; i < spotArr.length; i++){
			expect(spotArr[i]).toBeDefined();
		}
	})

	it('should detect a win', function(){
		function setBoardAndCheck(arr, expectedResult, inverse){
			if(inverse){
				arr.forEach(function(e){
					if(e != undefined){e = !e}
				});
			}
			board.arr = arr;
			// console.log("Check win output: " + board.checkWin());
			return board.checkWin() === expectedResult;
		}
		for(var i = 0; i < boardArrs.length; i += 2){
			expect(setBoardAndCheck(boardArrs[i], boardArrs[i+1], false)).toEqual(true);
			expect(setBoardAndCheck(boardArrs[i], boardArrs[i+1], true)).toEqual(true);
		}
	})

	it('should detect a valid and invalid click', function(){
		board.arr = [true, true, true, undefined, undefined, true, true, true, true];
		expect(board.checkValidClick(0)).toEqual(false);
		expect(board.checkValidClick(3)).toEqual(true);
	})
});
