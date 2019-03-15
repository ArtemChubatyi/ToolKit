;$(document).ready(function () {
	// ------Sidebar-------
	$(".sidebar-menu .have-children > a").on("click", function () {
		if (!$(this).parent().hasClass("active")) {
			$(".sidebar-menu li ul").slideUp();
			$(this).next().slideToggle();
			$(".sidebar-menu li").removeClass("active");
			$(this).parent().addClass("active");
		} else {
			$(this).next().slideToggle();
			$(".sidebar-menu li").removeClass("active");
		}
	});

	// --------Speed dial------
	$(".tk-speed-dial__button").on("click", function () {
		$(".tk-speed-dial ul").slideToggle();
		$(".tk-speed-dial__item").on("click", function () {
			$(".tk-speed-dial ul").slideUp();
		});
	});

	// --------Menu whith dropdown------
	$(".tk-menu__item.have-children > .tk-item__content").on("click", function () {
		if (!$(this).parent().hasClass("active")) {
			$(this).parent().addClass("active");
		} else {
			$(this).parent().removeClass("active");
		}
		$(this).next().slideToggle();
		$(".tk-menu__inner-item").on("click", function () {
			$(".tk-menu__item ul").slideUp();
			$(".tk-menu__item").removeClass("active");
		});
	});

	// --------modal toast------

	document.getElementById('demo-toast').onclick = function () {
		const toast = document.getElementById('demo-toast').nextElementSibling;

		toast.classList.add('tk-toast_show');

		setTimeout(function () {
			toast.classList.remove('tk-toast_show');
		}, 4000);
	}

	// --------modal dialog------

	const modal = document.querySelector('.dialog-demo').lastElementChild;
	const btn = document.querySelector('.dialog-demo').firstElementChild;
	const overflow = document.createElement('div');

	overflow.classList.add('overflow');

	btn.onclick = function () {
		modal.parentElement.appendChild(overflow);
		modal.classList.add('tk-dialog_show');
		window.onscroll = function (e) {
			e.preventDefault();
			//https://stackoverflow.com/questions/25651448/how-to-preserve-a-spacing-template-on-multiple-lines-using-a-flex-box-container?rq=1
		}
	}
	overflow.onclick = function () {
		modal.classList.remove('tk-dialog_show');
		overflow.remove();
	}



	// --------Top bar------
	// var prevScrollPos = window.pageYOffset;
	// window.onscroll = function () {
	// 	var curentScrollPos = window.pageYOffset;
	// 	if (prevScrollPos > curentScrollPos) {
	// 		document.getElementById('header').style.top = "0";
	// 	} else {
	// 		document.getElementById('header').style.top = "-80px";
	// 	}
	// 	prevScrollPos = curentScrollPos;
	// }
	let timer = false;
	window.onscroll = function() {
		document.getElementById('header').style.top = "-80px";
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(function () {
			document.getElementById('header').style.top = "0";
		}, 1000);
	}

});