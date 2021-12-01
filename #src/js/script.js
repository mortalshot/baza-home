$(document).ready(function () {
    @@include('index.js');

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
