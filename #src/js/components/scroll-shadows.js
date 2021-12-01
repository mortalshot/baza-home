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