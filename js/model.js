(function() { 

	"use strict";			
	var App = window.app || {};

	App.model = function() {	
		this.setModel()
		.refreshModel(this.getMillisecondsForInitialRefresh());	
	};

	App.model.prototype.getHour = function () { 
		return this.time.hour;
	};

	App.model.prototype.getMinute = function () { 
		return this.time.minute;
	};

	App.model.prototype.setAlarmHour = function (hour) {  
		return this.time.alarm.hour = parseInt(hour);
	};

	App.model.prototype.setAlarmMinute = function (minute) {
		return this.time.alarm.minute = parseInt(minute);
	};

	App.model.prototype.getAlarmHour = function () { 
		return this.time.alarm.hour;
	};

	App.model.prototype.getAlarmMinute = function () { 
		return this.time.alarm.minute;
	};
 
	App.model.prototype.isAlarmSet = function () { 
 		return this.time.alarm !== undefined && this.time.alarm.hour !== undefined && this.time.alarm.minute !== undefined;
	};

	App.model.prototype.isItTime = function() { 
		return this.time.alarm.hour === this.time.hour && this.time.alarm.minute == this.time.minute; 		
	};

	App.model.prototype.isPastAlarmTime = function() { 
		return this.time.hour >= this.time.alarm.hour && (this.time.minute > this.time.alarm.minute); // resets the alarm after 1 minutes, I suppose 
	};

	App.model.prototype.setModel = function () {  
		var currentDate = new Date();
		this.time = this.time || {};
		this.time.hour = currentDate.getHours();
		this.time.minute = currentDate.getMinutes();
		this.time.second = currentDate.getSeconds();
		this.time.alarm = this.time.alarm || {};
		console.log(this.time);
		return this;
	};

	App.model.prototype.getMillisecondsForInitialRefresh = function() {    
		return ((59 - this.time.second) * 1000);
	};

	App.model.prototype.refreshModel = function (refresh) { 
		var _this = this;
		setTimeout(function() {
				_this.setModel();	
				setInterval(function() {
				  _this.setModel();			
		 		}, 60000); // updates the model after every minute,  on the new minutes' 0th second
		}, refresh);// updates the model after the current minute is over
	};


	window.app = App;


})();
