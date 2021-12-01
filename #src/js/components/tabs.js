$('.tabs-triggers__item').click(function (e) {
    e.preventDefault();

    var tabsid = $(this).closest('.tabs').attr("id");
    $('#' + tabsid + ' ' + '.tabs-triggers__item').removeClass('tabs-triggers__item--active');
    $('#' + tabsid + ' ' + '.tabs-content__item').removeClass('tabs-content__item--active');

    $(this).addClass('tabs-triggers__item--active');
    $($(this).attr('href')).addClass('tabs-content__item--active');
});

let tabsList = document.querySelectorAll('.tabs');
if (tabsList.length > 0) {
    for (let i = 0; i < tabsList.length; i++) {
        const element = tabsList[i];
        let elementID = $(element).attr('id');
        $("#" + elementID + " .tabs-triggers__item:first").click();
    }
}