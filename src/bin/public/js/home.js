// Add JS here

/*
var homeToggle = true;

$('#sub-div').hide();

$('.menu').on('click', function() {
  console.log('menu toggled');
  var div = $('#main-div')
  var subDiv = $('#sub-div');
  if(homeToggle){
    div.animate({opacity: '0'}, 'slow', function() {
      div.hide();
      subDiv.animate({opacity: '100'}, 'slow', function() {
        subDiv.show();
      });
    });


  }else{
    subDiv.animate({opacity: '0'}, 'slow', function() {
      subDiv.hide();
      div.animate({opacity: '100'}, 'slow');
      div.show();
    })
  }
  homeToggle = !homeToggle;
})

*/

// Countdown

var countDownDate = new Date("Mar 16, 2019 00:00:01").getTime();

var countDown = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000*60*60*24));
  var hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
  var minutes = Math.floor((distance % (1000*60*60))/(1000*60));
  var seconds = Math.floor((distance % (1000*60))/1000);

  $('#countdown1').html(days + "d " + hours + "h " + minutes + "m " + seconds + "s");
  $('#countdown2').html(days + "d " + hours + "h " + minutes + "m " + seconds + "s");

  if(distance < 0){
    clearInterval(countDown);
    $('#countdown1').html('wait is over');
    $('#countdown2').html('wait is over');
  }
  console.log(now);
}, 1000);

