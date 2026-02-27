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

