Ext.define('Bejeweled.controller.Games', {
	extend: 'Ext.app.Controller',

	views: ['board.Gameboard', 'board.Boardgrid'],
	stores: ['Selected', 'Tiles', 'Affected'],

	init: function() {
		this.control({
			'viewport > panel': {
				render: this.onPanelRendered
			},
			'boardgrid': {
				select: this.itemSelected
				//deselect: this.deselectCell
			},
			'gameboard button[action=start]': {
				click: this.startGame
			}
		});
	},

	onPanelRendered: function() {
		console.log('The game board panel was rendered');
	},

	startGame: function(button) {
		console.log("clicked PLAY button");
		// initialize the board
		var grid = Ext.getCmp('id-boardgrid');
		var tileStore = Ext.data.StoreManager.get("Tiles"); 
		var gemStore = grid.getStore();
		var nColors = tileStore.getCount(); 
		var store = Ext.data.StoreManager.get("Affected");

		for (var i = 0; i < gemStore.getCount(); i++) {
			for (var j = 0; j < gemStore.getCount(); j++) {
				var r = Math.floor(Math.random() * nColors);
				var columnToPull = 'color'+(j);
				if (r >= 0 && r < nColors) {
					var color = tileStore.getAt(r).data.color;
					var record = grid.getStore().getAt(i);
					if (record) {
						record.set(columnToPull, color);
						if (record) {
							record.set(columnToPull, color);
							if (store) {
								store.add(new Bejeweled.model.Selected({
									color: color,
									row: i,
									column: j	
								}));
							}
						}
					}
				}
			}
		}
		this.checkAffected(grid);
		this.checkBoard(grid);
		grid.getStore().commitChanges();
		gemStore.commitChanges();
		grid.getStore().sync();

		var instructions = Ext.getCmp("instructions");
		instructions.update('<p>Instructions: match at least 3 tiles of the same color<p>');
	},

	itemSelected: function(grid, record, row, column) {
		var store = Ext.data.StoreManager.get("Selected");
		var count = store.data.getCount();
		var tileColor = record.get('color' + column);
	
		if (store && count == 0) {
			store.add(new Bejeweled.model.Selected({
				color: tileColor,
				row: row,
				column: column	
			}));
		}
		if (store && count == 1) {
			var result = this.onSelect(grid, tileColor, row, column);
			if (result) {
				store.removeAll();
				var affected = Ext.data.StoreManager.get("Affected");
				if (affected) {
					affected.removeAll();	
					// check the whole board 
					var items = grid.store.data.items;
					for (var i = 0; i < items.length; i++) {
						var tileRow = items[i].data;
						for (var j = 0; j < grid.store.getCount(); j++) {
							var cell = 'color'+(j).toString();
							var color = grid.getStore().getAt(i).data[cell];
							affected.add(new Bejeweled.model.Selected({
								color: color,
								row: i,
								column: j	
							}));
							
						}
					}
					this.checkAffected(grid);
				}
			}
			//var boardGrid = Ext.getCmp('id-boardgrid');
			//boardGrid.getView().deselectAll();
		}
		return;	
	},

	onSelect: function(grid, color2, row2, column2) {
		var store = Ext.data.StoreManager.get("Selected");
		var previous = store.getAt(0);

		// check whether the move is valid
		var row1 = previous.get('row');
		var column1 = previous.get('column');
		var color1 = previous.get('color');
	
		if (color1 === color2) {
			return false;
		}
		else {
			var result = this.attemptToSwap(grid, row1, column1, color1, row2, column2, color2);
			if (result) {
				this.checkAffected(grid);
				this.checkBoard(grid);
			}
			return true;
		}
	},

	attemptToSwap: function(grid, row1, column1, color1, row2, column2, color2) {
		// add 10 points for each matched tile
		var tileScore = 10; 

		if ((column1 === column2) && (row1 === row2 - 1)) {
			return this.swapFirstTileDown(grid, tileScore, row1, column1, color1, row2, column2, color2);
		}
		else if ((column1 === column2) && (row1 === row2 + 1)) {
			return this.swapFirstTileUp(grid, tileScore, row1, column1, color1, row2, column2, color2);
		}
		else if ((row1 === row2) && (column1 === column2 + 1)) {
			return this.swapFirstTileLeft(grid, tileScore, row1, column1, color1, row2, column2, color2);
		}
		else if ((row1 === row2) && (column1 === column2 - 1)) {
			return this.swapFirstTileRight(grid, tileScore, row1, column1, color1, row2, column2, color2);
		}			
		else {
			console.log("Invalid move!");
		}
		return false;
	},

	swapFirstTileUp: function(grid, tileScore, row1, column1, color1, row2, column2, color2) {	
		var matchAbove = this.checkColorAbove(grid, column1, row2, color1);
		var matchBelow = this.checkColorBelow(grid, column1, row1, color2);
		var matchRow1Left = this.checkColorLeft(grid, column1, row2, color1);
		var matchRow1Right = this.checkColorRight(grid, column1, row2, color1);
		var row1match = matchRow1Left + matchRow1Right - 1;
		var matchRow2Left = this.checkColorLeft(grid, column1, row1, color2);
		var matchRow2Right = this.checkColorRight(grid, column1, row1, color2);
		var row2match = matchRow2Left + matchRow2Right - 1;
		
		if ((matchAbove >= 3) || (matchBelow >= 3) || (row1match >= 3) || (row2match >= 3)) {
			this.swapTiles(grid, column1, row1, color1, column2, row2, color2);
		}
		else {
			return false;
		}

		if (matchAbove >= 3) {
			for (var i = row2; i > row2 - matchAbove; i--) {
				this.updateScore(tileScore);
				this.removeCell(grid, i, column1);
			}
			this.pullTiles(grid, row2, column1, matchAbove);
			return true;
		}
		else if (matchBelow >= 3) {	
			for (var i = row1; i < row1 + matchBelow; i++) {
				this.updateScore(tileScore);
				this.removeCell(grid, i, column1);		
			}
			var bottomRow = row1 + matchBelow - 1;
			this.pullTiles(grid, bottomRow, column1, matchBelow);
			return true;
		}
		else if (row1match >= 3) {
			var start = column1 - matchRow1Left + 1;
			var end = start + row1match - 1;
			for (var i = start; i < end; i++) {
				this.updateScore(tileScore);
				this.removeCell(grid, row2, i);	
				this.pullTiles(grid, row2, i, 1); 	
			}
			return true;
		}
		else if (row2match >= 3) {
			var start = column1 - matchRow2Left + 1;
			var end = start + row2match - 1;
			for (var i = start; i <= end; i++) {
				this.updateScore(tileScore);
				this.removeCell(grid, row1, i);
				this.pullTiles(grid, row1, i, 1); 
							
			}
			return true;
		}
		
	},

	swapFirstTileDown: function(grid, tileScore, row1, column1, color1, row2, column2, color2) {
		var matchAbove = this.checkColorAbove(grid, column1, row1, color2);
		var matchBelow = this.checkColorBelow(grid, column1, row2, color1);	
		var matchRow1Left = this.checkColorLeft(grid, column1, row1, color2);
		matchRow1Right = this.checkColorRight(grid, column1, row1, color2);
		var row1match = matchRow1Left + matchRow1Right - 1;
		matchRow2Left = this.checkColorLeft(grid, column1, row2, color1);
		matchRow2Right = this.checkColorRight(grid, column1, row2, color1);
		var row2match = matchRow2Left + matchRow2Right - 1;

		if ((matchAbove >= 3) || (matchBelow >= 3) || (row1match >= 3) || (row2match >= 3)) {
			this.swapTiles(grid, column1, row1, color1, column2, row2, color2);
		}
		else {
			return false;
		}

		if (matchAbove >= 3) {
			for (var i = row1; i > row1 - matchAbove; i--) {
				this.updateScore(tileScore);
				this.removeCell(grid, i, column1);
			}
			this.pullTiles(grid, row1, column1, matchAbove);
			return true;
		}
		else if (matchBelow >= 3) {	
			for (var i = row2; i < row2 + matchBelow; i++) {
				this.updateScore(tileScore);
				this.removeCell(grid, i, column1);		
			}
			var bottomRow = row2 + matchBelow - 1;
			this.pullTiles(grid, bottomRow, column1, matchBelow);
			return true;
		}
		else if (row1match >= 3) {
			var start = column1 - matchRow1Left + 1;
			var end = start + row1match - 1;
			for (var i = start; i < end; i++) {
				this.updateScore(tileScore);
				this.removeCell(grid, row1, i);	
				this.pullTiles(grid, row1, i, 1); 
			}
			return true;	
		}	
		else if (row2match >= 3) {	
			var start = column1 - matchRow2Left + 1;
			var end = start + row2match - 1;
			for (var i = start; i <= end; i++) {
				this.updateScore(tileScore);
				this.removeCell(grid, row2, i);
				this.pullTiles(grid, row2, i, 1); 		
			}
			return true;
		}
	},

	swapFirstTileLeft: function(grid, tileScore, row1, column1, color1, row2, column2, color2) {
		var matchRowLeft = this.checkColorLeft(grid, column2, row2, color1);
		var matchRowRight = this.checkColorRight(grid, column1, row2, color2);
		var matchCol1Above = this.checkColorAbove(grid, column1, row1, color2);
		var matchCol1Below = this.checkColorBelow(grid, column1, row1, color2);
		var matchColumn1 = matchCol1Above + matchCol1Below - 1;		
		var matchCol2Above = this.checkColorAbove(grid, column2, row1, color1);
		var matchCol2Below = this.checkColorBelow(grid, column2, row1, color1);
		var matchColumn2 = matchCol2Above + matchCol2Below - 1;	

		if ((matchRowLeft >= 3) || (matchRowRight >= 3) || (matchColumn1 >= 3) || (matchColumn2 >= 3)) {
			this.swapTiles(grid, column1, row1, color1, column2, row2, color2);
		}
		else {
			return false;
		}

		if (matchRowLeft >= 3) {
			var start = column2 - matchRowLeft + 1;
			var end = column2;
			for (var i = start; i <= end; i++) {
				this.updateScore(tileScore);
				this.removeCell(grid, row2, i);
				this.pullTiles(grid, row2, i, 1); 							
			}
			return true;
		}
		else if (matchRowRight >= 3) {		
			var start = column1;
			var end = start + matchRowRight - 1;
			for (var i = start; i <= end; i++) {
				this.updateScore(tileScore);
				this.removeCell(grid, row2, i);
				this.pullTiles(grid, row2, i, 1); 	
			}
			return true;
		}
		else if (matchColumn1 >= 3) {	
			var start = row1 + matchCol1Below - 1;
			var end = row1 - matchCol1Above + 1;
			for (var i = start; i >= end; i--) {
				this.updateScore(tileScore);
				this.removeCell(grid, i, column1);
			}
			this.pullTiles(grid, start, column1, matchColumn1);
			return true;
		}
		else if (matchColumn2 >= 3) {
			var start = row1 + matchCol2Below - 1;
			var end = row1 - matchCol2Above + 1;
			for (var i = start; i >= end; i--) {
				this.updateScore(tileScore);
				this.removeCell(grid, i, column2);
			}
			this.pullTiles(grid, start, column2, matchColumn2);
			return true;
		}
	},

	swapFirstTileRight: function(grid, tileScore, row1, column1, color1, row2, column2, color2) {
		var matchRowLeft = this.checkColorLeft(grid, column1, row2, color2);
		var matchRowRight = this.checkColorRight(grid, column2, row2, color1);
		var matchCol1Above = this.checkColorAbove(grid, column1, row1, color2);
		var matchCol1Below = this.checkColorBelow(grid, column1, row1, color2);
		var matchColumn1 = matchCol1Above + matchCol1Below - 1;	
		var matchCol2Above = this.checkColorAbove(grid, column2, row1, color1);
		var matchCol2Below = this.checkColorBelow(grid, column2, row1, color1);
		var matchColumn2 = matchCol2Above + matchCol2Below - 1;	

		if ((matchRowLeft >= 3) || (matchRowRight >= 3) || (matchColumn1 >= 3) || (matchColumn2 >= 3)) {
			this.swapTiles(grid, column1, row1, color1, column2, row2, color2);
		}
		else {
			return false;
		}

		if (matchRowLeft >= 3) {		
			var start = column1 - matchRowLeft + 1;
			var end = start + matchRowLeft - 1;
			for (var i = start; i <= end; i++) {
				this.updateScore(tileScore);
				this.removeCell(grid, row2, i);
				this.pullTiles(grid, row2, i, 1); 	
			}
			return true;
		}
		else if (matchRowRight >= 3) {
			var start = column2;
			var end = start + matchRowRight - 1;
			for (var i = start; i <= end; i++) {
				this.updateScore(tileScore);
				this.removeCell(grid, row2, i);
				this.pullTiles(grid, row2, i, 1); 		
			}
			return true;
		}
		else if (matchColumn1 >= 3) {
			var start = row1 + matchCol1Below - 1;
			var end = row1 - matchCol1Above + 1;
			for (var i = start; i >= end; i--) {
				this.updateScore(tileScore);
				this.removeCell(grid, i, column1);
			}
			this.pullTiles(grid, start, column1, matchColumn1);
			return true;
		}
		else if (matchColumn2 >= 3) {
			var start = row1 + matchCol2Below - 1;
			var end = row1 - matchCol2Above + 1;
			for (var i = start; i >= end; i--) {
				this.updateScore(tileScore);
				this.removeCell(grid, i, column2);
			}
			this.pullTiles(grid, start, column2, matchColumn2);
			return true;
		}
	},

	checkColorAbove: function(grid, x, y, color) {
		var matchedCount = 1;
		if (y > 0) {
			for (var i = y-1; i >= 0; i--) { 
				var cellAbove = 'color'+(x).toString();
				var colorAbove = grid.getStore().getAt(i).data[cellAbove];
				if (colorAbove === color){
					matchedCount++;
				}
				else {
					break;
				}
			}
		}
		return matchedCount;
	},

	checkColorBelow: function(grid, x, y, color) {
		var matchedCount = 1;
		if (y < grid.getStore().getCount() - 1) {
			for (var i = y+1; i < grid.getStore().getCount(); i++) {
				var cellBelow = 'color' + (x).toString();
				var colorBelow = grid.getStore().getAt(i).data[cellBelow];
				if (colorBelow === color) {
					matchedCount++;
				}
				else {
					break;
				}
			}
		}
		return matchedCount; 
	},

	checkColorLeft: function(grid, x, y, color) {
		var matchedCount = 1;
		if (x > 0) {
			for (var i = x-1; i >= 0; i--) {
				var cellToLeft = 'color' + i.toString();
				var colorToLeft = grid.getStore().getAt(y).data[cellToLeft];
				if (colorToLeft === color) {
					matchedCount++;
				}
				else {
					break;
				}
			}
		}
		return matchedCount;
	},
	
	checkColorRight: function(grid, x, y, color) {
		var matchedCount = 1;
		var nColumns = grid.getStore().getAt(0).fields.items.length - 1;	
		if (x < nColumns-1) {
			for (var i = x+1; i < nColumns; i++) {
				var cellToRight = 'color' + i.toString();
				var colorToRight = grid.getStore().getAt(y).data[cellToRight];
				if (colorToRight === color) {
					matchedCount++;
				}
				else {
					break;
				}
			}
		}
		return matchedCount;
	},

	swapTiles: function(grid, x1, y1, color1, x2, y2, color2) {
		var column1 = 'color' + (x1).toString();
		var column2 = 'color' + (x2).toString();
		var record1 = grid.getStore().getAt(y1);
		var record2 = grid.getStore().getAt(y2);
		record1.set(column1, color2);
		record2.set(column2, color1);
		grid.getStore().commitChanges();
		grid.getStore().sync();
		return true;
	},

	updateScore: function(scoreToAdd) {
		var score = Ext.getCmp("score");
		score.setText((parseInt(score.text) + scoreToAdd).toString());
	},

	removeCell: function(grid, row, column) {
		var columnToRemove = 'color'+(column).toString();
		var colorToRemove = grid.getStore().getAt(row).data[columnToRemove];
		var record = grid.getStore().getAt(row);
		record.set(columnToRemove, "");
		grid.getStore().commitChanges();
	},

	pullTiles: function(grid, bottomRow, column, numberMatched) {	
		var columnToPull = 'color'+(column);
		var topIndex = bottomRow - numberMatched + 1; // top empty tile row index
		var store = Ext.data.StoreManager.get("Affected");

		// pull existing tiles from the top down
		if (topIndex != 0) {
			for (var i = 0; i < topIndex; i++) {			
				var row = topIndex-i-1
				var recordToSet = grid.getStore().getAt(bottomRow-i);
				var recordToClear = grid.getStore().getAt(row);
				var colorToPull = grid.getStore().getAt(row).data[columnToPull];
				recordToSet.set(columnToPull, colorToPull);
				recordToClear.set(columnToPull, "");
				if (store) {
					store.add(new Bejeweled.model.Selected({
						color: colorToPull,
						row: bottomRow-i,
						column: column	
					}));
				}
				
			}
		}

		// add new tiles
		var lowestEmptyRow = bottomRow - topIndex;
		this.addTiles(grid, numberMatched, lowestEmptyRow, column);
	},

	addTiles: function(grid, numberOfTiles, row, column) {
		// red=0 blue=1 green=2 orange=3 white=4 brown=5
		var tileStore = Ext.data.StoreManager.get("Tiles"); 
		var nColors = tileStore.getCount(); 
		var columnToPull = 'color'+(column);
		var store = Ext.data.StoreManager.get("Affected");

		for (var i=0; i < numberOfTiles; i++) {
			// add random colored tiles
			var r = Math.floor(Math.random() * nColors);
			if (r >= 0 && r < nColors) {
				var color = tileStore.getAt(r).data.color;
				var record = grid.getStore().getAt(row-i);
				if (record) {
					record.set(columnToPull, color);
					if (store) {
						store.add(new Bejeweled.model.Selected({
							color: color,
							row: row-i,
							column: column	
						}));
					}
				}
			}
		}
		grid.getStore().commitChanges();
		grid.getStore().sync();
	},

	checkAffected: function(grid) {
		var store = Ext.data.StoreManager.get("Affected");
		var bonus = 15; // add 15 points for each extra matched tile
				

		// check every direction for each affected tile
		if (store) {
			var tiles = store.data.items;
			for (var i = 0; i < store.getCount(); i++) {
				var tile = tiles[i].data;
				var matchAbove = this.checkColorAbove(grid, tile.column, tile.row, tile.color);
				var matchBelow = this.checkColorBelow(grid, tile.column, tile.row, tile.color);
				var matchCellLeft = this.checkColorLeft(grid, tile.column, tile.row, tile.color);
				var matchCellRight = this.checkColorRight(grid, tile.column, tile.row, tile.color);
				var rowMatch = matchCellLeft + matchCellRight - 1;
				var columnMatch = matchAbove + matchBelow - 1;
				
				if ((columnMatch >= 3) || (rowMatch >= 3)) {
					store.removeAll();
							
					if (columnMatch >= 3) {
						var start = tile.row + matchBelow - 1;
						var end = tile.row - matchAbove + 1;					
						for (var k = start; k >= end; k--) {
							this.updateScore(bonus);
							this.removeCell(grid, k, tile.column);
						}
						this.pullTiles(grid, start, tile.column, columnMatch);
					}
					else if (rowMatch >= 3) {
						var start = tile.column - matchCellLeft + 1;
						var end = start + rowMatch - 1;
						for (var k = start; k <= end; k++) {
							this.updateScore(bonus);
							this.removeCell(grid, tile.row, k);
							this.pullTiles(grid, tile.row, k, 1); 			
						}
					
					}
					this.checkAffected(grid); 
				}
				else {
					store.removeAt(i);
					i--;
				}
			}
			grid.getStore().commitChanges();
		}
		else {
			console.log("store is not defined");
		}	
	},

	checkBoard: function(grid) {
		var tiles = grid.store.data.items;
		console.log(tiles);
		for (var i = 0; i < grid.store.getCount(); i++) {
			for (var j=0; j < grid.store.getCount(); j++) {
				
			}
		}
	},

	deselectCell: function() {
		console.log("todo: deselect cell");
		//var boardGrid = Ext.getCmp('id-boardgrid');
		//boardGrid.getView().getSelectionModel().deselectAll();
		
	}

});
