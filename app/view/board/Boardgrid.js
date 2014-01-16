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
	hideHeaders: true,
	columns: [
		{
			dataIndex: 'color0',
			sortable: false,
			width: 50,
			renderer: renderIcon
		},			
		{
			dataIndex: 'color1',
			sortable: false,
			width: 50,
			renderer: renderIcon
			
		},
		{
			dataIndex: 'color2',
			sortable: false,
			width: 50,
			renderer: renderIcon
		},
		{
			dataIndex: 'color3',
			sortable: false,
			width: 50,
			renderer: renderIcon
		},
		{
			dataIndex: 'color4',
			sortable: false,
			width: 50,
			renderer: renderIcon
		},
		{
			dataIndex: 'color5',
			sortable: false,
			width: 50,
			renderer: renderIcon
		},
		{
			dataIndex: 'color6',
			sortable: false,
			width: 50,
			renderer: renderIcon
		},
		{
			dataIndex: 'color7',
			sortable: false,
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
		case "brown":
			return '<img style="width:35px;height:35px" src="resources/images/brown.jpg"/>';	
		default:
			return '<img style="width:35px;height:35px" src="resources/images/blank.jpeg"/>';	
	}
	
}
