var googleCountryArray = ["af","sq","sm","ar","az","eu","be","bn","bh","bs","bg","ca",
	"zh-CN","zh-TW","hr","cs","da","nl","en","en-uk","eo","et","fo","fi","fr","fy","gl",
	"ka","de","el","gu","iw","hi","hu","is","id","ia","ga","it","ja","jw","kn","ko","la",
	"lv","lt","mk","ms","ml","mt","mr","ne","no","nn","oc","fa","pl","pt-BR","pt-PT","pa",
	"ro","ru","gd","sr","si","sk","sl","es","su","sw","sv","tl","ta","te","th","ti","tr",
	"uk","ur","uz","vi","cy","xh","zu"];

var activityIndicator = function(message) {
	var actInd = Ti.UI.createActivityIndicator({
   		bottom:10, 
		height:50,
		width:10,
		message:message,
		style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
   	});
   	actInd.show();
   	return actInd;
 }
 
function createShareOptions(subject,text){
 	Ti.API.info('creating share options: '+subject+' '+text);
    var intent = Ti.Android.createIntent({
        action: Ti.Android.ACTION_SEND,
        type: "text/plain",
    });
    intent.putExtra(Ti.Android.EXTRA_TEXT,text);
    intent.putExtra(Ti.Android.EXTRA_SUBJECT,subject);
 
    var share = Ti.Android.createIntentChooser(intent,'Share');
 
    return share;
}

exports.createShareOptions = createShareOptions; 
exports.activityIndicator = activityIndicator;
exports.googleCountryArray = googleCountryArray;
