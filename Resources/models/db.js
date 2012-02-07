/**
 * @author Bob Sims
 */

var DATABASE_NAME = 'bydgoszcz';

exports.createDb = function() {
	var db = Ti.Database.install('bydgoszcz.sqlite', DATABASE_NAME);
	db.close();
};

exports.selectCategories = function() {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select * from categories');
	while (rows.isValidRow()) {
		retData.push({id:rows.fieldByName('ID'), name:rows.fieldByName('Name'), icon:rows.fieldByName('Icon')});
		rows.next();
	}
	db.close();
	//Ti.API.info('row count: '+retData.length);
	return retData;
};

exports.selectItems = function(categoryID) {
	var retData = [];
	var db = Ti.Database.open(DATABASE_NAME);
	var rows = db.execute('select * from items where CatID = ?', categoryID);
	while (rows.isValidRow()) {
		retData.push({id:rows.fieldByName('ID'), name:rows.fieldByName('Name'),
			description:rows.fieldByName('Description'), icon:rows.fieldByName('Icon'),
			longitude:rows.fieldByName('Long'), latitude:rows.fieldByName('Lat')
			});
		rows.next();
	}
	db.close();
	return retData;
};