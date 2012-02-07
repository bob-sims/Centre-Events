// maybe add some cache features?  ex: http://pastie.org/1541768
// cache ex: http://pastebin.com/Eq1DLsdP
// modeled after RSSReader demo by @skypanther

exports.fetchWeatherData = function(location) {
	
	var googleCountryArray = require('utils/utils').googleCountryArray;
	var googleCountryString = googleCountryArray.toString();
	
	var languageCode = 'en';
	
	if (googleCountryString.indexOf(Ti.Locale.currentCountry.toLowerCase())) {
				languageCode = Ti.Locale.currentCountry.toLowerCase();
	};
	
	if (googleCountryString.indexOf(Ti.Locale.currentLanguage.toLowerCase())) {
				languageCode = Ti.Locale.currentLanguage.toLowerCase();
	};	

	Ti.API.info('locale: '+languageCode);	
	// test to see if platform locale is supported by Google API codes	

   	var actInd = require('utils/utils').activityIndicator('Loading weather...');

	// Pulls the weather feed data and returns it to caller
	var xhr = Titanium.Network.createHTTPClient();
	// default weather location feed url
	location = (location) ? location : "bydgoszcz,poland";

	xhr.open('GET','http://www.google.com/ig/api?hl='+languageCode+'&oe=utf8&weather='+location);

	xhr.setRequestHeader('User-Agent', 'mobile agent');
	xhr.send();
	
	xhr.onload = function() {
		// Data is returned from weather API, start parsing
		Ti.API.info('Got data!');
		Ti.API.info('header: '+this.getResponseHeader('Content-Type'));
		var xml = this.responseXML;
		var forecastInfo = xml.documentElement.getElementsByTagName("forecast_information");
		var currentConditions = xml.documentElement.getElementsByTagName("current_conditions");

		var data = {};
				
		// test to see if valid weather data returned			
		if(forecastInfo.length>0) {			
		
			data.forecastInfo = {
				city: forecastInfo.item(0).getElementsByTagName("city").item(0).getAttribute("data"),
				forecast_date: forecastInfo.item(0).getElementsByTagName("forecast_date").item(0).getAttribute("data")
			};
			
			data.currentConditions = {
				condition: currentConditions.item(0).getElementsByTagName("condition").item(0).getAttribute("data"),
				temp_f: currentConditions.item(0).getElementsByTagName("temp_f").item(0).getAttribute("data"),
				temp_c: currentConditions.item(0).getElementsByTagName("temp_c").item(0).getAttribute("data"),
				humidity: currentConditions.item(0).getElementsByTagName("humidity").item(0).getAttribute("data"),
				icon: currentConditions.item(0).getElementsByTagName("icon").item(0).getAttribute("data"),
				//wind_condition: currentConditions.item(0).getElementsByTagName("wind_condition").item(0).getAttribute("data"),
			};
			
			//hmmm... sometimes wind informatino is not returned...
			if (currentConditions.item(0).getElementsByTagName("wind_condition").length>0) {
				data.currentConditions.wind_condition = currentConditions.item(0).getElementsByTagName("wind_condition").item(0).getAttribute("data");
			} else {
				data.currentConditions.wind_condition = '';
			}
			var forecastConditions = xml.documentElement.getElementsByTagName("forecast_conditions");
			
			data.forecastConditions = [];
			
			for (var i=0;i<forecastConditions.length;i++) {
					data.forecastConditions.push({
						day_of_week: forecastConditions.item(i).getElementsByTagName("day_of_week").item(0).getAttribute("data"),
						low: forecastConditions.item(i).getElementsByTagName("low").item(0).getAttribute("data"),
						high: forecastConditions.item(i).getElementsByTagName("high").item(0).getAttribute("data"),
						icon: forecastConditions.item(i).getElementsByTagName("icon").item(0).getAttribute("data"),
						condition: forecastConditions.item(i).getElementsByTagName("condition").item(0).getAttribute("data"),
				})	
			}
			actInd.hide();
		}
	else {
			Titanium.API.info('oops, error!');
			actInd.hide();
		};
		// fire an app-level event to notify the UI that the blog data is available
		Ti.App.fireEvent('net:weatherDataReturned',{
			weatherData: data
		});
	}; //end onload

	xhr.onerror = function(e) {
		// should do something more robust
		Titanium.API.info(e.error);
		actInd.hide();
	};
}; // end fetchWeatherData()