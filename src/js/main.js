
(function () {


function init () {

  var navbar = document.getElementById("navbar");

  navbar.addEventListener("hide.bs.collapse", function(){
    document.getElementById("avatar-wrapper").className = "avatar-container";
  }, false);

  navbar.addEventListener("show.bs.collapse", function(){
    document.getElementById("avatar-wrapper").className = "avatar-container_hidden";
  }, false);

}

function scroll_listener() {

  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.getElementById("custom-navbar-wrapper").className = "custom-navbar-wrapper-collapsed";
  }
  else {
    document.getElementById("custom-navbar-wrapper").className = "custom-navbar-wrapper-expanded";
  }

}

window.onscroll = function() {scroll_listener()};

window.onload = function() {
  init();
  scroll_listener();
};


})();

