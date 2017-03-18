var _ = require('lodash');
// var newData = require('./new_price_data');

var request = require('request');

var fs = require('fs');

request('http://arta-lugansk.i-desk.xyz/php/commodities/getAll.php', function (error, response, body1) {
  if (!error && response.statusCode == 200) {
    var current = JSON.parse(body1);

	request('http://arta-lugansk.i-desk.xyz/php/commodities/getAllNew.php', function (error, response, body2) {
	  if (!error && response.statusCode == 200) {
	  	compare(current, JSON.parse(body2));
	  }

	})
  }
})

function compare( oldDB, newDB ) {
	console.log('Records in old : ' + oldDB.length);
	console.log('Records in new : ' + newDB.length);

	var newCommodities = [];
	var sameCommodities = [];
	var changedCommodities = [];

	var sqlUpdate = '';
	var sqlMarkAsOld = 'UPDATE commodities SET is_old=1 WHERE id IN (';
	var sqlAdd = 'INSERT INTO commodities (name, photo, price1, price2, price3, is_old) VALUES ';

	newDB.forEach( function(newCom) {
		var elem = _.find( oldDB, {name: newCom.name} );
		if (! elem) {
			newCommodities.push(newCom);
			//// If columns with prices organized as "> 10", ">50", "<10"
			sqlAdd += '("'+ newCom.name +'", "", '+ newCom.price2 + ', '+ newCom.price1 + ', '+ newCom.price3 + ', 0),\n';
			//// If columns with prices organized as "> 50", ">10", "<10"
			// sqlAdd += '("'+ newCom.name +'", "", '+ newCom.price1 + ', '+ newCom.price2 + ', '+ newCom.price3 + ', 0),\n';
			// console.log('new!');
		} else {
			//// If columns with prices organized as "> 10", ">50", "<10"
			if ( Number(elem.price1) == Number(newCom.price2) && Number(elem.price2) == Number(newCom.price1) && Number(elem.price3) == Number(newCom.price3)) {
			//// If columns with prices organized as "> 50", ">10", "<10"
			// if ( Number(elem.price1) == Number(newCom.price1) && Number(elem.price2) == Number(newCom.price2) && Number(elem.price3) == Number(newCom.price3)) {
				sameCommodities.push(newCom);
			} else {
				//// If columns with prices organized as "> 10", ">50", "<10"
				sqlUpdate += 'UPDATE commodities SET price1='+ newCom.price2 +', price2='+ newCom.price1 + ', price3='+ newCom.price3 +' WHERE id='+elem.id+';\n';
				//// If columns with prices organized as "> 50", ">10", "<10"
				// sqlUpdate += 'UPDATE commodities SET price1='+ newCom.price1 +', price2='+ newCom.price2 + ', price3='+ newCom.price3 +' WHERE id='+elem.id+';\n';
				changedCommodities.push(newCom);
			}

			oldDB.map( function(o) {
				if (o.id == elem.id) {
					o.found = true;
				}

				return o;
			})
		}
	})

	// console.log('New commodities: ' + newCommodities.length);
	// console.log('Same commodities: ' + sameCommodities.length);
	// console.log('Changed commodities: ' + changedCommodities.length);

	var removed = 0;
	oldDB.forEach( function(o) {
		if (! o.found) {
			removed++;
			sqlMarkAsOld += o.id +  ',\n';
			// sqlMarkAsOld += o.id + ' ' + o.name +  ',\n';
			//console.log(o)
		}
	})

	sqlAdd = sqlAdd.substr(0, sqlAdd.length - 1);
	sqlMarkAsOld = sqlMarkAsOld.substr(0, sqlMarkAsOld.length - 1) + ')';

	// console.log(sqlAdd);
	// console.log(sqlUpdate);
	// console.log(sqlMarkAsOld);

	fs.writeFile('src/js/addons/result/delete.sql', sqlMarkAsOld, 'utf8', (err) => {
		if (err) throw err;
		console.log('Old records query saved!');
	});	

	fs.writeFile('src/js/addons/result/update.sql', sqlUpdate, 'utf8', (err) => {
		if (err) throw err;
		console.log('Records with changed price query saved!');
	});	

	fs.writeFile('src/js/addons/result/new.sql', sqlAdd, 'utf8', (err) => {
		if (err) throw err;
		console.log('New records query saved!');
	});	

}