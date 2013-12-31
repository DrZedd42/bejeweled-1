Ext.define('Bejeweled.controller.Games', {
	extend: 'Ext.app.Controller',

	views: ['board.Board'],

	init: function() {
		this.control({
			'viewport > panel': {
				render: this.onPanelRendered
			}
		});
	},

	onPanelRendered: function() {
		console.log('The game board panel was rendered');
	}
});
