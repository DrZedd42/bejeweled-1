Ext.define('Bejeweled.view.board.Gameboard', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.gameboard',
	width: 800,
	height: 800,
	layout: 'column',

	items: [
		{
			xtype: 'scorelist',
			columnWidth: 0.15,
			style: 'margin:0 auto;margin-top:100px;',
			align: 'left'
		}, 
		{
			xtype: 'boardgrid',
			columnWidth: 0.8,
			style: 'margin:0 auto;margin-top:100px;',
			align: 'center'
		}
		
	],
	
	initComponent: function() {
		this.callParent(arguments);
	}
});
