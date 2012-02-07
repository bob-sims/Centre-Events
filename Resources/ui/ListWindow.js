var theme = require('theme/theme').styles.list;
var mapTheme = require('theme/theme').styles.map;
//Ti.API.info('bullet: '+theme.bullet);

//A window object which will be associated with the stack of windows
exports.ListWindow = function(args) {
	//var AddWindow = require('ui/AddWindow').AddWindow;
	var theme = require('theme/theme').styles.map;
	var self = Ti.UI.createWindow(args);
	var tableview = Ti.UI.createTableView();

	//var isDone = args.isDone;
	Ti.API.info('getting table data...');
	tableview.setData(getCategoryData());
	
	self.add(tableview);
	
	tableview.addEventListener('click', function(e) {
		//createConfirmDialog(e.source.id, e.source.title, isDone).show();
		Ti.API.info(e.row.myId+'');
				// using a modal window on iOS gives us the title bar
		// which we need for the back button
		var itemWin = Titanium.UI.createWindow({
			backgroundColor: '#fff',
			title:e.row.title,
			modal:true
		});
		
		var tableview = Ti.UI.createTableView({
			filterAttribute:'filter',			
		});
		//define our search bar which will attach
		//to our table view
		var searchBar = Titanium.UI.createSearchBar({
			showCancel:true,
			height:43,
			top:5
		});
		
		//print out the searchbar value whenever it changes
		searchBar.addEventListener('change', function(e){
			//search the tableview as user types
			Ti.API.info('user searching for: ' + e.value);
		});
		//when the return key is hit, remove focus from
		//our searchBar
		searchBar.addEventListener('return', function(e){
			searchBar.blur();
		});
		//when the cancel button is tapped, remove focus
		//from our searchBar
		searchBar.addEventListener('cancel', function(e){
			searchBar.blur();
		});
		tableview.search = searchBar;
				
		tableview.setData(getItemData(e.row.myId+''));
		
		tableview.addEventListener('click', function(e) {
			Ti.API.info('Item ID: '+e.row.myId+'');
			var itemMapWin = Titanium.UI.createWindow({
				backgroundColor: '#fff',
				title:e.row.title,
				modal:true
			});

			itemMapWin.open();	
			
			// add map after window opens
			itemMapWin.addEventListener('open', function() {
				//Ti.API.info('mapwin open!');
				Ti.API.info('Create map view for '+e.row.title+' longitude: '+e.row.longitude+
				' latitude: '+e.row.latitude);

				var mapview = Titanium.Map.createView({
					//mapType: Titanium.Map.STANDARD_TYPE,
					//region:{latitude:33.74511, longitude:-84.38993, latitudeDelta:0.05, longitudeDelta:0.05},
					mapType: Titanium.Map.SATELLITE_TYPE,					
					region:{latitude:e.row.latitude, longitude:e.row.longitude, latitudeDelta:0.01, longitudeDelta:0.01},
					animate:true,
					regionFit:true,
					userLocation:false,
				});
				
				var poiPin = Titanium.Map.createAnnotation({
					latitude:parseFloat(e.row.latitude),
					longitude:parseFloat(e.row.longitude),
					title:e.row.title,
					//pincolor:Titanium.Map.ANNOTATION_RED,
					description:e.row.description,
					image:e.row.leftImage,
					id:e.row.myId,
					rightButton:'theme/images/globe.png',
					leftButton:'theme/images/send_mail.png',
					animate:true,
				});
				mapview.addAnnotation(poiPin);
				
				//create the event listener for when annotations
				//are tapped on the map
				mapview.addEventListener('click', function(e){
					//Ti.API.info('clicked: '+e.x);
					if (e.clicksource === 'rightButton') {
						//itemDetailWindow(e);
						//Ti.Platform.openURL('http://maps.google.com/maps?t=m&daddr=' + e.annotation.latitude+
						//	','+e.annotation.longitude);
						Ti.Platform.openURL('http://maps.google.com/maps?q=' + e.annotation.latitude+
							','+e.annotation.longitude);
					};
					if (e.clicksource === 'leftButton') {
						var subject = e.annotation.title;
						var text = 'http://maps.google.com?q='+e.annotation.latitude+','+e.annotation.longitude;
						var share = require('utils/utils').createShareOptions(subject,text);
						Ti.Android.currentActivity.startActivity(share);
					};
				});
				
				mapview.addEventListener('regionChanged', function(e){
					//Ti.API.info('region change: '+JSON.stringify(e.globalPoint));
				});
				
				itemMapWin.add(mapview);
				
				
				//itemMapWin.add(button);
			});
		});
		
		
		itemWin.add(tableview);
		if(Ti.Platform.osname!='android') {
			// add a close button on iOS
			var btn = Ti.UI.createButton({
				title:'Close'
			});
			btn.addEventListener('click', function(){
				itemWin.close();
			})
			itemWin.leftNavButton = btn;
		}
		itemWin.open();
	});
/*
	Ti.App.addEventListener('app:updateTables', function() {
		tableview.setData(getTableData(isDone));
	});
*/	
	return self;
};

var itemDetailWindow = function(e) {
	Ti.API.info('Annotation id that was tapped: ' + e.annotation.id);
	Ti.API.info('Annotation button source that was tapped: '+e.clicksource);
	
	win = Ti.UI.createWindow(mapTheme.defaultWindow);
	
	var webView = Ti.UI.createWebView(mapTheme.detailWebView);
	webView.html = '<html><head>'+
		'<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=5.0"/>'+
		'<meta name="apple-mobile-web-app-capable" content="yes" />'+
		'<title>'+e.annotation.title+'</title>'+
		'</head><body>'+e.annotation.description+'</body></html>';
	
	win.add(webView);
	win.open({ modal: true, fullscreen: false });
		
};

var getCategoryData = function() {
	var db = require('models/db');
	
	var data = [];
	var row = null;
	//Ti.API.info('running query for categories...');
	var categories = db.selectCategories();
	
	for (var i = 0; i < categories.length; i++) {
//		Ti.API.info('creating category row: '+i);
		row = Ti.UI.createTableViewRow(theme.tableRow);
		row.myId = categories[i].id;
		row.title = categories[i].name;
		row.leftImage = 'icons/'+categories[i].icon;
		
		var titleLabel = Ti.UI.createLabel(theme.rowTitleLabel);
		titleLabel.text = categories[i].name;
		row.add(titleLabel);
		data.push(row);
	}
	return data;
};

var getItemData = function(categoryID) {
	var db = require('models/db');
	var data = [];
	var row = null;
	Ti.API.info('running query for items...');
	var items = db.selectItems(categoryID);
	
	for (var i = 0; i < items.length; i++) {
		row = Ti.UI.createTableViewRow(theme.itemRow);
		row.myId = items[i].id;
		row.title = items[i].name;
		row.longitude = items[i].longitude;
		row.latitude = items[i].latitude;
		row.description = items[i].description;
		row.leftImage = 'icons/'+items[i].icon;
		row.filter = items[i].name;
		
		data.push(row);
	}
	return data;
};

/*
var createConfirmDialog = function(id, title, isDone) {
	var db = require('db');
	var buttons, doneIndex, clickHandler;
	
	if (isDone) {
		buttons = ['Delete', 'Cancel'];	
		clickHandler = function(e) {
			if (e.index === 0) {
				db.deleteItem(id);
				Ti.App.fireEvent('app:updateTables');
			}
		};
	} else {
		buttons = ['Done', 'Delete', 'Cancel'];
		clickHandler = function(e) {
			if (e.index === 0) {
				db.updateItem(id, 1);
				Ti.App.fireEvent('app:updateTables');
			} else if (e.index === 1) {
				db.deleteItem(id);
				Ti.App.fireEvent('app:updateTables');
			}
		};
	}
	
	var confirm = Ti.UI.createAlertDialog({
		title: 'Change Task Status',
		message: title,
		buttonNames: buttons
	});
	confirm.addEventListener('click', clickHandler);
	
	return confirm;
}; */