(function () { 

  App = window.app || {};
 
  App.View = function () { 	  
	this.el = {}; // general container for DOM elements 
	this.el.hour = document.getElementById('hour');
	this.el.minute = document.getElementById('minute');
	this.el.hourDropdown = document.getElementById('hourDropdown');
	this.el.minuteDropdown = document.getElementById('minuteDropdown');

	this.buildDropdownElements();
	this.model = new App.model();

 	this.setCurrentTime().
	updateView().
	observeChangesToModel();
 };

  App.View.prototype.buildDropdownElements = function () { 
  	var hoursUl = this.getDropdownList(24);
	var minutesUl = this.getDropdownList(60);	
	this.el.hourDropdown.appendChild(hoursUl);
	this.el.minuteDropdown.appendChild(minutesUl);
	
  };
  
  App.View.prototype.getDropdownList = function (limit) {  	
	  var ul = document.createElement('ul');
	  ul.setAttribute('class', 'dropdown-menu')
	  ul.setAttribute('aria-labelledby', 'dropdownMenu1'); 
	  
	  var createLinkTag = function (value) {  
		  return '<a href="#">' + value + '</a>';
	  };
	   var timeString = '', listElements = '';
	  for ( var i = 0; i < limit ; i++ ) { 
		  timeString = (i < 10) ? ('0' + i) : i.toString();
		  listElements += '<li>' + createLinkTag(timeString) + '</li>';
	  }
	  ul.innerHTML = listElements; 
	  return ul;
  }; 
  App.View.prototype.updateView = function () { 
	  this.el.hour.textContent =  (this.currentHour < 10) ?  '0' + this.currentHour : this.currentHour;
	  this.el.minute.textContent = (this.currentMinute < 10) ? '0' + this.currentMinute : this.currentMinute;
	  return this;
  }; 
  
  App.View.prototype.setCurrentTime = function() {

	  this.currentHour = this.model.getHour();
	  this.currentMinute = this.model.getMinute();
	  return this;
  }  

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
