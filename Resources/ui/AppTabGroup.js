exports.AppTabGroup = function() {
	var self = Ti.UI.createTabGroup();
	Ti.API.info('# of tabs: '+arguments.length);
	//loop through tab objects and add them to the tab group
	for (var i = 0, l = arguments.length; i < l; i++) {
		var tab = Ti.UI.createTab(arguments[i]);
		Ti.API.info('building tab: '+arguments[i].title);
		//on initialization, we track the current tab as the first one added
		if (i === 0) {
			self.currentTab = tab;
		}
		self.addTab(tab);

	}

	//track the current tab for the tab group
	self.addEventListener('focus', function(e) {
		self.currentTab = e.tab;
	});

	return self;
};

exports.aboutWindow = function() {
	var theme = require('theme/theme').styles.about;

	var win = Ti.UI.createWindow({
		title: 'About',
		//backgroundColor: '#6666ff',
		//backgroundColor: '#107FC9',
		backgroundColor: '#ddddff',
		fullscreen: false,
		modal: true
	});
	
	var data = [];
	
	var labelData = [];
	
	labelData.push('The JFTC Events App provides essential information for audiences attending training events at the NATO Joint Force Training Centre (JFTC) in Bydgoszcz, Poland.');
	labelData.push('LTC Bob Sims developed this app with support of the JFTC Training Support Division.');
	labelData.push('This app uses data from multiple open sources, including the JFTC Event Registration website, Google map data published by the Bydgoszcz Municipal Tourist Information Centre, and dynamic weather information provided by the Google Weather API.');
	labelData.push('Icons retrieved from dryicons.com and Google\'s Map Icons project, although this recognition does not imply official endorsement.');
	labelData.push('Disclaimer: this app provided as part of a small and unfunded pilot program, and as such is not officially maintained or supported by the US Department of Defense, Allied Command Transformation, JFTC, or NATO.');
	
	//Ti.API.info(labelData.toString());
	
	for (var i=0;i<labelData.length;i++) {
		var row = Ti.UI.createTableViewRow(theme.tableRow);
		if (i==0) {
			row.setBackgroundImage('theme/images/bgltblue.png');
		};
		var label = Ti.UI.createLabel({
			text:labelData[i],
			left:10,
			right:10,
			top:5,
			bottom:5,
			height:'auto',
			color:'#000',
			//color:'#fff',
			font: {
				fontSize: 16,
				//fontWeight: 'bold',
				},
			});
		row.add(label);
		data.push(row);
		
		if(i==1) {
			var row = Ti.UI.createTableViewRow(theme.tableRow);
			var button = Ti.UI.createButton(theme.button);
			button.title = 'Email Lead App Developer';
			row.add(button);
			data.push(row);
			
			var row = Ti.UI.createTableViewRow(theme.tableRow);
			var button = Ti.UI.createButton(theme.button);
			button.title = 'App Developer Unofficial Website';
			row.add(button);
			data.push(row);			
		}
				
		if(i==3) {
			var row = Ti.UI.createTableViewRow(theme.tableRow);
			var button = Ti.UI.createButton(theme.button);
			button.title = 'DryIcons.coms';
			row.add(button);
			data.push(row);
			
			var row = Ti.UI.createTableViewRow(theme.tableRow);
			var button = Ti.UI.createButton(theme.button);
			button.title = 'Open Source Map Icons';
			row.add(button);
			data.push(row);			
		}
		
		if(i==2) {
			var row = Ti.UI.createTableViewRow(theme.tableRow);
			var button = Ti.UI.createButton(theme.button);
			button.title = 'JFTC Events Registration Website';
			row.add(button);
			data.push(row);
			
			var row = Ti.UI.createTableViewRow(theme.tableRow);
			var button = Ti.UI.createButton(theme.button);
			button.title = 'Bydgoszcz Tourist Information';
			row.add(button);
			data.push(row);			
		}
	};

	var row = Ti.UI.createTableViewRow(theme.tableRow);
	var button = Ti.UI.createButton(theme.button);
	button.title = 'JFTC Public Information Website';
	row.add(button);
	data.push(row);
			
	var row = Ti.UI.createTableViewRow(theme.tableRow);
	var button = Ti.UI.createButton(theme.button);
	button.title = 'More JFTC Apps';
	row.add(button);
	data.push(row);
	
	win.add(Ti.UI.createTableView({bottom:5,separatorColor:'transparent',data:data}));
	
	return win.open();
	
};
