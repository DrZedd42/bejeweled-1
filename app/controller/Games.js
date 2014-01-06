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
			this.swapTiles(grid, tileColor, row, column);
			store.removeAt(0);
			store.sync();
			console.log(store.data.getCount());
		}	
	},

	swapTiles: function(grid, color2, y2, x2) {
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
			if (y1 > 0) {
				console.log("Check color above. Count matched to color of second tile: " + color2);
				var matchAbove = this.checkColorAbove(grid, x1, y1, color2);
				console.log("Match above: " + matchAbove);
				if (matchAbove >= 3) {
					console.log("TODO: put matched tiles into store, update score and remove tiles from grid");
				}
			}
			if (y2 < grid.getStore().getCount()) {
				console.log("Check color below. Count matched to color of first tile: " + color1);
				var matchBelow = this.checkColorBelow(grid, x1, y2, color1);
				console.log("Match below: " + matchBelow);
				if (matchBelow >= 3) {
					console.log("TODO: put matched tiles into store, update score and remove tiles from grid");
				}
			}
			if (x1 > 0) {
				console.log("Check color to the left of second tile: " + color2 + " in row " + y1);
				var matchLeftSecondTile = this.checkColorLeft(grid, x1, y1, color2);
				console.log("Check color to the left of first tile: " + color1 + " in row " + y2);
				var matchLeftFirstTile = this.checkColorLeft(grid, x1, y2, color1);
			}

			var fields = grid.getStore().getAt(0).fields.items;
			var nColumns = fields.length - 1;
			
			if (x1 < nColumns - 1) {
				console.log("Check color to the right of second tile: " + color2 + " in row " + y1);
				var matchRightSecondTile = this.checkColorRight(grid, x1, y1, color2);
				console.log("Check color to the right of first tile: " + color1 + " in row " + y2);
				var matchRightFirstTile = this.checkColorLeft(grid, x1, y2, color1);
			}
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
	}

});
