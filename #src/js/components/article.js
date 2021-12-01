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