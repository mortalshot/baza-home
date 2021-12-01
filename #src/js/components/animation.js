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