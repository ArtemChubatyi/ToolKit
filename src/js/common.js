$(document).ready(function() {
    // ------Sidebar-------
    $(".sidebar-menu > li.have-children a").on("click", function() {
    if ( ! $(this).parent().hasClass("active") ) {
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

    // --------Speed dial------
    $(".tk-speed-dial__button").on("click", function(){
        $(".tk-speed-dial ul").slideToggle();
        $(".tk-speed-dial__item").on("click", function(){
            $(".tk-speed-dial ul").slideUp();
        });
    });

    // --------Menu whith dropdown------
    $(".tk-menu__item.have-children > .tk-item__content").on("click", function(){
        if(!$(this).parent().hasClass("active")) {
            $(this).parent().addClass("active");
        } else {
            $(this).parent().removeClass("active");
        }
        $(this).next().slideToggle();
        $(".tk-menu__inner-item").on("click", function(){
            $(".tk-menu__item ul").slideUp();
            $(".tk-menu__item").removeClass("active");
        });
    });

    // --------modal toast------
    document.querySelector('.toast-examples > button').onclick = function() {
        let toast = document.querySelector('.toast-examples > .tk-toast');
        toast.classList.add('tk-toast_show');
        setTimeout( function() {
            toast.classList.remove('tk-toast_show');
        }, 4000);
    }

    // --------modal dialog------
    let modal = document.querySelector('.dialog-modal');
    let overflow = document.createElement('div');
    function openModal() {
        overflow.className = "overflow";
        document.body.appendChild(overflow);
        modal.style.display = "flex";
    }

    overflow.onclick = function () {
        modal.style.display = "none"
    }

    // --------Top bar------
    var prevScrollPos = window.pageYOffset;
    window.onscroll = function() {
        var curentScrollPos = window.pageYOffset;
        if (prevScrollPos > curentScrollPos) {
            document.getElementById('header').style.top = "0";
        } else {
            document.getElementById('header').style.top = "-80px";
        }
        prevScrollPos = curentScrollPos;
    }

});