
var MIN = 1;
var MAX = 4;

var _state = '-'; // velocità 1,2,3
var _switch = 'off'; //ON / OFF
var _measuredVal = undefined;

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
	var command = req.query.command;

	if(command == "ON"){
		ON(req,res);
	}else if(command == "OFF"){
		OFF(req,res);
	}else if(command == "SET"){
		set(req,res);
	}else if(command == "READ"){
		read(req,res);
	}
};

var read = function(req,res){
	res.send(produceResponse());
	console.log('/MyHeater. Command READ');
}

//Setto il valore richiesto. Se il dispositivo è spento lo accendo
var set = function(req, res){

	var request = req.query.value; //('value');
	console.log('/MyHeater. Command SET: ' + request);
	
	if(!request){
		var val = switchON();
		res.send(val);
		return;
	}
	
	if(request.toLowerCase() == "max"){
		_state = MAX;
		_switch = 'on';
		res.send(produceResponse());
		return;
	} 
	if(request.toLowerCase() == "min"){
		_state = MIN;
		_switch = 'on';
		res.send(produceResponse());
		return;
	} 
	
	var value = parseInt(request);
	
	if(!value){
		var val = switchON();
		res.send(val);
		return;
	}
	
	if(value >= MIN && value<= MAX){
		_state = value;
		_switch = 'on';
		res.send(produceResponse());
	}else if(value < MIN){
		_state = MIN;
		_switch = 'on';
		res.send(produceResponse());
	}else if(value > MAX){
		_state = MAX;
		_switch = 'on';
		res.send(produceResponse());
	}
};

//PUT: Metto lo Switch ad ON -> settando il valore di default
var ON = function(req, res){
	
	var val = switchON();
	res.send(val);
	
	console.log('/MyHeater. Command ON');
};

var switchON = function(){
	_switch = 'on';
	_state = MIN;
	return produceResponse();
}

//DELETE: Metto lo Switch ad OFF
var OFF = function(req,res){
	
	_switch = 'off';
	_state = '-';
	res.send(produceResponse());
	
	console.log('/MyHeater. Command OFF');
};