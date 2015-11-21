var _state = undefined;
var _switch = 'off'; //ON / OFF
var _measuredVal = undefined;

function Response() {
	this.switch = "";
	this.measuredVal = "";
	this.settedVal = "";
}

//GET: Restitusce lo stato del dispositivo.
exports.get = function(req,res){
	var command = req.query.command;

	if(command == "ON"){
		ON(req,res);
	}else if(command == "OFF"){
		OFF(req,res);
	}else if(command == "READ"){
		read(req,res);
	}
};

var read = function(req,res){
	res.send(produceResponse());
	console.log('/MySmartTV2. Command READ');
}

var produceResponse = function(){
	var response = new Response();
	response.switch = _switch;
	response.measuredVal = _measuredVal;
	response.settedVal = _state;
	return JSON.stringify(response);
}

//PUT: Metto lo Switch ad ON -> settando il valore di default
var ON = function(req, res){
	
	var val = switchON();
	res.send(val);
	
	console.log('/MySmartTV2. Command ON');
};

var switchON = function(){
	_switch = 'on';
	return produceResponse();
}

//DELETE: Metto lo Switch ad OFF
var OFF = function(req,res){
	
	_switch = 'off';
	res.send(produceResponse());
	
	console.log('/MySmartTV2. Command OFF');
};