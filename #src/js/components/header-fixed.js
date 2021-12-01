const navOffset = $('.site_header__bottom').offset().top;
$(window).scroll(function () {
    const scrolled = $(this).scrollTop();

    if (scrolled > navOffset) {
        $('.site_wrap').addClass('nav-fixed');
    } else if (scrolled < navOffset) {
        $('.site_wrap').removeClass('nav-fixed');
    }
});