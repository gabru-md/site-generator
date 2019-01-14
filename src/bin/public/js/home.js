document.addEventListener("DOMContentLoaded", function () {
  var myfullpage = new fullpage("#fullpage", {
    anchors: ["about", "events", "contact_us"],
    onLeave: function (origin, destination, direction) {
      var leavingSection = this;
      document.getElementsByClassName("nav").focus = "none";
      document.getElementById("_" + origin.anchor).style.color = "rgba(255, 255, 255, .5)";
      document.getElementById("_" + origin.anchor).style.borderBottomColor = "transparent";
      document.getElementById("_" + destination.anchor).style.color = "white";
      document.getElementById("_" + destination.anchor).style.borderBottomColor = "white";
      document.getElementsByClassName("nav").focus = "auto";
    },
    scrollOverflow: true,
    scrollBar: true
  });
});

var countDownDate = new Date("Mar 16, 2019 00:00:01").getTime();

var countDown = setInterval(function () {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  $('#countdown1').html(days + "d " + hours + "h " + minutes + "m " + seconds + "s");

  if (distance < 0) {
    clearInterval(countDown);
    $('#countdown1').html('wait is over');
  }
}, 1000);

let x = 0;

var flutter = setInterval(() => {
  if (x === 0) {
    x = 1;
    document.getElementById("logo2").hidden = false;
  }
  else {
    x = 0;
    document.getElementById("logo2").hidden = true;
  }
}, Math.random() * 0.5);