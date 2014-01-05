Ext.define('Bejeweled.store.Gems', {
	extend: 'Ext.data.Store',
	model: 'Bejeweled.model.Gem',

	data: [
		{ color0: 'red', color1: 'blue', color2: 'green', color3: 'white', color4: 'orange', color5: 'blue', color6: 'red', color7: 'white' },
		{ color0: 'green', color1: 'red', color2: 'green', color3: 'orange', color4: 'red', color5: 'red', color6: 'orange', color7: 'blue' },
		{ color0: 'blue', color1: 'white', color2: 'orange', color3: 'white', color4: 'orange', color5: 'red', color6: 'red', color7: 'red' },
		{ color0: 'orange', color1: 'white', color2: 'blue', color3: 'red', color4: 'white', color5: 'green', color6: 'blue', color7: 'green' },
		{ color0: 'white', color1: 'blue', color2: 'red', color3: 'blue', color4: 'green', color5: 'white', color6: 'blue', color7: 'red' },
		{ color0: 'green', color1: 'blue', color2: 'white', color3: 'orange', color4: 'red', color5: 'green', color6: 'blue', color7: 'white' },
		{ color0: 'blue', color1: 'red', color2: 'green', color3: 'orange', color4: 'green', color5: 'green', color6: 'blue', color7: 'red' },
		{ color0: 'red', color1: 'green', color2: 'white', color3: 'white', color4: 'red', color5: 'orange', color6: 'white', color7: 'blue' }
	],
	autoLoad: true

});
	
