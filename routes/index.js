
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

var groupBy = function(data, field) {
    var obj = {};

    return obj;
};

exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};

exports.allUnsold = function(req, res) {
    if(data) {
        res.json(getSoldOrUnsold(false));
    }
};

exports.allSold = function(req, res){
    //res.render('', { title: 'Express' });
    if(data) {
    	res.json(getSoldOrUnsold(true));
    }
};

exports.getFlower = function(req, res) {
	var name = req.param('name');
	var soldOrUnsold = req.param('sold');

	res.json()
}