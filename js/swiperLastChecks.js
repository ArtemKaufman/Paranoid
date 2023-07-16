
// window.addEventListener('resize', () => {
//     if(window.innerWidth < 1024) {
//         let removed = document.querySelectorAll('.swiper, .swiper-button-next, .swiper-button-prev, .swiper-slide, .swiper-wrapper')
//         removed.forEach(el => {
//             el.classList.remove("swiper", "swiper-button-next", "swiper-button-prev", "swiper-slide", "swiper-wrapper")
//         })
//     }
// })


const swiperLastChecks = new Swiper('.swiperLastChecks', {
    direction: 'horizontal',
    slidesPerView: 'auto',
    loop: true,
    freeMode: true,
    watchoverflow: true,
    autoplay: {
        delay: 2500,
    },

    breakpoints: {
        0: {
            loop: false,
            spaceBetween: 800,
            autoplay: false,
        },
        640: {
            loop: true,
            spaceBetween: 80,
        },
        768: {
            loop: true,
            slidesPerView: 3,
        },
        1024: {
            loop: true,
            slidesPerView: 4,
        },
        1280: {
            loop: true,
            slidesPerView: 5,
        }
    }
    
});

