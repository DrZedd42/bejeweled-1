Ext.define('Bejeweled.view.board.Boardgrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.boardgrid',
	renderTo: Ext.getBody(),

	selType: 'cellmodel',
	allowDeselect: true,
	maxWidth: 400,
	maxHeight: 400,
	
	store: 'Gems',
	id: 'id-boardgrid',

	columns: [
		{
			//text: 'Color 0',
			sortable: false,
			dataIndex: 'color0',
			width: 50,
			renderer: renderIcon
		},			
		{
			//text: 'Color 1',
			sortable: false,
			dataIndex: 'color1',
			width: 50,
			renderer: renderIcon
			
		},
		{
			//text: 'Color 2',
			sortable: false,
			dataIndex: 'color2',
			width: 50,
			renderer: renderIcon
		},
		{
			//text: 'Color 3',
			sortable: false,
			dataIndex: 'color3',
			width: 50,
			renderer: renderIcon
		},
		{
			//text: 'Color 4',
			sortable: false,
			dataIndex: 'color4',
			width: 50,
			renderer: renderIcon
		},
		{
			//text: 'Color 5',
			sortable: false,
			dataIndex: 'color5',
			width: 50,
			renderer: renderIcon
		},
		{
			//text: 'Color 6',
			sortable: false,
			dataIndex: 'color6',
			width: 50,
			renderer: renderIcon
		},
		{
			//text: 'Color 7',
			sortable: false,
			dataIndex: 'color7',
			width: 50,
			renderer: renderIcon
		}
	]
});

function renderIcon(color, metaData, record, row, column, store, gridView) {
	//console.log("Rendering tiles...");
	switch(color) {
		case "red":
			return '<img style="width:35px;height:35px" src="resources/images/red.jpeg"/>';
		case "blue":
			return '<img style="width:35px;height:35px" src="resources/images/blue.jpeg"/>';
		case "green":
			return '<img style="width:35px;height:35px" src="resources/images/green.jpeg"/>';	
		case "orange":
			return '<img style="width:35px;height:35px" src="resources/images/orange.jpeg"/>';	
		case "white":
			return '<img style="width:35px;height:35px" src="resources/images/white.jpg"/>';	
		default:
			return '<img style="width:35px;height:35px" src="resources/images/blank.jpeg"/>';	
	}
	
}
