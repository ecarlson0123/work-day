var timeSlots = {

}

var saveEvents= function(timeSlot){
   
}

$(".time-block").on("click", "p", function() {
    var text = $(this)
      .text()
      .trim();
    var textInput = $("<textarea>")
      .addClass("form-control col-10")
      .val(text);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});
  
$(".time-block").on("click", ".saveBtn", function() {
    var text = $(this).siblings("textarea")
      .val()
      .trim();
    var time = $(this)
      .closest(".time-block")
      .attr("id")
    timeSlots[time]= text;
   /*  saveTasks(); */
  
  var eventComment = $("<p>")
    .addClass("col-10 align-middle")
    .attr('id',"event-comment")
    .text(text);
  
  
  $(this).siblings("textarea").replaceWith(eventComment);
  checkEvents();
});


var loadTimeSlots = function() {
    timeSlots = JSON.parse(localStorage.getItem("timeSlots"));

    if(!timeSlots){
        for(i=8; i<18; i++){
            timeSlots["time"+i]=""
        }
    };

    $.each(timeSlots, function(list) {
        console.log(list);
          createEvent(timeslot.time,timeslot.text);
        });
};

var setDate = function(){
  var date = moment().format("dddd, MMMM Do YYYY, h:mm a")
  return date;
}

var checkEvents = function(){
  var hour = Number(moment().format("H"));
  $('.time-block').each(function(){
    var blockNum= Number($(this).attr('id').replace("time",""));
    if(hour>blockNum){
      $(this).children("#event-comment").addClass("past")
    }
    else if(hour===blockNum){
      $(this).children("#event-comment").addClass("present")
    }
    else if(hour<blockNum){
      $(this).children("#event-comment").addClass("future")
    };
    
  })
}

checkEvents();
setInterval(function(){
  var date = setDate();
  checkEvents();
  $("#currentDay").text(date);
}, 60000)
