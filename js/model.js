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

	App.model.prototype.setModel = function () {  
		var currentDate = new Date();
		this.time = this.time || {};
		this.time.hours = currentDate.getHours();
		this.time.minutes = currentDate.getMinutes();
		this.time.seconds = currentDate.getSeconds();
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
