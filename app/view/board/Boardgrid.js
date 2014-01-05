Ext.define('Bejeweled.view.board.Boardgrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.boardgrid',
	renderTo: Ext.getBody(),

	selType: 'cellmodel',
	width: 800,
	height: 800,
	title: 'Game Board', 
	store: 'Gems',

	columns: [
		{
			text: 'Color 0',
			sortable: false,
			dataIndex: 'color0',
			width: 50
		},
		{
			text: 'Color 1',
			sortable: false,
			dataIndex: 'color1',
			width: 50
		},
		{
			text: 'Color 2',
			sortable: false,
			dataIndex: 'color2',
			width: 50
		},
		{
			text: 'Color 3',
			sortable: false,
			dataIndex: 'color3',
			width: 50
		},
		{
			text: 'Color 4',
			sortable: false,
			dataIndex: 'color4',
			width: 50
		},
		{
			text: 'Color 5',
			sortable: false,
			dataIndex: 'color5',
			width: 50
		},
		{
			text: 'Color 6',
			sortable: false,
			dataIndex: 'color6',
			width: 50
		},
		{
			text: 'Color 7',
			sortable: false,
			dataIndex: 'color7',
			width: 50
		}
	],

	initComponent: function() {
		this.callParent(arguments);
	}
});
