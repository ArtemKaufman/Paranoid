
const sliderDotsContent = document.querySelector(".js-scroll-content");
const thumbs = document.querySelectorAll('.scroll-dots .scroll-dot');
let width = document.querySelector(".js-scroll-content").offsetWidth;
let currentIndex = 0;

window.onresize = function (){
    width = document.querySelector(".js-scroll-content").offsetWidth;
};

thumbs.forEach(item => {
    item.addEventListener('click',function (){
        currentIndex = item.getAttribute('data-link');
        slide(currentIndex);
    })
});

// swiped-left
sliderDotsContent.addEventListener('swiped-left', function(e) {
    if (currentIndex < (sliderDotsContent.childElementCount - 1)) {
        currentIndex = ++currentIndex;
        slide(currentIndex);
    }
});

// swiped-right
sliderDotsContent.addEventListener('swiped-right', function(e) {
    if (currentIndex > 0) {
        currentIndex = --currentIndex;
        slide(currentIndex);
    }
});

function slide(currentIndex){
    sliderDotsContent.style.cssText = `transform: translateX( ${currentIndex * -width}px)`;
    document.querySelector('.scroll-dots .active').classList.remove('active');
    document.querySelector(`.scroll-dots .scroll-dot[data-link="${currentIndex}"]`).classList.add('active');
}
