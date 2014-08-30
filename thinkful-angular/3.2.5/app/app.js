angular.module('calendarDemoApp', [])

// your controller and directive code go here

.directive('calendar', function() {
  return {
	  restrict: 'E',
	  templateUrl: 'calendar.html',
	  scope: true,
	  link: function(scope, element, attrs){
	  	var currentDate = new Date();
	  	scope.today = currentDate;

	  	var setYears = function(year){
	  		years = [];
	  		for(var i = year - 20; i<year; i++){
	  			years.push(i);
	  		}
	  		for(var i = year; i<=year+20; i++){
	  			years.push(i);
	  		}

	  		return years;
	  	}

			scope.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	  	var convertMonthNumberToName = function(num){
	  		return(scope.monthNames[num]);
	  	}
	  	var convertMonthNameToNumber = function(name){
	  		for(var i = 0; i < scope.monthNames.length; i++){
	  			if(scope.monthNames[i] == name) return i;
	  		}
	  	}

	  	scope.month = convertMonthNumberToName(currentDate.getMonth());
			scope.year = currentDate.getFullYear();
	  	scope.years = setYears(currentDate.getFullYear());

	  	var setScopeVars = function(date){
				var monthlyRange = CalendarRange.getMonthlyRange(date);
		  	scope.days = monthlyRange.days;
		  	scope.firstDay = monthlyRange.start;
		  	scope.lastDay = monthlyRange.end;
		  	scope.dayCount = monthlyRange.days.length;
	  	}

	  	setScopeVars(currentDate);

	  	scope.updateCalendarBySelection = function(){
	  		var newDate = new Date();
	  		newDate.setDate(1);
	  		newDate.setFullYear(scope.year, convertMonthNameToNumber(scope.month));
	  		setScopeVars(newDate);
	  	}

	  	scope.updateCalendarByArrow = function(diff){
	  		// LATER: implement edge cases when we are going too far ahead or backward in the future...

	  		var newDate = new Date();
	  		var monthNum = convertMonthNameToNumber(scope.month);
	  		if(diff == 1){
	  			if(monthNum == 11) scope.year++;
	  		}
	  		else {
	  			if(monthNum == 0) scope.year--;
	  		}
	  		monthNum = (monthNum+diff) % 12;
	  		if(monthNum < 0) monthNum = 11;
	  		scope.month = convertMonthNumberToName(monthNum);

	  		scope.updateCalendarBySelection();
	  	}

	  	

	  }

  }
})