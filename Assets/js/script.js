// Today's date in the format: day of the week, month, day of the month
var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do, YYYY"));
var calendarContainer = document.querySelector(".container");


var workingHours = [9,10,11,12,13,14,15,16,17,18,19];  // Arry for working hours from 9 am to 5 pm 
var currentHour = 10; //parseInt(today.format("H"));
var hourAMPM = "";
var colorRow = "";
var isDisable= "";

// checking data at local storage if there are not, create an empty object array
var calendarActivitiesObject = window.localStorage.getItem("calendarActivities");
var calendarActivities=[];

if(calendarActivitiesObject){
    calendarActivities = JSON.parse(calendarActivitiesObject);
} else{
    for (var j=0; j < workingHours.length ; j++){
        calendarActivities[j]= 
        {
            hourDay: j,
            activity: ""
        };
    }
}

// creating the calendar
for (var i = 0; i < workingHours.length ; i++){
    if ( workingHours[i] < 12 ) {
        hourAMPM = workingHours[i] + "AM ";
    } else {
            if (workingHours[i]===12){
                hourAMPM = workingHours[i] + "PM ";
            } else {
                hourAMPM = (workingHours[i] - 12) + "PM "; 
            }
        }
    if (workingHours[i] === currentHour){
        colorRow = "present";
        isDisable="";
    } else {
        if (workingHours[i] < currentHour){
            colorRow="past";
            isDisable="disabled";
        }else {
            colorRow="future";
            isDisable="";
        }
    }
    $(".container").append(`<div class="input-group-prepend" ><span class="hour" class="input-group-text" >${hourAMPM}</span><textarea ${isDisable} aria-label="With textarea" class="row" class="textareaId"${i} id="${colorRow}" >${calendarActivities[i].activity}</textarea><button  ${isDisable} data-hour="${i}" class="saveBtn" type="button" id="button-addon2">Save</button></div>`);
}

calendarContainer.addEventListener("click", function(event) {
    var element = event.target;
  
    if (element.matches(".saveBtn")) {
      var hourActivity = element.getAttribute("data-hour");
      var activitiesText = document.querySelectorAll(".row");
      if (activitiesText[hourActivity].value.length > 0 ){
        calendarActivities.splice(hourActivity, 1, 
            {
                hourDay: hourActivity,
                activity: activitiesText[hourActivity].value
            } );
        window.localStorage.setItem('calendarActivities', JSON.stringify(calendarActivities));
      }
   
    }
    
  });
  
