var events = require('events');

emitter = new events.EventEmitter();

var request = require('request');

var previous = intervalFunction();

var intervalFunction = function(){
  request({url:"http://dev.markitondemand.com/Api/v2/Lookup",
            qs:{
              input:"AAPL"
            }}, function (error, response, body) {
              //will use async json parsing modules later on.
                  if (!error && response.statusCode == 200) {
                    var stockObject = JSON.parse(body);
                    if(stockObject != previous){
                      previous = stockObject;
                      emitter.emit('update',stockObject);
                    }
                  }
  });
}

module.exports.interval = function(time){
  setInterval(intervalFunction,time)
}

module.exports = emitter;
