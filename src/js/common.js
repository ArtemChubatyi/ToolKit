$(document).ready(function(){
	// ------Sidebar-------
	$(".sidebar-menu > li.have-children a").on("click", function(){	
    if( ! $(this).parent().hasClass("active") ){
      $(".sidebar-menu li ul").slideUp();
      $(this).next().slideToggle();
      $(".sidebar-menu li").removeClass("active");
      $(this).parent().addClass("active");
    }
    else{
      $(this).next().slideToggle();
      $(".sidebar-menu li").removeClass("active");
        }
	});
	
	// --------Menu------

	var prevScrollPos = window.pageYOffset;
	window.onscroll = function() {
		var curentScrollPos = window.pageYOffset;
		if(prevScrollPos > curentScrollPos) {
			document.getElementById('header').style.top = "0";
		} else {
			document.getElementById('header').style.top = "-80px";
		}
		prevScrollPos = curentScrollPos;
	}

});