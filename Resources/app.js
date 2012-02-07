//var rr = {}; // create our namespace rr = Rss Reader

// require the module files
//rr.ui = require('ui');
// require in the network library and fetch the RSS feed
//require('network').fetchRSSData('http://www.rit.edu/news/lib/rss/inthenews.rss');
//require('network').fetchRSSData('http://www.act.nato.int/multimedia/rss-feeds/xml/RSS2.0/category/42-news-stories');
//require('network').fetchRSSData('https://events.jftc.nato.int/rss.xml');
//require('youtubejson').fetchYouTubeData('http://gdata.youtube.com/feeds/api/users/NATOACT/uploads?alt=json&v=2&max-results=10');
//require('networkjson').fetchJSONData('https://spreadsheets.google.com/feeds/list/0AvlAL-QRJACkdC0yMENTMUh5NXdQXzUyVEFROXJiV1E/od6/public/basic?hl=en_US&alt=json');
//var joliObject = require('joli');



// open the app's UI
//rr.tabGroup = rr.ui.createAppTabs();
//rr.tabGroup.open();



/**
 * PHP-like print_r() & var_dump() equivalent for JavaScript Object
 *
 * @author Faisalman <movedpixel@gmail.com>
 * @license http://www.opensource.org/licenses/mit-license.php
 * @link http://gist.github.com/879208
 */
var print_r = function(obj,t){

    // define tab spacing
    var tab = t || '';
	
    // check if it's array
    var isArr = Object.prototype.toString.call(obj) === '[object Array]' ? true : false;
	
    // use {} for object, [] for array
    var str = isArr ? ('Array\n' + tab + '[\n') : ('Object\n' + tab + '{\n');

    // walk through it's properties
    for(var prop in obj){
        if (obj.hasOwnProperty(prop)) {
            var val1 = obj[prop];
            var val2 = '';
            var type = Object.prototype.toString.call(val1);
            switch(type){
			
                // recursive if object/array
                case '[object Array]':
                case '[object Object]':
                    val2 = print_r(val1, (tab + '\t'));
                    break;
					
                case '[object String]':
                    val2 = '\'' + val1 + '\'';
                    break;
					
                default:
                    val2 = val1;
            }
            str += tab + '\t' + prop + ' => ' + val2 + ',\n';
        }
    }
	
    // remove extra comma for last property
    str = str.substring(0, str.length-2) + '\n' + tab;
	
    return isArr ? (str + ']') : (str + '}');
};
var var_dump = print_r; // equivalent function

// ***********************************

//Ti.API.info(print_r(require('theme/theme').styles));

//add a single variable to the global scope to which we may choose to
//intentionally add items to
var globals = {};

//create a private scope to prevent further polluting the global object
(function() {
	// Initialize local storage
	require('models/db').createDb();
	Ti.API.info('creating tabs...');

	var AppTabGroup = require('ui/AppTabGroup').AppTabGroup,
		ListWindow = require('ui/ListWindow').ListWindow,
		WeatherWindow = require('ui/WeatherWindow').WeatherWindow,
		ContactWindow = require('ui/ContactWindow').ContactWindow,
		FeedWindow = require('ui/FeedWindow').FeedWindow,
		//AboutWindow = require('ui/AboutWindow').AboutWindow;
		//create an About menu item available for each window menu
		aboutMenuItem = function(menu) {
			var aboutItem = menu.add({title: 'About'});
	    	aboutItem.setIcon('theme/images/info.png');
	    	aboutItem.addEventListener("click", function(e) {
	       		Ti.API.info("clicked About");
	       		require('ui/AppTabGroup').aboutWindow();
	        });
		};
		
		//AddWindow = require('ui/AddWindow').AddWindow;

	//create our global tab group	
	globals.tabs = new AppTabGroup(
		{
			title: 'Events',
			//icon: 'icons/light_shield.png',
			icon: 'theme/images/users.png',
			window: new FeedWindow({
				title: 'JFTC Events',
				//id: 'feedWindow',
				backgroundColor: '#fff',
				modal: true,
				activity: {
					onCreateOptionsMenu: function(e) {
						var menu = e.menu;
					    var menuItem = menu.add({ title: "Refresh" });
					    menuItem.setIcon('theme/images/refresh.png');
					    menuItem.addEventListener("click", function(e) {
					        Ti.API.info('menu item clicked!');
				        	require('models/rssData').fetchRSSData('https://events.jftc.nato.int/rss.xml');
				        });
				        aboutMenuItem(menu);
					}
				},				
				//isDone: 1
			}),
		},
		{
			title: 'Locations',
			//icon: 'icons/light_pin.png',
			icon: 'theme/images/pin.png',
			window: new ListWindow({
				title: 'Locations',
				backgroundColor: '#fff',
				navBarHidden: false,
		//		isDone: 0,
				activity: {
					onCreateOptionsMenu: function(e) {
						var menu = e.menu;
						aboutMenuItem(menu);
					}
				},
			})
		},
		{
			title: 'Weather',
			//icon: 'icons/light_burst.png',
			icon: 'theme/images/protection.png',
			window: new WeatherWindow({
				title: 'Weather',
				backgroundColor: '#fff',
				modal: true,
				activity: {
					onCreateOptionsMenu: function(e) {
						var menu = e.menu;
					    var menuItem = menu.add({ title: "Refresh" });
					    menuItem.setIcon('theme/images/refresh.png');
					    menuItem.addEventListener("click", function(e) {
					        Ti.API.info('menu item clicked!');
							require('models/googleWeather').fetchWeatherData('bydgoszcz,poland');
					    });
					    aboutMenuItem(menu);
					}
				},					
				//isDone: 1
			}),
		},
		{
			title: 'Contact',
			//icon: 'icons/light_phone.png',
			icon: 'theme/images/email.png',
			window: new ContactWindow({
				title:'Contact',
				backgroundColor: '#fff',
				modal: true,
				activity: {
					onCreateOptionsMenu: function(e) {
						var menu = e.menu;
						aboutMenuItem(menu);
	
					}
				},
				})
		});
           
	globals.tabs.open();

})(); 