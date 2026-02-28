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


/*OPTIMIZED 3d HOLOGRAPHIC TILT */


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
        card.style.setProperty('--rotY',`0deg`);
        card.style.setProperty('--mouseX', `50%`);
        card.style.setProperty('--mouseY',`50%`);
    });
});


/*, tERMINAL TYPEWRITER EFFECT  */

const typewriterElement = document.getElementById("typewriter");
const words = [
    "Third year CS student.", 
    "C++ & Python Developer.", 
    "ML Enthusiast.", 
    "Architecture Designer."
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }


    let typeSpeed= isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; 
        isDeleting = true;
    } 
    
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; 
        typeSpeed = 500; 
    }

    setTimeout(typeEffect, typeSpeed);
}


if (typewriterElement) {
    setTimeout(typeEffect, 1000); 
}



/* --LIVE TERMINAL LOGIC--- */
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('terminal-input');
    const outputArea = document.getElementById('terminal-output');
    const terminalBody = document.getElementById('terminal-body');

    
    const commands = {
        'help': `Available commands: <br>
                 <span class="highlight">whoami</span> - Learn about me<br>
                 <span class="highlight">skills</span> - View my tech stack<br>
                 <span class="highlight">projects</span> - See what I've built<br>
                 <span class="highlight">clear</span> - Clear the terminal`,
        
        'whoami': `Callum PYE. Third-year Computer Science student at Nantes University. <br>
                   Aspiring Software Architect & Data Scientist. Bilingual (English/French).`,
        
        'skills': `Languages: C++, Python, Java, SQL, JavaScript<br>
                   Tools: Git, Spring Boot, Bison/Yacc, Scikit-learn, OpenCV`,
        
        'projects': `1. Graph Risk Engine (Python, NetworkX)<br>
                     2. Custom Compiler (C++, Bison)<br>
                     3. Monopoly POO (Java)<br>
                     Type 'help' to return.`,
    };

    if(inputField) {
        inputField.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const command = inputField.value.trim().toLowerCase();
                
                
                const echoLine = document.createElement('p');
                echoLine.innerHTML = `<span class="prompt">callum@portfolio:~$</span> ${command}`;
                outputArea.appendChild(echoLine);

                
                if (command === 'clear') {
                    outputArea.innerHTML = ''; 
                } else if (commands[command]) {
                    const response = document.createElement('p');
                    response.innerHTML = commands[command];
                    outputArea.appendChild(response);
                } else if (command !== '') {
                    const errorLine = document.createElement('p');
                    errorLine.innerHTML = `Command not found: ${command}. Type <span class="highlight">'help'</span> for a list of commands.`;
                    outputArea.appendChild(errorLine);
                }

                
                inputField.value = ''; 
                terminalBody.scrollTop = terminalBody.scrollHeight; 
            }
        });
        
        
        terminalBody.addEventListener('click', () => {
            inputField.focus();
        });
    }
});


