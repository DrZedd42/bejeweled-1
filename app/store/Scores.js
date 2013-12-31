Ext.define('Bejeweled.store.Scores', {
	extend: 'Ext.data.Store',
	model: 'Bejeweled.model.Score',

	data: [
		{ name: 'Ed', score: 30 },
		{ name: 'Tommy', score: 50 }
	]
});
