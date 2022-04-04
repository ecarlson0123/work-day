var timeSlots = {

}

var saveEvents= function(){
   $(".time-block").each(function(){
     var hour = $(this).attr('id')
     var comment = $(this).children("#event-comment").text().trim();
     if($(this).children("#event-comment").text()==""){
       timeSlots[hour]="";
     }
     else{
       timeSlots[hour]=comment;
     }
   })
  localStorage.setItem("timeSlots", JSON.stringify(timeSlots));
}

$(".time-block").on("click", "p", function() {
    var color = $( this ).css( "background-color" );
    var text = $(this)
      .text()
      .trim();
    var textInput = $("<textarea>")
      .addClass("form-control col-10 col-md-9 h-100")
      .val(text)
      .attr('id','textbox')
      .css('background-color', color);
    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});
  
$(".time-block").on("click", ".saveBtn", function() {
  var sibling = $(this).siblings('#event-comment').length;
  if(sibling==0){
    var text = $(this).siblings("textarea")
      .val()
      .trim();
    var time = $(this)
      .closest(".time-block")
      .attr("id")
    timeSlots[time]= text;
  
  var eventComment = $("<p>")
    .addClass("col-10 col-md-9 description h-100")
    .attr('id',"event-comment")
    .text(text);
  
  
  $(this).siblings("textarea").replaceWith(eventComment);
  saveEvents();
  checkEvents();}
});


var loadTimeSlots = function() {
    timeSlots = JSON.parse(localStorage.getItem("timeSlots"));

    if(!timeSlots){
      timeSlots={};
        for(i=8; i<18; i++){
            timeSlots["time" + i]="";
        }
    }
    else{
      var keys = Object.keys(timeSlots)
      keys.forEach(function(element){
        var time=element;
        var comment = timeSlots[time];
        $('#'+time).children("#event-comment").text(comment);
      })
    }
    saveEvents();
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

var loadPage = function(){
  var date= setDate();
  $("#currentDay").text(date);
  loadTimeSlots();
  checkEvents();
}

setInterval(function(){
  var date = setDate();
  checkEvents();
  $("#currentDay").text(date);
}, 60000)

loadPage();
