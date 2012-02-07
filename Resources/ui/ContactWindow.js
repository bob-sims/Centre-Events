//A window object which will be associated with the stack of windows
exports.ContactWindow = function(args) {
	//var AddWindow = require('ui/AddWindow').AddWindow;

	//require('models/rssData').fetchRSSData('https://events.jftc.nato.int/rss.xml');
	var theme = require('theme/theme').styles.contact;
	var self = Ti.UI.createWindow(args);
	//self.backgroundColor = 'red';
	
	var data = [];
	var row = Ti.UI.createTableViewRow(theme.tableRow);
	var button = Ti.UI.createButton(theme.button);
	button.title = 'JFTC Public Information Website';
	row.setBackgroundImage('theme/images/bgltblue.png');
	row.add(button);
	data.push(row);
	
	var row = Ti.UI.createTableViewRow(theme.tableRow);
	var button = Ti.UI.createButton(theme.button);
	button.title = 'JFTC Events Registration Website';
	row.setBackgroundColor('#ddddff');
	row.add(button);
	data.push(row);	

	var row = Ti.UI.createTableViewRow(theme.tableRow);
	var button = Ti.UI.createButton(theme.button);
	button.title = 'JFTC Events Registration Website';
	row.setBackgroundColor('#ddddff');
	row.add(button);
	data.push(row);	

	var row = Ti.UI.createTableViewRow(theme.tableRow);
	var button = Ti.UI.createButton(theme.button);
	button.title = 'Email JFTC Event Managers';
	row.setBackgroundColor('#ddddff');
	row.add(button);
	data.push(row);	
	
	self.add(Ti.UI.createTableView({bottom:5,separatorColor:'transparent',backgroundColor:'#ddddff',data:data}));
	
	return self;
};
