let currentCardIndex = 0;

function moveDeck(direction) {
    const cards = document.querySelectorAll('.project-card');
    cards[currentCardIndex].classList.remove('active');
    currentCardIndex += direction;
    if (currentCardIndex >= cards.length) {
        currentCardIndex = 0;
    } else if (currentCardIndex < 0) {
        currentCardIndex = cards.length - 1;
    }
    cards[currentCardIndex].classList.add('active');
}



function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}



/* --- SCROLL REVEAL LOGIC -- */

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            
            entry.target.classList.add('show');
        } else {
           
           
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.15 
});

document.addEventListener('DOMContentLoaded', () => {
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});


/* OPTIMIZED 3d HOLOGRAPHIC TILT */


const tiltCards = document.querySelectorAll('.about-containers .details-container, .experience-details-container .details-container, .text-container');

tiltCards.forEach(card => {
    let rect; 

    card.addEventListener('mouseenter', () => {
    
        rect = card.getBoundingClientRect();
        card.style.transition = 'none'; 
    });

    card.addEventListener('mousemove', (e) => {
        if (!rect) return;
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top; 

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        
        const rotateX = ((y - centerY) / centerY) * -4; 
        const rotateY = ((x - centerX) / centerX) * 4;

        const mouseX = (x / rect.width) * 100;
        const mouseY = (y / rect.height) * 100;

        card.style.setProperty('--rotX', `${rotateX}deg`);
        card.style.setProperty('--rotY', `${rotateY}deg`);
        card.style.setProperty('--mouseX', `${mouseX}%`);
        card.style.setProperty('--mouseY', `${mouseY}%`);
    });

    card.addEventListener('mouseleave', () => {
        rect = null; 
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease-out';
        card.style.setProperty('--rotX', `0deg`);
        card.style.setProperty('--rotY', `0deg`);
        card.style.setProperty('--mouseX', `50%`);
        card.style.setProperty('--mouseY', `50%`);
    });
});