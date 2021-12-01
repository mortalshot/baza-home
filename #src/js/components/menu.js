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