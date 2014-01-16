Ext.define('Bejeweled.view.board.Gameboard', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.gameboard',
	maxWidth: 800,
	maxHeight: 600,
	layout : 'column',
      	align: 'center',
	border: false,
	items: [
		
		/*{
			xtype: 'scorelist',
			columnWidth: 0.15,
			style: 'margin:0 auto;margin-top:80px;'
	
		},*/ 
		{
			columnWidth: 0.9,
			style: 'margin:0 auto;margin-top:40px;margin-left:160px;',
			border: false,
			align: 'middle',
			items : [
				{
          				html:'<img src="resources/images/header-2.png" height="100px width="800px">',
					border: false
     				},
				{
					html:'<p>Instructions: press PLAY to start the game. </p>',
					width: 500,
					border: false,
					id: 'instructions'
				},
				{
					xtype: 'boardgrid',
				},
				{
					xtype: 'toolbar',
					dock: 'bottom',
					height: 40,
					width: 400,
					items: [
						{
							xtype: 'tbfill' 
						},
						{
							scope: this,
							name: 'scoreField',
							text: 'Score: ',
							id: 'scorefield'
						},
						{
							name: 'score',
							text: '0',
							id: 'score'
						},
						{
							xtype: 'tbfill' 
						},
						{
							xtype: 'tbfill' 
						},
						{
							xtype: 'button',
							text: 'PLAY',
							width: 60,
							id: 'playButton',
							action: 'start'
							
						},
						{ 
							xtype: 'tbfill' 
						}
					]
				}
			
			]		
		}
	],

	

	initComponent: function() {
		this.callParent(arguments);
	}
});
