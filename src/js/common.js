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
	let modal = document.querySelector('[data-modal="dialog"]');
	let btn = document.querySelector('[data-onclick="dialog"]');
	let overflow = document.createElement('div');
	overflow.className = "overflow";

	btn.onclick = function () {
		document.body.appendChild(overflow);
		modal.style.display = "flex";
	}

	overflow.onclick = function () {
		overflow.remove();
		modal.style.display = "none";
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