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
  
$(".time-block").on("click", ".save-btn", function() {
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
