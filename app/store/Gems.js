Ext.define('Bejeweled.store.Gems', {
	extend: 'Ext.data.Store',
	model: 'Bejeweled.model.Gem',

	data: [
		{ color1: 'red', color2: 'blue', color3: 'green', color4: 'white', color5: 'orange', color6: 'blue', color7: 'red', color8: 'white' },
		{ color1: 'green', color2: 'red', color3: 'green', color4: 'orange', color5: 'red', color6: 'red', color7: 'orange', color8: 'blue' },
		{ color1: 'blue', color2: 'white', color3: 'orange', color4: 'white', color5: 'orange', color6: 'red', color7: 'red', color8: 'red' },
		{ color1: 'orange', color2: 'white', color3: 'blue', color4: 'red', color5: 'white', color6: 'green', color7: 'blue', color8: 'green' },
		{ color1: 'white', color2: 'blue', color3: 'red', color4: 'blue', color5: 'green', color6: 'white', color7: 'blue', color8: 'red' },
		{ color1: 'green', color2: 'blue', color3: 'white', color4: 'orange', color5: 'red', color6: 'green', color7: 'blue', color8: 'white' },
		{ color1: 'blue', color2: 'red', color3: 'green', color4: 'orange', color5: 'green', color6: 'green', color7: 'blue', color8: 'red' },
		{ color1: 'red', color2: 'green', color3: 'white', color4: 'white', color5: 'red', color6: 'orange', color7: 'white', color8: 'blue' }
	],
	autoLoad: true

});
	
