$('.accordion__title').click(function (event) {

    let accordionid = $(this).closest('.accordion').attr("id");

    if ($('#' + accordionid).hasClass('accordion-one')) {
        $('#' + accordionid + ' ' + '.accordion__title').not($(this)).removeClass('active');
        $('#' + accordionid + ' ' + '.accordion__text').not($(this).next()).slideUp(300);
    }

    $(this).toggleClass('active').next().slideToggle(300);
});