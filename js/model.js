(function() { 

	App = window.app || {};

	App.model = function() {	
		this.setModel()
		.refreshModel(this.getMillisecondsForInitialRefresh());	
	};

	App.model.prototype.getHour = function () { 
		return this.time.hours;
	};

	App.model.prototype.getMinute = function () { 
		return this.time.minutes;
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

	App.model.prototype.setModel = function () {  
		var currentDate = new Date();
		this.time = this.time || {};
		this.time.hours = currentDate.getHours();
		this.time.minutes = currentDate.getMinutes();
		this.time.seconds = currentDate.getSeconds();
		this.time.alarm = {}
		console.log(this.time);
		return this;
	};

	App.model.prototype.getMillisecondsForInitialRefresh = function() {    
		return ((59 - this.time.seconds) * 1000);
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
