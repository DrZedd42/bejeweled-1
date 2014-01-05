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
		Ext.Msg.alert('Selected an item', 'row ' + row + ' col ' + column + ' record ' + record.get('color'+column));
		
		
		
	}
});
