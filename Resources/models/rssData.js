// Based off original demo by Tim Poulsen
// https://github.com/skypanther/TitaniumIntro
// 
// sample require to fetch the RSS feed, returned as title + data array in app-level event:
// require('network').fetchRSSData('http://www.act.nato.int/multimedia/rss-feeds/xml/RSS2.0/category/42-news-stories');

exports.fetchRSSData = function(url) {
	// Pulls the RSS feed data and returns it to caller
/*	var ActivityIndicator = Ti.UI.createActivityIndicator({
   		bottom:10, 
		height:50,
		width:10,
		message:'Loading...',
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
   	});
   	ActivityIndicator.show(); */
   	var actInd = require('utils/utils').activityIndicator('Loading events...');
   	
	var xhr = Titanium.Network.createHTTPClient();
	// default blog rss feed url
	url = (url) ? url : "http://www.act.nato.int/multimedia/rss-feeds/xml/RSS2.0/category/42-news-stories";
	xhr.open('GET',url);
        // add bogus User-Agent for websites that require it, thanks @aaronksaunders
	xhr.setRequestHeader('User-Agent', 'mobile agent')
	xhr.send();
	
	xhr.onload = function() {
		// Data is returned from the blog, start parsing
		Ti.API.info('Got RSS data!');

		var xml = this.responseXML;
		var channel = xml.documentElement.getElementsByTagName("channel");

		// begin looping through blog posts
		var data = [];
		var items = xml.documentElement.getElementsByTagName("item");
		for (var i=0;i<items.length;i++) {
			data.push({
				postTitle: items.item(i).getElementsByTagName("title").item(0).text,
				postLink: items.item(i).getElementsByTagName("link").item(0).text,
				postDescription: items.item(i).getElementsByTagName("description").item(0).text,
			});
		}
		// fire an app-level event to notify the UI that the blog data is available
		Ti.App.fireEvent('net:rssDataReturned',{
			blogTitle: channel.item(0).getElementsByTagName("title").item(0).text,
			blogPosts: data
		});
		actInd.hide();
	};
	xhr.onerror = function(e) {
		// should do something more robust
		Titanium.API.info(e.error);
		actInd.hide();
	};
}; // end getRSSData()