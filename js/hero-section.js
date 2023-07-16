// JavaScript code to handle fading and scrolling
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('heroSectionAlerts');
    const maxElements = 5;
    const elements = [];

    // Array of HTML content for elements
    const elementContent = [
        `<div class="bg-white shadow-tile flex gap-4 p-6 font-semibold rounded-md max-w-max">
           <span class="material-symbols-rounded text-5xl text-red-test">warning</span>
           <div>
             <p class="m-0 text-red-400 text-xs uppercase">Dangerous site blocked</p>
             <p class="m-0 text-lg">Fake bank website</p>
           </div>
         </div>`,
        `<div class="bg-white shadow-tile flex gap-4 p-6 font-semibold rounded-md max-w-max">
           <span class="material-symbols-rounded text-5xl text-orange">help</span>
           <div>
             <p class="m-0 text-yellow-300 text-xs uppercase">SUSPICIOUS site blocked</p>
             <p class="m-0 text-lg">Tried to steal your personal data</p>
           </div>
         </div>`,
        `<div class="bg-white shadow-tile flex gap-4 p-6 font-semibold rounded-md max-w-max">
           <span class="material-symbols-rounded text-5xl text-green-valid">check_box</span>
           <div>
             <p class="m-0 text-green-500 text-xs uppercase">site is safe</p>
             <p class="m-0 text-lg">Lorem Ipsum</p>
           </div>
         </div>`
    ];

    // Function to create a new scroll-fade element
    const createScrollFadeElement = (htmlContent) => {
        const element = document.createElement('div');
        element.innerHTML = htmlContent;
        element.classList.add('scroll-item');
        container.appendChild(element);
        element.style.transform = `translateY(${(elements.length) * (element.offsetHeight + 20)}px)`;
        return element;
    };

    // Function to fade out the element
    const fadeOut = (element) => {
        element.animate(
            [
                { transform: `translateY(0px)`, opacity: '1'},
                { transform: `translateY(${(element.offsetHeight + 20)*-1}px)`, opacity: 0 },
            ],
            {
                duration: 500,
                iterations: 1,
                fill: "forwards"
            }
        );
    };

    // Function to fade in the element
    const fadeIn = (element) => {
        element.classList.add('scroll-item-animated');
        element.animate(
            [
                { opacity: "0" },
                { opacity: "1" },
            ],
            {
                duration: 500,
                iterations: 1,
                fill: "forwards"
            }
        );
    };

    // Function to move elements up
    const moveElementsUp = () => {
        elements.forEach((element, index, array) => {
            const translateY = index * (element.offsetHeight + 20);

            element.style.transform = `translateY(${translateY}px)`;
            element.animate(
                [
                    { transform: `translateY(${(index + 1) * (element.offsetHeight + 20)}px)`},
                    { transform: `translateY(${translateY}px)`},
                ],
                {
                    duration: 500,
                    iterations: 1,
                    fill: "forwards"
                }
            );

            if (translateY >= container.offsetHeight - element.offsetHeight) {
                element.style.opacity = '0';
            } else {
                element.style.opacity = '1';
            }
        });
    };

    // Function to add a new scroll-fade element
    const addNewElement = () => {
        if (elements.length >= maxElements) {
            const firstElement = elements.shift();
            fadeOut(firstElement);
            const randomIndex = Math.floor(Math.random() * elementContent.length);
            const htmlContent = elementContent[randomIndex];
            const element = createScrollFadeElement(htmlContent);
            elements.push(element);
            fadeIn(element);

            setTimeout(() => {
                container.removeChild(firstElement);
            }, 500); // Wait for fade in transition to complete

            moveElementsUp();

        } else {
            const randomIndex = Math.floor(Math.random() * elementContent.length);
            const htmlContent = elementContent[randomIndex];
            const element = createScrollFadeElement(htmlContent);
            elements.push(element);
            fadeIn(element);
        }
    };

    // Add new elements every 2 seconds
    setInterval(addNewElement, 2000);
});