Ext.define('Bejeweled.view.score.List', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.scorelist',
	renderTo: Ext.getBody(),

	title: 'Leadership Board',
	store: 'Scores',

	initComponent: function() {
	
		this.columns = [
			{ header: 'Name', dataIndex: 'name', flex: 1 },
			{ header: 'Score', dataIndex: 'score', flex: 1 }
		];

		this.callParent(arguments);
	}
});
