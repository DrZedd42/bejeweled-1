Ext.define('Bejeweled.view.score.List', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.scorelist',
	id: "scorelist",
	renderTo: Ext.getBody(),

	title: 'Leadership Board',
	store: 'Scores',
	maxWidth: 300,
	
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		renderTo: document.body,
		items: [
			{
				scope: this,
				name: 'scoreField',
				text: 'Your score: ',
				id: 'scorefield'
			},
			{
				scope: this,
				name: 'score',
				text: '0',
				id: 'score'
			}
		]
	}],

	initComponent: function() {
	
		this.columns = [
			{ header: 'Name', dataIndex: 'name', flex: 1 },
			{ header: 'Score', dataIndex: 'score', flex: 1 }
		];

		this.callParent(arguments);
	}
});


