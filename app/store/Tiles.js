Ext.define('Bejeweled.store.Tiles', {
	extend: 'Ext.data.Store',
	model: 'Bejeweled.model.Tile',
	data: [
		{ color: 'red', value: '0' },
		{ color: 'blue', value: '1' },
		{ color: 'green', value: '2' },
		{ color: 'orange', value: '3' }, 
		{ color: 'white', value: '4' },
		{ color: 'brown', value: '5' }
	]
});
