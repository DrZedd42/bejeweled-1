Ext.define('Bejeweled.controller.Scores', {
	extend: 'Ext.app.Controller',

	views: ['score.List'],
	stores: ['Scores'],
	models: ['Score'],

	init: function() {
		// set up listeners on views
		this.control({
			// find every Panel that is a direct child of a Viewport
			'viewport > panel': {
				render: this.onPanelRendered
			}
		});
	},

	onPanelRendered: function() {
		console.log('The panel was rendered');
	}
});
