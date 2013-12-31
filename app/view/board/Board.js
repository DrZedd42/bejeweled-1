Ext.define('Bejeweled.view.board.Board', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.gameboard',

	layout: 'column',

	items: [{
			xtype: 'scorelist',
			columnWidth: 0.2
		}, 
		{
			title: 'Game Board',
			columnWidth: 0.8
		}
	],
	
	initComponent: function() {
		this.callParent(arguments);
	}
});
