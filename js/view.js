(function () { 

	"use strict";			
  var App = window.app || {};
 
  App.View = function () { 	  
	this.el = {}; // general container for DOM elements 
	this.el.hour = document.getElementById('hour');
	this.el.minute = document.getElementById('minute');
	this.el.clock = document.getElementById('clock');
	this.el.hourDropdown = document.getElementById('hourDropdown');
	this.el.minuteDropdown = document.getElementById('minuteDropdown');


	this.buildDropdownList(this.el.hourDropdown, 24).
	buildDropdownList(this.el.minuteDropdown, 60);
	
	this.model = new App.model();
 	this.setCurrentTime().
	updateView().
	observeChangesToModel();
 };

  
  App.View.prototype.buildDropdownList = function (select, limit) {  	 
	  var timeString = '';
	  for ( var i = 0; i < limit ; i++ ) { 	  
		  var timeString = (i < 10) ? ('0' + i) : i.toString();
		  select.options[select.options.length] = new Option(timeString, i);
	  }
	  select.addEventListener("change", this.setAlarmTime.bind(this));
    return this;
   };

   App.View.prototype.setAlarmTime = function() { 
  
		if (this.el.hourDropdown.value !== 'off') {	 		 
			this.model.setAlarmHour(this.el.hourDropdown.value);
      this.model.setAlarmMinute(this.el.minuteDropdown.value);	
	  }		
		return this;		
	}; 
 

  App.View.prototype.updateView = function () { 
	  this.el.hour.textContent =  (this.currentHour < 10) ?  '0' + this.currentHour : this.currentHour;
	  this.el.minute.textContent = (this.currentMinute < 10) ? '0' + this.currentMinute : this.currentMinute;
	  return this;
  }; 
  
  App.View.prototype.setCurrentTime = function() {

	  this.currentHour = this.model.getHour();
	  this.currentMinute = this.model.getMinute();
		if (this.model.isAlarmSet() &&  this.model.isItTime()) {
			this.itIsTime();
		}
	  else if (this.model.isPastAlarmTime()){ 
	    this.resetAlarm();	
		}	
	 	
	  return this;
  };
  
  App.View.prototype.itIsTime = function () {
     this.el.clock.className = 'alarm clock';	
	};

  App.View.prototype.resetAlarm = function () { 
		this.el.alarm.className = 'alarm';
	};	

	App.View.prototype.observeChangesToModel = function () {  
	  var _this = this;
	  setInterval(function () {  	  
		  if (_this.model.getMinute() !== _this.currentMinute || _this.model.getHour() !== _this.currentHour) { 
			  _this.setCurrentTime().
			  updateView();
		  }  
	  }, 1000); // observe every second
   };
  
   window.app = App; 
   var app = new App.View(); 

})();
