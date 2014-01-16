Ext.define('Bejeweled.view.board.Gameboard', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.gameboard',
	maxWidth: 500,
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
			
			//layout: 'fit',
			
			columnWidth: 0.9,
			style: 'margin:0 auto;margin-top:25px;margin-left:35px;',
			border: false,
			align: 'middle',
			items : [
				{
          				html:'<img src="resources/images/header.png" height="70px width="500px">',
					border: false
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
						{ xtype: 'tbfill' },
						{
							xtype: 'button',
							text: 'PLAY',
							width: 80,
							id: 'playButton',
							action: 'start'
							
						},
						{ xtype: 'tbfill' }
					]
				}
			
			]		
		}
	],

	

	initComponent: function() {
		this.callParent(arguments);
	}
});
