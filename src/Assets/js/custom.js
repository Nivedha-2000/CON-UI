$(function() {
	
	
	//$('.date').datepicker();
	//muti
	window.asd = $('.SlectBox').SumoSelect({ csvDispCount: 3, selectAll:true, captionFormatAllSelected: "Yeah, OK, so everything." });
 
	$('#testDiv4').slimScroll({
		alwaysVisible: false
	});
});

window.onload = ()=>{
	// $(selector).countMe(delay,speed)
	$("#num1").countMe(40,10);
	$("#num2").countMe(30, 30);
	$("#num3").countMe(40, 10);
	$("#num4").countMe(100,25);
 }

$( document ).ready(function() {
	 
$('.circlechart').circlechart(); // Initialization
$(".mo-1").click(function () {

	$(".trr-1").toggleClass('acv');

});
$(".mo-2").click(function () {

	$(".trr-2").toggleClass('acv');

});
$(".mo-3").click(function () {

	$(".trr-3").toggleClass('acv');

});
$(".mo-4").click(function () {

	$(".trr-4").toggleClass('acv');

});
$(".mo-5").click(function () {

	$(".trr-5").toggleClass('acv');

});
$(".mo-6").click(function () {

	$(".trr-6").toggleClass('acv');

});
 
$('.navbar-light .navbar-nav .nav-link').click(function () {
    $('.navbar-light .navbar-nav .nav-link.active').removeClass('active');
    $(this).toggleClass('active');
});

$('.s-but').on('click', function(e) {
	$('body').addClass('sm-size');
	e.stopPropagation();
  });
  $('.n-but').on('click', function(e) {
	$('body').removeClass('sm-size');
	e.stopPropagation();
  });
});



$(function() {
	'use strict'
	
	// ______________LOADER
	$("#global-loader").fadeOut("slow");
	
	
	// This template is mobile first so active menu in navbar
	// has submenu displayed by default but not in desktop
	// so the code below will hide the active menu if it's in desktop
	if (window.matchMedia('(min-width: 992px)').matches) {
		$('.main-navbar .active').removeClass('show');
		$('.main-header-menu .active').removeClass('show');
	}
	// Shows header dropdown while hiding others
	$('.main-header .dropdown > a, .dropdown > a').on('click', function(e) {
		e.preventDefault();
		$(this).parent().toggleClass('show');
		$(this).parent().siblings().removeClass('show');
		$(this).find('.drop-flag').removeClass('show');
	});
 
	
	 
	 
	// Close dropdown menu of header menu
	$(document).on('click touchstart', function(e) {
		e.stopPropagation();
		// closing of dropdown menu in header when clicking outside of it
		var dropTarg = $(e.target).closest('.dropdown').length;
		if (!dropTarg) {
			$('.dropdown').removeClass('show');
		}
		// closing nav sub menu of header when clicking outside of it
		if (window.matchMedia('(min-width: 992px)').matches) {
			// Navbar
			var navTarg = $(e.target).closest('.main-navbar .nav-item').length;
			if (!navTarg) {
				$('.main-navbar .show').removeClass('show');
			}
			// Header Menu
			var menuTarg = $(e.target).closest('.main-header-menu .nav-item').length;
			if (!menuTarg) {
				$('.main-header-menu .show').removeClass('show');
			}
			if ($(e.target).hasClass('main-menu-sub-mega')) {
				$('.main-header-menu .show').removeClass('show');
			}
		} else {
			//
			if (!$(e.target).closest('#mainMenuShow').length) {
				var hm = $(e.target).closest('.main-header-menu').length;
				if (!hm) {
					$('body').removeClass('main-header-menu-show');
				}
			}
		}
	});
	 
    
	
	  
	
});

(function () {
	"use strict";

	var slideMenu = $('.side-menu');

	// Toggle Sidebar
	$(document).on('click','[data-bs-toggle="sidebar"]',function(event) {
		event.preventDefault();
		$('.app').toggleClass('sidenav-toggled');
	});

	$(".app-sidebar").hover(function() {
		if ($('body').hasClass('sidenav-toggled')) {
			$('body').addClass('sidenav-toggled-open');
		}
	}, function() {
		if ($('body').hasClass('sidenav-toggled')) {
			$('body').removeClass('sidenav-toggled-open');
		}
	});


	// Activate sidebar slide toggle
	$("[data-bs-toggle='slide']").on('click', function(e) {
		var $this = $(this);
		var checkElement = $this.next();
		var animationSpeed = 300,
		slideMenuSelector = '.slide-menu';
		if (checkElement.is(slideMenuSelector) && checkElement.is(':visible')) {
		  checkElement.slideUp(animationSpeed, function() {
			checkElement.removeClass('open');
		  });
		  checkElement.parent("li").removeClass("is-expanded");
		}
		 else if ((checkElement.is(slideMenuSelector)) && (!checkElement.is(':visible'))) {
		  var parent = $this.parents('ul').first();
		  var ul = parent.find('ul:visible').slideUp(animationSpeed);
		  ul.removeClass('open');
		  var parent_li = $this.parent("li");
		  checkElement.slideDown(animationSpeed, function() {
			checkElement.addClass('open');
			parent.find('li.is-expanded').removeClass('is-expanded');
			parent_li.addClass('is-expanded');
		  });
		}
		if (checkElement.is(slideMenuSelector)) {
		  e.preventDefault();
		}
	});
	
	
	 

})();
	



function makesvg(percentage, inner_text=""){

	var abs_percentage = Math.abs(percentage).toString();
	var percentage_str = percentage.toString();
	var classes = ""
  
	if(percentage < 0){
	  classes = "danger-stroke circle-chart__circle--negative";
	} else if(percentage > 0 && percentage <= 30){
	  classes = "warning-stroke";
	} else{
	  classes = "success-stroke";
	}
  
   var svg = '<svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">'
	   + '<circle class="circle-chart__background" cx="16.9" cy="16.9" r="15.9" />'
	   + '<circle class="circle-chart__circle '+classes+'"'
	   + 'stroke-dasharray="'+ abs_percentage+',100"    cx="16.9" cy="16.9" r="15.9" />'
	   + '<span class="circle-chart__info">'
	   + '   <span class="circle-chart__percent" x="17.9" y="15.5">'+percentage_str+'%</span>';
  
	if(inner_text){
	  svg += '<span class="circle-chart__subline" x="16.91549431" y="22">'+inner_text+'</span>'
	}
	
	svg += ' </svg></svg>';
	
	return svg
  }
  
  (function( $ ) {
  
	  $.fn.circlechart = function() {
		  this.each(function() {
			  var percentage = $(this).data("percentage");
			  var inner_text = $(this).text();
			  $(this).html(makesvg(percentage, inner_text));
		  });
		  return this;
	  };
  
  }( jQuery ));


  /*
    countMe a jQuery plugin for count number
   
*/
jQuery.fn.countMe=function(t,e){if(void 0!==t||void 0!==e){var n=0,r=this.html();return setTimeout(()=>{var t=setInterval(()=>{n++,this.text(n),n==r&&clearInterval(t)},e)},t),this}alert("Worning!\ndelay and speed can't be empty!")};
