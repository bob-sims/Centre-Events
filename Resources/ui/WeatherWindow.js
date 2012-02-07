var theme = require('theme/theme').styles.weather;

//A window object which will be associated with the stack of windows
exports.WeatherWindow = function(args) {
	//var AddWindow = require('ui/AddWindow').AddWindow;
	require('models/googleWeather').fetchWeatherData('bydgoszcz,poland');
	var self = Ti.UI.createWindow(args);
	self.backgroundColor = '#6666ff';
	var tableview = Ti.UI.createTableView();

	self.add(tableview);
	
	var addTableRows = function(tblData){
		var data = [];
		var row = null;
		Ti.API.info('city: '+tblData.forecastInfo.city);
		
		row = Ti.UI.createTableViewRow(theme.infoTableRow);
		//row.title = tblData.forecastInfo.city+' ('+tblData.forecastInfo.forecast_date+')';
		var cityLabel = Ti.UI.createLabel(theme.infoTableRow.cityLabel);			
		cityLabel.text = tblData.forecastInfo.city;
		
		//var dateLabel = Ti.UI.createLabel({text:tblData.forecastInfo.forecast_date});
		row.add(cityLabel);
		//row.add(dateLabel);
		
		var rowCurrentWeather = Ti.UI.createTableViewRow(theme.currentTableRow);
		//rowCurrentWeather.rightImage = 'http://www.google.com'+tblData.currentConditions.icon;
		
				
		var leftContainerView = Ti.UI.createView(theme.currentTableRow.leftContainer);
		var dateTextArray = tblData.forecastInfo.forecast_date.split('-');
			
		var dateLabel = Ti.UI.createLabel(theme.currentTableRow.dateLabel);
		dateLabel.text = dateTextArray[2]+'-'+dateTextArray[1]+'-'+dateTextArray[0];

		var tempLabel = Ti.UI.createLabel(theme.currentTableRow.tempLabel);
		tempLabel.text = tblData.currentConditions.temp_f+'F / '+tblData.currentConditions.temp_c+'C';
					
		var iconView = Ti.UI.createImageView(theme.currentTableRow.iconView);
		iconView.url = 'http://www.google.com'+tblData.currentConditions.icon;
		var conditionLabel = Ti.UI.createLabel(theme.currentTableRow.conditionLabel);
		conditionLabel.text = tblData.currentConditions.condition;
		
		var rightContainerView = Ti.UI.createView(theme.currentTableRow.rightContainer);
		rightContainerView.add(dateLabel);
		rightContainerView.add(iconView);
		rightContainerView.add(conditionLabel);
		
		var humidLabel = Ti.UI.createLabel(theme.currentTableRow.humidLabel);
		humidLabel.text = tblData.currentConditions.humidity;
		
		var windLabel = Ti.UI.createLabel(theme.currentTableRow.windLabel);
		windLabel.text = tblData.currentConditions.wind_condition;
		
		leftContainerView.add(tempLabel);
		leftContainerView.add(humidLabel);
		leftContainerView.add(windLabel);
		rowCurrentWeather.add(leftContainerView);
		rowCurrentWeather.add(rightContainerView);
		
		/*
		row = Ti.UI.createTableViewRow({
			title:tblData.forecastInfo.city+' ('+tblData.forecastInfo.forecast_date+')',
			color: '#000',
			font: {
				fontWeight: 'bold'	
			},
		}); */

		data.push(row);
		data.push(rowCurrentWeather);
	
		for (var i = 0; i < tblData.forecastConditions.length; i++) {
			//Ti.API.info(JSON.stringify(gw.weatherData[i]));	
			
			row = Ti.UI.createTableViewRow({
				id: i,
				title: tblData.forecastConditions[i].day_of_week+': '+tblData.forecastConditions[i].condition,
				color: '#000',
				backgroundImage:'theme/images/bgltblue.png',
				font: {
					fontWeight: 'bold'	
				},
				//leftImage: 'http://www.google.com'+tblData.forecastConditions[i].icon,
			});
			var rightContainer = Ti.UI.createView(theme.forecastTableRow.rightContainer);
			var iconView = Ti.UI.createImageView(theme.forecastTableRow.iconView);
			//iconView.url = 'http://www.google.com'+tblData.forecastConditions[i].icon;
			iconView.image = 'http://www.google.com'+tblData.forecastConditions[i].icon;
			var conditionLabel = Ti.UI.createLabel(theme.forecastTableRow.conditionLabel);
			conditionLabel.text = tblData.forecastConditions[i].condition;
			rightContainer.add(iconView);
			rightContainer.add(conditionLabel);
			var leftContainer = Ti.UI.createView(theme.forecastTableRow.leftContainer);
			var tempLabel = Ti.UI.createLabel(theme.forecastTableRow.tempLabel);
			tempLabel.text = tblData.forecastConditions[i].day_of_week+': '+
				tblData.forecastConditions[i].low+'-'+tblData.forecastConditions[i].high;
			leftContainer.add(tempLabel);
			row.add(leftContainer);
			row.add(rightContainer);
			data.push(row);
		}			
		tableview.setData(data);			
	};

	Ti.App.addEventListener('net:weatherDataReturned', function(e){
		// Set the window's title
		self.title = 'Bydgoszcz Weather';
		// Add the table rows
		addTableRows(e.weatherData);
	});

	tableview.addEventListener('click', function(e) {
		//createConfirmDialog(e.source.id, e.source.title, isDone).show();
		Ti.API.info(e.source.id+'');
	});

	return self;
};