$(document).ready(function () {
    // libs
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".item,992,2"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});

// components
function testWebP(callback) {

	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

	if (support == true) {
		document.querySelector('body').classList.add('webp');
	}
	else {
		document.querySelector('body').classList.add('no-webp');
	}
});
// header__burger active
$('.header__burger').click(function (event) {
    $('.header__burger, .header').toggleClass('active');
    $('body').toggleClass('lock');
})

// header__bottom fixed
const navOffset = $('.header__bottom').offset().top;
let scrolled = $(this).scrollTop();

if (scrolled > navOffset) {
    $('.site__wrap').addClass('_nav-fixed');
    $('.header__bottom').addClass('lock-padding');
} else if (scrolled < navOffset) {
    $('.site__wrap').removeClass('_nav-fixed');
    $('.header__bottom').removeClass('lock-padding');
}

const headerTopHeight = $('.header__top').innerHeight();
const headerBottomHeight = $('.header__bottom').innerHeight();
$('.header__mobile').css({
    "padding-top": headerTopHeight + headerBottomHeight + 'px',
});

$(window).scroll(function () {
    const scrolled = $(this).scrollTop();

    if (scrolled > navOffset) {
        $('.site__wrap').addClass('_nav-fixed');
        $('.header__bottom').addClass('lock-padding');
        $('.site__main').css({
            "padding-top": headerBottomHeight + 'px',
        });
        $('.header__mobile').css({
            "padding-top": headerBottomHeight + 'px',
        });
    } else if (scrolled < navOffset) {
        $('.site__wrap').removeClass('_nav-fixed');
        $('.site__main').css({ "padding-top": '0px' });
        $('.header__bottom').removeClass('lock-padding');
        $('.header__mobile').css({
            "padding-top": headerBottomHeight + headerTopHeight - scrolled + 'px',
        });
    }
});

// === ACTIVE STATE OF THE MENU WHEN SCROLLING THE PAGE START ===
let navHeight = $('.header__bottom').outerHeight();
var myHash = location.hash;
const iconMenu = document.querySelector('.header__burger');

location.hash = '';
if (myHash[1] != undefined) {
    $('html, body').animate({ scrollTop: $(myHash).offset().top - navHeight - 40 }, 1000);
};

$('a').on('click', function () {
    navHeight = $('.header__bottom').outerHeight();

    if (this.hash !== '') {
        const hash = this.hash;

        if (iconMenu.classList.contains('active')) {
            removeActive();
        }

        $('html, body').animate({
            scrollTop: $(hash).offset().top - navHeight - 40
        }, 1000);
        return false;
    }
});
// === ACTIVE STATE OF THE MENU WHEN SCROLLING THE PAGE END ===
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(params) {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4; // Коэффициент старта анимации

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    setTimeout(() => {
        animOnScroll();
    }, 300);
}

const phone = $('#phone');
if (phone.length > 0) {
    const carrotLabel = $('#carrotLabel');
    const carrotLabelShadow = $('#carrotLabelShadow');
    const appleLabel = $('#appleLabel');
    const appleLabelShadow = $('#appleLabelShadow');
    const potatoLabel = $('#potatoLabel');
    const potatoLabelShadow = $('#potatoLabelShadow');
    const door = $('#door');
    const car = $('#car');
    const products = $('#products');
    const success = $('#success');

    gsap.to(carrotLabel, { duration: 0.5, opacity: 1 });
    gsap.to(carrotLabel, { duration: 0.5, y: -90, delay: 0.5 });
    gsap.to(carrotLabelShadow, { duration: 0.7, opacity: 0, delay: 1 });
    gsap.to(carrotLabel, { duration: 1, x: -255, y: -162, delay: 1 });

    gsap.to(appleLabel, { duration: 0.5, opacity: 1, delay: 1.8 });
    gsap.to(appleLabel, { duration: 0.5, y: -150, delay: 2.3 });
    gsap.to(appleLabelShadow, { duration: 0.7, opacity: 0, delay: 2.3 });
    gsap.to(appleLabel, { duration: 1, x: -300, y: -290, delay: 2.8 });

    gsap.to(potatoLabel, { duration: 0.5, opacity: 1, delay: 3.5 });
    gsap.to(potatoLabel, { duration: 0.5, y: -100, delay: 4 });
    gsap.to(potatoLabelShadow, { duration: 0.7, opacity: 0, delay: 4.5 });
    gsap.to(potatoLabel, { duration: 1, x: -150, y: -183, delay: 4.5 });

    gsap.to(potatoLabel, { duration: 1, x: -300, y: -200, delay: 6 });
    gsap.to(appleLabel, { duration: 1, x: -450, y: -305, delay: 7 });
    gsap.to(carrotLabel, { duration: 1, x: -405, y: -175, delay: 8 });

    gsap.to(potatoLabel, { duration: 1, opacity: 0, delay: 9 });
    gsap.to(appleLabel, { duration: 1, opacity: 0, delay: 9 });
    gsap.to(carrotLabel, { duration: 1, opacity: 0, delay: 9 });

    gsap.to(door, { duration: 0.7, y: -30, delay: 10 });
    gsap.to(car, { duration: 1, ease: "none", x: 0, y: 0, delay: 10.7 });
    gsap.to(products, { duration: 1, opacity: 1, delay: 12 });

    gsap.to(success, { duration: 1, opacity: 1, delay: 13 });
}
//Select
let selects = document.getElementsByTagName('select');
if (selects.length > 0) {
	selects_init();
}
function selects_init() {
	for (let index = 0; index < selects.length; index++) {
		const select = selects[index];
		select_init(select);
	}
	//select_callback();
	document.addEventListener('click', function (e) {
		selects_close(e);
	});
	document.addEventListener('keydown', function (e) {
		if (e.which == 27) {
			selects_close(e);
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select');
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');
	select.setAttribute('data-default', select_selected_option.value);
	select.style.display = 'none';

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

	let new_select = select.parentElement.querySelector('.select');
	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement;
	const select_items = select_parent.querySelector('.select__item');
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
	} else {
		select_type_content = '<div class="select__value"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) + '</div>' +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search);
		} else {
			if (select_option.getAttribute('data-value') == original.value) {
				select_option.style.display = 'none';
			}
		}
		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
				original.value = select_option_value;
				select_option.style.display = 'none';
			}
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;
			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.select__options');
	let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_option.innerText;
		if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}


let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.site__main').offsetWidth + 'px'; //!обратить внимание на контейнер

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout)
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

(function () {
    // проверяем поддержку
    if (!Element.prototype.closest) {

        // реализуем
        Element.prototype.closest = function (css) {
            var node = this;

            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();

(function () {
    // проверяем поддержку
    if (!Element.prototype.matches) {

        // определяем свойство
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
    for (let index = 0; index < quantityButtons.length; index++) {
        const quantityButton = quantityButtons[index];
        quantityButton.addEventListener("click", function (e) {
            let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
            if (quantityButton.classList.contains('quantity__button--plus')) {
                if (isNaN(value)) {
                    value = 0;
                }
                value++;
            } else {
                value = value - 1;
                if (value < 1) {
                    value = 1
                }
            }
            quantityButton.closest('.quantity').querySelector('input').value = value;
        });
    }
}

$('.catalog-sorting__link, .filter-attributes__link, .filter-product__country-item').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
})

$('.filter-product .filter-stirps__item:first-child').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
        $(this).closest('.tab-pane').find('.filter-stirps__item').not(':first-child').removeClass('active');
        $(this).closest('.tab-pane').find('.filter-stirps__item').not(':first-child').click();

    } else {
        $(this).closest('.tab-pane').find('.filter-stirps__item').not(':first-child').addClass('active');
        $(this).closest('.tab-pane').find('.filter-stirps__item').not(':first-child').click();
    }
})

$('.filter-product .filter-stirps__item').not(':first-child').on('click', function (e) {
    e.preventDefault();
    const id = $(this).attr('href');
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
        $(id).slideDown(300);
    } else {
        $(id).slideUp(300);
    }
})

$('.filter-attributes__item .filter-attributes__title').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $(this).closest('.filter-attributes__item').find('.filter-attributes__link').addClass('active');

    if ($(this).hasClass('active')) {
        $(this).closest('.filter-attributes__item').find('.filter-attributes__link').addClass('active');
    } else {
        $(this).closest('.filter-attributes__item').find('.filter-attributes__link').removeClass('active');
    }
});

// reset button
$('.attributes-summary__reset').on('click', function (e) {
    e.preventDefault();
    $('.filter-product .filter-stirps__item, .filter-attributes__title, .filter-attributes__link, .filter-product__country-item').removeClass('active');
    $('.filter-attributes__item').slideUp(300);
});

let mediaQuery = window.matchMedia('(max-width: 1250px)');
mediaQuery.addListener(handleTabletChangeMediaQuery);
function handleTabletChangeMediaQuery(e) {
    if (e.matches) {
        $('.filter-modals__link.popup-link').click(function (e) {
            $('.navigation-drawer__wrapper, .navigation-drawer, .drawer-on').removeClass('active');
        });
    }
}
if (mediaQuery.matches) {
    $('.filter-modals__link.popup-link').click(function (e) {
        $('.navigation-drawer__wrapper, .navigation-drawer, .drawer-on').removeClass('active');
    });
}

// open modal window and change tab
$('.filter-modals__link').on('click', function (e) {
    const id = $(this).data('tab');
    $(id).closest('#filterAttrTabs').find('.nav-link').removeClass('active');
    $(id).closest('#filterAttrTabs').find('.filter-attributes .tab-pane').removeClass('active show');
    $(id)[0].click();
});

if ('.market__catalog' && $('.catalog__products').hasClass('catalog__products--card')) {
    let popupHeight = $('.catalog__product:last-child .product-popup').outerHeight();
    $('.market__catalog').css({ 'padding-bottom': popupHeight });

    $(window).resize(function () {
        popupHeight = $('.catalog__product:last-child .product-popup').outerHeight();
        $('.market__catalog').css({ 'padding-bottom': popupHeight });
    })
}

$('.drawer-closed .navigation-drawer__wrapper').dblclick(function (e) {
    $('.drawer-closed, .navigation-drawer__wrapper').removeClass('active');
})

$('.navigation-drawer .account__logout').click(function (e) {
    e.preventDefault();
    $('.drawer-on').addClass('drawer-closed');
    $('.navigation-drawer__wrapper, .navigation-drawer, .drawer-on').removeClass('active');
});
$('.accordion__title').click(function (event) {

    let accordionid = $(this).closest('.accordion').attr("id");

    if ($('#' + accordionid).hasClass('accordion-one')) {
        $('#' + accordionid + ' ' + '.accordion__title').not($(this)).removeClass('active');
        $('#' + accordionid + ' ' + '.accordion__text').not($(this).next()).slideUp(300);
    }

    $(this).toggleClass('active').next().slideToggle(300);
});
$('.provider-reviews').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button type="button" class="slick-arrow slick-prev"><i class="icon-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"><i class="icon-chevron-right"></i></button>',
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
});

$('.item-popup__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button type="button" class="slick-arrow slick-prev"><i class="icon-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"><i class="icon-chevron-right"></i></button>',
    dots: false,
});
let chat = $('.chat');

if (chat) {
    $(".chat__window").scrollTop(function () {
        return this.scrollHeight;
    });
}

document.addEventListener("click", documentActions);
function documentActions(e) {
    const targetElement = e.target;

    // ACCORDION ACTION START
    if (document.querySelector('.language')) {
        if (targetElement.classList.contains('language__link') || targetElement.closest('.language__link')) {
            e.preventDefault();
            targetElement.closest('.language').classList.toggle('_active');
        } else if (targetElement.closest('.language')) {
            targetElement.closest('.language').classList.add('_active');
        } else {
            document.querySelector('.language').classList.remove('_active');
        }
    }
    // ACCORDION ACTION END
}
let elementWrapper = document.querySelector('.process-presentation__wrapper');
let elementList = document.querySelector('.process-presentation__table');


if (elementWrapper) {
    let shadowTop = elementWrapper.querySelector('.shadow--top');
    let shadowBottom = elementWrapper.querySelector('.shadow--bottom');

    let contentScrollHeight = elementList.scrollHeight - elementWrapper.offsetHeight;

    if (contentScrollHeight <= 1) {
        shadowBottom.style.opacity = 0;
    }

    elementList.addEventListener('scroll', function (e) {
        let currentScroll = this.scrollTop / (contentScrollHeight);

        shadowTop.style.opacity = currentScroll;
        shadowBottom.style.opacity = 1 - currentScroll;
    })
}
// === ARTICLE START ===
if ($('.article').length > 0) {
    const headings = $('h2');

    // Создание бокового меню
    for (let index = 0; index < headings.length; index++) {
        const element = headings[index];
        const elementText = $(element).text();

        $(element).attr('id', `heading-${index + 1}`);

        $('.article__menu-list').append(`
                <li class="article__menu-item">
                    <a href="#heading-${index + 1}" class="article__sidebar-link" data-goto="#heading-${index + 1}">${elementText}</a>
                </li>
                `);
    }

    // Прокрутка при клике
    const menuLinks = document.querySelectorAll('.article__sidebar-link[data-goto]');
    if (menuLinks.length > 0) {
        menuLinks.forEach(menuLink => {
            menuLink.addEventListener('click', onMenuLinkClick);
        });

        function onMenuLinkClick(e) {
            const menuLink = e.target;

            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

                $('body,html').animate({ scrollTop: gotoBlockValue }, 1000);
                e.preventDefault();
            }
        }
    }

    // Ативное состояние меню при прокрутке страницы 
    let section = $('.article__content h2'),
        nav = $('.header__bottom'),
        navHeight = nav.outerHeight(); // получаем высоту навигации 

    // поворот экрана 
    window.addEventListener('orientationchange', function () {
        navHeight = nav.outerHeight();
    }, false);

    const sidebarOffset = $('.sidebar').offset().top;
    const sidebarWidth = $('.sidebar__wrapper').innerWidth();
    $('.sidebar__wrapper').css({ width: sidebarWidth });

    const footerOffset = $('.footer').offset().top;
    const contentMargin = $('.privacy').outerHeight(true) - $('.privacy').innerHeight();
    console.log($('.article__heading').outerHeight(true));
    console.log(footerOffset - navHeight - $('.header__top').innerHeight() - $('.article__heading').outerHeight(true) - contentMargin);




    $(window).on('scroll', function () {
        const scrolled = $(this).scrollTop();

        navHeight = nav.outerHeight();

        section.each(function () {
            const top = $(this).offset().top - navHeight - 30,
                bottom = top + $(this).outerHeight() + 100;

            if (scrolled >= top && scrolled <= bottom) {
                $('.article__menu-list').find('.article__sidebar-link').removeClass('active');
                section.removeClass('active');

                $(this).addClass('active');
                $('.article__menu-list').find('.article__sidebar-link[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });


        // if (scrolled > sidebarOffset - navHeight) {
        //     // прилипаем
        //     $('.sidebar__wrapper').addClass('_fixed-top');
        //     $('.sidebar__wrapper').css({
        //         top: navHeight,
        //     })
        // } else if (scrolled < sidebarOffset - navHeight) {
        //     // отлипаем
        //     $('.sidebar__wrapper').removeClass('_fixed-top');
        //     $('.sidebar__wrapper').css({
        //         top: "",
        //     })
        // }

        // const bottomFixPoint = $(document).height() - $('.sidebar__wrapper').innerHeight() - $('.footer').innerHeight() - navHeight * 2;

        // if (scrolled > bottomFixPoint) {
        //     $('.sidebar__wrapper').removeClass('_fixed-top');
        //     $('.sidebar__wrapper').addClass('_fixed-bottom');

        //     $('.sidebar__wrapper').css({
        //         top: bottomFixPoint - $('.sidebar').offset().top + $('.sidebar__wrapper').innerHeight() - $('.header__top').innerHeight()
        //     })
        // } else if (scrolled < bottomFixPoint && $('.sidebar__wrapper').hasClass('_fixed-bottom')) {
        //     $('.sidebar__wrapper').addClass('_fixed-top');
        //     $('.sidebar__wrapper').removeClass('_fixed-bottom');
        // }
    });
};
    // === ARTICLE END ===


;

    $('.delivery-timeline__btn').click(function (e) {
        e.preventDefault();
        $('.delivery-timeline__wrapper').toggleClass('active');
    });

    if ($('.delivery-history__item')) {
        $('.delivery-history__timeline').css({ 'padding-top': $('.delivery-history__item').outerHeight() / 2, 'padding-bottom': $('.delivery-history__item').outerHeight() / 2 });
    }

    if ($('#providerTabs').length > 0) {
        $('#providerTabs .nav-link:not(#providerTab-1)').click(function () {
            $('.provider-reviews').slideUp(300);
        })
        $('#providerTab-1').click(function () {
            $('.provider-reviews').slideDown(300);
        })

        if (!$('#providerTab-1').hasClass('active')) {
            $('.provider-reviews').slideUp(300);
        }
    }

    if ($('.auth').length > 0) {
        let mediaQueryHeight = window.matchMedia('(min-height: 568px)');
        if (mediaQueryHeight.matches) {
            $(window).resize(function () {
                let headerHeight = $('.site__header').innerHeight();
                let footerHeight = $('.site__footer').innerHeight();
                let resultHeight = $(window).height() - headerHeight - footerHeight;
                $('.auth').css({ 'height': resultHeight });
            });

            let headerHeight = $('.site__header').innerHeight();
            let footerHeight = $('.site__footer').innerHeight();
            let resultHeight = $(window).height() - headerHeight - footerHeight;
            $('.auth').css({ 'height': resultHeight });
        }
    }

    $('.notice__btn').click(function (e) {
        e.preventDefault();
        $(this).next('.notice__wrapper').addClass('active');
    })
    $(document).mouseup(function (e) {
        var div = $(".notice__wrapper");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            $('.notice__wrapper').removeClass('active');
        }
    });

    // phone input mask
    $('.form-control--phone').mask("+7(999) 999-9999");
    // phone input mask end

    // rating stars
    const ratingItemsList = document.querySelectorAll('.rating__item');
    const ratingItemsArray = Array.prototype.slice.call(ratingItemsList);

    ratingItemsArray.forEach(item =>
        item.addEventListener('click', () => {
            const { itemValue } = item.dataset;
            item.parentNode.dataset.totalValue = itemValue;
        })
    );
    // rating stars end

    // delivery statistics toggle window
    $('.delivery-statistics__close').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $(this).next('.delivery-statistics__body').fadeToggle(300);
    })
    // delivery statistics toggle window end

    // toggle fields on radio change
    $('input[name="Fill up props"]').on('change', function () {
        if ($('input[value="Fill up new props"]').is(':checked')) {
            $(this).closest('.popup-purse').find('.popup-purse__wrapper').slideDown(300);
        } else {
            $(this).closest('.popup-purse').find('.popup-purse__wrapper').slideUp(300);
        }
    })

    $('input[name="Withdraw props"]').on('change', function () {
        if ($('input[value="Withdraw new props"]').is(':checked')) {
            $(this).closest('.popup-purse').find('.popup-purse__wrapper').slideDown(300);
        } else {
            $(this).closest('.popup-purse').find('.popup-purse__wrapper').slideUp(300);
        }
    })
    // toggle fields on radio change end

    // show hidden element
    $('.btn-show').click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('show-once')) {
            $(this).fadeToggle(100);
        }
        $(this).next('.block-hidden').fadeToggle(300);
    })
    // show hidden element end

    $('input[name="datetimes"]').daterangepicker({
        autoUpdateInput: true,
        showCustomRangeLabel: false,
        applyButtonClasses: "btn btn-green",
        cancelButtonClasses: "text-link",
        locale: {
            cancelLabel: 'Clear',
            format: 'DD/M/Y',
            "applyLabel": "Принять",
            "cancelLabel": "Сбросить",
            "daysOfWeek": [
                "Пн",
                "Вт",
                "Ср",
                "Чт",
                "Пт",
                "Сб",
                "Вс"
            ],
            "monthNames": [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь"
            ],
            "firstDay": 1
        },
    });
})
