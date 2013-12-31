Ext.define('Bejeweled.view.board.Gameboard', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.gameboard',

	layout: 'column',

	items: [{
			xtype: 'scorelist',
			columnWidth: 0.2
		}, 
		{
			xtype: 'boardgrid',
			columnWidth: 0.8
		}
	],
	
	initComponent: function() {
		this.callParent(arguments);
	}
});
