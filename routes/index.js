
/*
 * GET home page.
 */
var data = require('../data.js').getData;

var getByFields = function(fields) {
	var output = [];
	fields = fields || [];
	if (data) {
		for (var i = 0; i < data.length; i++) {
			var obj = {};
			for (var prop in data[i]) {
				if(fields.indexOf(prop) != -1) {
					if(prop.search('quantity') !== -1) {
						obj.quantity = data[i][prop];
					} else {
						obj[prop] = data[i][prop];
					}
				}
			}
			output.push(obj);
		}
	}	
	return output;
}

exports.index = function(req, res){
    res.render('index');
};

exports.allUnsold = function(req, res) {
    res.json(getByFields(["flower", "date", "quantity-unsold"]));
};

exports.allSold = function(req, res){
    res.json(getByFields(["flower", "date", "quantity-sold"]));
};

exports.getFlower = function(req, res) {
	var name = req.param('name');
	var soldOrUnsold = req.param('sold') || "sold";
	var sold = soldOrUnsold === "sold" ? true : false;
	
	

	res.json(getByFields(["flower", "quantity-sold"]));
}