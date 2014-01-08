Ext.define('Bejeweled.controller.Games', {
	extend: 'Ext.app.Controller',

	views: ['board.Gameboard', 'board.Boardgrid'],
	stores: ['Selected', 'Tiles'],

	init: function() {
		this.control({
			'viewport > panel': {
				render: this.onPanelRendered
			},
			'boardgrid': {
				select: this.itemSelected
			}
		});
	},

	onPanelRendered: function() {
		console.log('The game board panel was rendered');
	},

	itemSelected: function(grid, record, row, column, eOpts) {
		console.log('Selected an item. ' + 'row ' + row + ' col ' + column + ' record ' + record.get('color'+column));
		
		var store = Ext.data.StoreManager.get("Selected");
		var count = store.data.getCount();
		console.log(count);
		var tileColor = record.get('color' + column);
		if (store && count == 0) {
			store.add(new Bejeweled.model.Selected({
				color: tileColor,
				row: row,
				column: column	
			}));
			console.log("Added an item");
		}
		if (store && count == 1) {
			console.log("Attempt to swap items");
			this.onSelect(grid, tileColor, row, column);
			store.removeAt(0);
			store.sync();
			console.log(store.data.getCount());
		}	
	},

	onSelect: function(grid, color2, row2, column2) {
		var store = Ext.data.StoreManager.get("Selected");
		var previous = store.getAt(0);
		console.log("First tile: " + previous.get('color') + " row: " + previous.get('row') + " column: " + previous.get('column'));
		console.log("Second tile: " + color2 + " row: " + row2 + " column: " + column2);
		// check whether the move is valid
		var row1 = previous.get('row');
		var column1 = previous.get('column');
		var color1 = previous.get('color');

		if (color1 === color2) {
			console.log("Don't swap - same color");
			return;
		}
		var tileScore = 10; // add 10 points for each tile
		var matchAbove = 0;
		var matchBelow = 0;
		var swapped = false;

		if (column1 == column2 && row1 == row2 - 1) {
			console.log("try to swap first tile down");
			matchAbove = this.checkColorAbove(grid, column1, row1, color2);
			console.log("Match above = " + matchAbove);
			if (matchAbove >= 3) {
				if (!swapped) {
					swapped = this.swapTiles(grid, column1, row1, color1, column2, row2, color2);
				}
				for (var i = row1; i > row1 - matchAbove; i--) {
					this.updateScore(tileScore);
					this.removeCell(grid, i, column1);
				}
				console.log("pull tiles down");
				this.pullTiles(grid, row1, column1, matchAbove);
			}
			matchBelow = this.checkColorBelow(grid, column1, row2, color1);
			console.log("Match below = " + matchBelow);	
			if (matchBelow >= 3) {	
				if (!swapped) {
				swapped = this.swapTiles(grid, column1, row1, color1, column2, row2, color2);
				}	
				for (var i = row2; i < row2 + matchBelow; i++) {
					this.updateScore(tileScore);
					this.removeCell(grid, i, column1);		
				}
				console.log("pull tiles down");
				console.log("row2 = " + row2 + " matchBelow = " + matchBelow);
				var bottomRow = row2 + matchBelow - 1;
				this.pullTiles(grid, bottomRow, column1, matchBelow);
			}
			grid.getStore().commitChanges();
			var fields = grid.getStore().getAt(0).fields.items;
			var nColumns = fields.length - 1;
			
		}
		else if (column1 == column2 && row1 == row2 + 1) {
			console.log("try to swap first tile up");
			matchAbove = this.checkColorAbove(grid, column1, row2, color1);
			console.log("Match above = " + matchAbove);
			if (matchAbove >= 3) {
				if (!swapped) {
					swapped = this.swapTiles(grid, column1, row1, color1, column2, row2, color2);
				}
				for (var i = row2; i > row2 - matchAbove; i--) {
					this.updateScore(tileScore);
					this.removeCell(grid, i, column1);
				}
				
				console.log("pull tiles down");
				this.pullTiles(grid, row2, column1, matchAbove);
			}
			
			matchBelow = this.checkColorBelow(grid, column1, row1, color2);
			console.log("Match below = " + matchBelow);	
			if (matchBelow >= 3) {
				if (!swapped) {
				swapped = this.swapTiles(grid, column1, row1, color1, column2, row2, color2);
				}	
				for (var i = row1; i < row1 + matchBelow; i++) {
					this.updateScore(tileScore);
					this.removeCell(grid, i, column1);		
				}
				console.log("pull tiles down");
				var bottomRow = row1 + matchBelow - 1;
				console.log("bottomRow = " + bottomRow);
				this.pullTiles(grid, bottomRow, column1, matchBelow);
				
			}
			grid.getStore().commitChanges();
		}
		//else if (y1 == y2 && x1 == x2 + 1) {
			//console.log("swap second tile right");
		//}
		//else if (y1 == y2 && x1 == x2 - 1) {
		//	console.log("swap second tile left");
		//}
		//else {
		//	console.log("Invalid move!");
		//}
	},

	checkColorAbove: function(grid, x, y, color) {
		var matchedCount = 1;
		if (y > 0) {
			for (var i = y-1; i >= 0; i--) { 
				var cellAbove = 'color'+(x).toString();
				var colorAbove = grid.getStore().getAt(i).data[cellAbove];
				console.log("y: " + i + " x: " + x + " color: " + colorAbove);
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
		if (y < grid.getStore().getCount()-1) {
			for (var i = y+1; i < grid.getStore().getCount(); i++) {
				var cellBelow = 'color' + (x).toString();
				var colorBelow = grid.getStore().getAt(i).data[cellBelow];
				console.log("y: " + i + " x: " + x + " color: " + colorBelow);
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
			// check to the left of x
			for (var i = x-1; i >= 0; i--) {
				var cellToLeft = 'color' + i.toString();
				var colorToLeft = grid.getStore().getAt(y).data[cellToLeft];
				console.log("y: " + y + " x: " + i + " color: " + colorToLeft);
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
			// check to the right of x
			for (var i = x+1; i < nColumns; i++) {
				var cellToRight = 'color' + i.toString();
				var colorToRight = grid.getStore().getAt(y).data[cellToRight];
				console.log("y: " + y + " x: " + i + " color: " + colorToRight);
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

		console.log("record 1 : " + record1 + " record 2 : " + record2);
		console.log("column 1 : " + column1 + " column 2 : " + column2);
		record1.set(column1, color2);
		record2.set(column2, color1);
		grid.getStore().commitChanges();
		return true;
	},

	updateScore: function(scoreToAdd) {
		var scoreGrid = Ext.getCmp("scorelist");
		var score = scoreGrid.dockedItems.items[2].items.items[1];
		score.setText((parseInt(score.text) + scoreToAdd).toString());
	},

	removeCell: function(grid, row, column) {
		var columnToRemove = 'color'+(column).toString();
		var colorToRemove = grid.getStore().getAt(row).data[columnToRemove];
		console.log("Tile to remove: y: " + row + " x: " + column + " color: " + colorToRemove);
		var record = grid.getStore().getAt(row);
		record.set(columnToRemove, "");
	},

	pullTiles: function(grid, bottomRow, column, numberMatched) {	
		var columnToPull = 'color'+(column);
		var topIndex = bottomRow - numberMatched + 1; // top empty tile row index
		console.log("row = " + bottomRow + " column = " + column + " numberMatched = " + numberMatched);
		if (topIndex != 0) {  // pull existing tiles from the top down
			console.log("topIndex = " + topIndex);
			for (var i = 0; i < topIndex; i++) {
				var recordToSet = grid.getStore().getAt(bottomRow-i);
				var recordToClear = grid.getStore().getAt(topIndex-i-1);
				var colorToPull = grid.getStore().getAt(topIndex-i-1).data[columnToPull];
				console.log("color to pull = " + colorToPull);
				recordToSet.set(columnToPull, colorToPull);
				recordToClear.set(columnToPull, "");
			}
		}
		// add random colored tiles
		var lowestEmptyRow = bottomRow - topIndex;
		console.log("lowestEmptyRow = " + lowestEmptyRow);
		this.addTiles(grid, numberMatched, lowestEmptyRow, column);
	},

	addTiles: function(grid, numberOfTiles, row, column) {
		// red=0 blue=1 green=2 orange=3 white=4
		var tileStore = Ext.data.StoreManager.get("Tiles"); 
		var nColors = tileStore.getCount(); 
		var columnToPull = 'color'+(column);
		for (var i=0; i < numberOfTiles; i++) {
				// add random colored tiles
				var r = Math.floor(Math.random() * nColors);
				if (r >= 0 && r < nColors) {
					var color = tileStore.getAt(r).data.color;
					console.log("r = " + r + " color = " + color);
					var record = grid.getStore().getAt(row-i);
					if (record) {
						record.set(columnToPull, color);
						this.checkColorBelow(grid, row-i, column, color);
					}
				}
		}
	}

});
