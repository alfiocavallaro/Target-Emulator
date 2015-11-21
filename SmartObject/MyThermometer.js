var _state = undefined; 
var _switch = undefined; //ON / OFF
var _measuredVal = '24';

function Response() {
	this.switch = "";
	this.measuredVal = "";
	this.settedVal = "";
}

var produceResponse = function(){
	var response = new Response();
	response.switch = _switch;
	response.measuredVal = _measuredVal;
	response.settedVal = _state;
	return JSON.stringify(response);
}

//GET: Restitusce lo stato del dispositivo.
exports.get = function(req,res){
	res.send(produceResponse());
	console.log('/MyThermometer. Command GET');
};


