
/*
 * GET home page.
 */
var data = require('../data.js').getData;

var getSoldOrUnsold = function(sold) {
    var output = [];
    for (var i = 0 ; i < data.length; i++) {
        var obj = data[i];
        var newObj = {};
        for (var prop in obj) {
            if(sold) {
                if(prop !== 'quantity-unsold') {
                    if(prop.search('quantity')!==-1){
                        newObj.quantity = parseInt(obj[prop],10);
                    } else {
                        newObj[prop] = obj[prop];
                    }
                }
            } else {
                if(prop !== 'quantity-sold') {
                    if(prop.search('quantity')!==-1){
                        newObj.quantity = parseInt(obj[prop],10);
                    } else {
                        newObj[prop] = obj[prop];
                    }
                }
            }
        }
        output.push(newObj);
    }
    return output;
};

var getByFields = function(fields) {
	var output = [];
	fields = fields || [];
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
	
	return output;
}

exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};

exports.allUnsold = function(req, res) {
    if(data) {
        res.json(getByFields(["flower", "date", "quantity-unsold"]));
    }
};

exports.allSold = function(req, res){
    //res.render('', { title: 'Express' });
    if(data) {
    	res.json(getByFields(["flower", "date", "quantity-sold"]));
    }
};

exports.getFlower = function(req, res) {
	var name = req.param('name');
	var soldOrUnsold = req.param('sold') || "sold";
	var sold = soldOrUnsold === "sold" ? true : false;
	
	

	res.json(getByFields(["flower", "quantity-sold"]));
}