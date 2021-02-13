
function headerbg(){
  var scroll = $(window).scrollTop();  
   if (scroll >= 50) {
    $("header").addClass("header-bg");
   } 
   else {
     $("header").removeClass("header-bg");
    }
   }

 
$(window).scroll(function() {    
     headerbg();
});/* =========scroll End========= */ 


/* =========Ready Start========= */
$(document).ready(function(){
	  $("#menuShow").on('click', function(e){
		$('#menubox').toggleClass('menu-slide');
	  });
	  $("#menuClose").on('click', function(e){
		$('#menubox').toggleClass('menu-slide');
	  });
	  
	  /* =======Increment Decrement======= */
	  $(".addInCart").click(function(){
		var get_val=parseInt($(this).siblings("input").val());
		get_val=get_val+1;
		$(this).siblings("input").val(get_val)
	   });
   
     $(".removeInCart").click(function(){
		var dec_val=parseInt($(this).siblings("input").val());
		if(dec_val<=0){
		 return false;
		  }
		else{
		dec_val=dec_val-1;
		   $(this).siblings("input").val(dec_val) 
		}
	   });
	   /* =======Increment Decrement======= */
   
});/* =========Ready End========= */ 


    $('.bannerSlider').slick({
	    dots:true,
		slidesToShow:1,
		slidesToScroll:1,
		arrows:false,
		infinite:false,
		autoplay: true,
        autoplaySpeed:3000,
	  });

  $('.rewardsSlider').slick({
    slidesToShow:4,
    slidesToScroll: 1,
    autoplay:false,
    /* autoplaySpeed: 1000, */
    infinite:false,
    dots: false,
    arrows:true,
       responsive: [
        {
          breakpoint:1200,
          settings: {
            arrows: true,
            slidesToShow:3
          }
        },
        {
          breakpoint:991,
          settings: {
            arrows: true,
            slidesToShow:2
          }
        },
        {
          breakpoint:767,
          settings: {
            arrows: true,
            slidesToShow:1
          }
        }
      ]
    }); 

  