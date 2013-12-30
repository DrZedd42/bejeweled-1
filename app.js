Ext.application({
	requires: ['Ext.container.Viewport'],
	name: 'Bejeweled',

	appFolder: 'app',

	launch: function() {
		Ext.create('Ext.container.Viewport', {
			layout: 'fit',
			items: [
				{
					title: 'Bejeweled',
					html : 'Hello! Welcome to Ext JS.'
				}
			]
		});
	}
});
