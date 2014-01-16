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
					html:'<div style="font-size: medium;">Press PLAY to start the game.</div>',
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
							text: '<div style="color: gray;font-weight: bold; font-size: medium;">Score: </div>',
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
							border: true,
							text: '<div style="color: white;font-weight: bold;font-size: large;">PLAY</div>',
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
