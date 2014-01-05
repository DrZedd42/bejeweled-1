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
		
		if (store && count == 0) {
			store.add(new Bejeweled.model.Selected({
				color: record.get('color'+column),
				row: row,
				column: column	
			}));
			console.log("Added an item");
		}
		if (store && count == 1) {
			console.log("Attempt to swap items");


			store.removeAt(0);
			store.sync();
			console.log(store.data.getCount());
		}	
	}
});
