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