Ext.application({
	requires: ['Ext.container.Viewport'],
	name: 'Bejeweled',

	appFolder: 'app',

	controllers: [ 'Games', 'Scores' ],

	launch: function() {
		Ext.create('Ext.container.Viewport', {
			layout: 'fit',
			items: [
				{
					xtype: 'gameboard'
				} 
			]
		});
	}
});
