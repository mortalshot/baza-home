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