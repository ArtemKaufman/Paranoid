var elHeader = document.querySelector('header.fixed');

if (elHeader) {
    var header = elHeader.classList;
    window.addEventListener('scroll', function(e) {
        var bool = Math.max(window.pageYOffset, document.documentElement.scrollTop) > 0;
        header.toggle('shadow-md', bool);
        header.toggle('bg-white', bool);
    });
}

function paranoidSlider(container) {
    var buttons = Array.prototype.slice.call(container.querySelectorAll('.js-scroll-btn'));
    var content = container.querySelector('.js-scroll-content');

    if (!buttons[0]) return;
    
    function disableButtons() {      
        var value = content.scrollLeft;
        buttons[0].style.opacity = value;
        var FIXME_MAGIC = 6; // FIXME
        buttons[1].style.opacity = +(value+FIXME_MAGIC < content.scrollWidth - content.offsetWidth);
    }

    function click(e) {
        var clicked = buttons.find(function(item) {
            return item === e.target;
        });

        var canClick = clicked && (clicked.style.opacity === '' || +clicked.style.opacity);

        if (canClick) {
            e.preventDefault();
            content.scrollLeft += content.offsetWidth * clicked.value;
        }
    }

    container.addEventListener('click', click);
    content.addEventListener('scroll', disableButtons);

    disableButtons();
}

Array.prototype.map.call(document.querySelectorAll('.js-scroll'), paranoidSlider);

Array.prototype.forEach.call(document.forms, function(form) {
    form.addEventListener('submit', function(e) {
        this.classList.add('form--submitted');
        // Если не прошло валидацию то останавливаем событие
        if (!this.checkValidity()) {
            e.preventDefault();
        }
    });
});

/* IOS menu fix */
document.addEventListener('touchend', function(e) {
    if (!document.querySelector('.nav').contains(e.target) && document.activeElement != document.body) {
        document.activeElement.blur();
        e.preventDefault();
    }
});

if(document.querySelector('#navMobileBtn')){
    const navWrapper = document.querySelector('.nav__wrapper');
    const nav = document.querySelector('.nav__wrapper .nav');
    document.querySelector('#navMobileBtn').addEventListener('click', function (){

        navWrapper.classList.toggle('open');

        if(navWrapper.classList.contains('open')){
            nav.style.visibility = 'visible';
        } else {
            setTimeout(function (){
                nav.style.visibility = 'hidden'; // visibility hidden needed to prevent showing menu on page load or resize
            }, 500); //500ms is also used in CSS transition
        }
    })
}

if(document.querySelector('#langMenu')){
    document.querySelector('#langChangeBtn').addEventListener('click', function (e){
        e.stopPropagation();
        document.querySelector('#langMenu').classList.add('open');
    });
}

document.addEventListener('click', function (){
    if(document.querySelector('#langMenu.open')){
        document.querySelector('#langMenu').classList.remove('open');
    }
});

document.querySelector('#searchAlertClose').addEventListener('click', function (){
    document.querySelector('.nav-search__alert').style.display = 'none';
})

const pageSearchLocation = ()=>{

    const nav = document.querySelector('.nav-search__wrapper');
    if(window.innerWidth < 1280){
        document.querySelector('main').prepend(nav);
    } else {
        document.querySelector('.nav').prepend(nav);
    }
}

window.addEventListener('resize', pageSearchLocation);
window.addEventListener('load', pageSearchLocation);
