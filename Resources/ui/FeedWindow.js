//A window object which will be associated with the stack of windows
exports.FeedWindow = function(args) {
	//var AddWindow = require('ui/AddWindow').AddWindow;

	require('models/rssData').fetchRSSData('https://events.jftc.nato.int/rss.xml');
	var theme = require('theme/theme').styles.feed;
	var self = Ti.UI.createWindow(args);

	var tableview = Ti.UI.createTableView();
	//var isDone = args.isDone;
	//Ti.API.info('getting table data...');
	//getCategoryData();
	self.add(tableview);
	//tableview.setData(getCategoryData());
	// helper function for adding rows, we'll need this later
	var addTableRows = function(tblData){
		var data = [];
		var row = null;
		Ti.API.info('feed title: '+tblData.blogTitle);
	
		for (var i = 0; i < tblData.blogPosts.length; i++) {
			//Ti.API.info(JSON.stringify(gw.weatherData[i]));	
			//row = require('theme/theme').feed.tableRow;
			row = Ti.UI.createTableViewRow(theme.tableRow);
			//row.title = tblData.blogPosts[i].postTitle;
			//Ti.API.info(tblData.blogPosts[i].postLink);
			row.myId = i;
			row.className = 'tableRowClass';
			row.link = tblData.blogPosts[i].postLink;
			//var rowTitleLabel = require('theme/theme').feed.rowTitleLabel;
			var rowTitleLabel = Ti.UI.createLabel(theme.rowTitleLabel);
			rowTitleLabel.text = tblData.blogPosts[i].postTitle;
			//rowTitleLabel.text = i;
			row.add(rowTitleLabel);
			row.add(Ti.UI.createImageView(theme.rowImage));
			data.push(row);
		}
		tableview.setData(data);			
	};

	Ti.App.addEventListener('net:rssDataReturned', function(e){
		Ti.API.info('refreshing RSS data table...');
		// Set the window's title
		self.title = e.blogTitle;
		// Add the table rows
		addTableRows(e);
	});

	tableview.addEventListener('click', function(e) {
		//createConfirmDialog(e.source.id, e.source.title, isDone).show();
		Ti.API.info(e.row.myId+'');
		Ti.Platform.openURL(e.row.link);
	});

	return self;
};
