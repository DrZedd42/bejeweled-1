Ext.define('Bejeweled.controller.Games', {
	extend: 'Ext.app.Controller',

	views: ['board.Gameboard', 'board.Boardgrid'],
	stores: ['Selected'],

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

	onSelect: function(grid, color2, y2, x2) {
		var store = Ext.data.StoreManager.get("Selected");
		var previous = store.getAt(0);
		console.log("First tile: " + previous.get('color') + " row: " + previous.get('row') + " column: " + previous.get('column'));
		console.log("Second tile: " + color2 + " row: " + y2 + " column: " + x2);
		// check whether the move is valid
		var y1 = previous.get('row');
		var x1 = previous.get('column');
		var color1 = previous.get('color');

		if (color1 === color2) {
			console.log("Don't swap - same color");
			return;
		}

		if (x1 == x2 && y1 == y2 - 1) {
			console.log("Swap first tile down");
			var tileScore = 10; // add 10 points for each tile
			if (y1 > 0) {
				var matchAbove = this.checkColorAbove(grid, x1, y1, color2);
				if (matchAbove >= 3) {
					this.swapTiles(grid, x1, y1, color1, x2, y2, color2);
					for (var i = y1; i < y1 - matchAbove; i--) {
						this.updateScore(tileScore);
						this.removeCell(grid, i, x1);
					}
				}
			}
			if (y2 < grid.getStore().getCount()) {
				var matchBelow = this.checkColorBelow(grid, x1, y2, color1);
				if (matchBelow >= 3) {
					this.swapTiles(grid, x1, y1, color1, x2, y2, color2);
					for (var i = y2; i < y2 + matchBelow; i++) {
						this.updateScore(tileScore);
						this.removeCell(grid, i, x1);		
					}
				}
			}
			if (x1 > 0) {
				// check that tile 2 wasn't removed 
				console.log("Check color to the left of second tile: " + color2 + " in row " + y1);
				var matchLeftSecondTile = this.checkColorLeft(grid, x1, y1, color2);
				// check that tile 1 wasn't removed
				console.log("Check color to the left of first tile: " + color1 + " in row " + y2);
				var matchLeftFirstTile = this.checkColorLeft(grid, x1, y2, color1);
			}

			var fields = grid.getStore().getAt(0).fields.items;
			var nColumns = fields.length - 1;
			
			if (x1 < nColumns - 1) {
				// check that tile 2 wasn't removed
				console.log("Check color to the right of second tile: " + color2 + " in row " + y1);
				var matchRightSecondTile = this.checkColorRight(grid, x1, y1, color2);
				// check that tile 1 wasn't removed
				console.log("Check color to the right of first tile: " + color1 + " in row " + y2);
				var matchRightFirstTile = this.checkColorRight(grid, x1, y2, color1);
			}
			grid.getStore().commitChanges();
		}
		else if (x1 == x2 && y1 == y2 + 1) {
			console.log("Swap first tile up");
		}
		else if (y1 == y2 && x1 == x2 + 1) {
			console.log("swap second tile right");
		}
		else if (y1 == y2 && x1 == x2 - 1) {
			console.log("swap second tile left");
		}
		else {
			console.log("Invalid move!");
		}
	},

	checkColorAbove: function(grid, x, y, color) {
		var matchedCount = 1;
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
		return matchedCount;
	},

	checkColorBelow: function(grid, x, y, color) {
		var matchedCount = 1;
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
		return matchedCount; 
	},

	checkColorLeft: function(grid, x, y, color) {
		console.log("TODO");
	},

	checkColorRight: function(grid, x, y, color) {
		console.log("TODO");
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
	}

});
