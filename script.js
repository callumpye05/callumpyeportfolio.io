let currentCardIndex = 0;

/* --- SINGULARITY ENGINE STATE --- */
let singularityActive = false;
let singularityX = window.innerWidth / 2;
let singularityY = window.innerHeight / 2;
let blackHoleRadius = 0;

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



/* --- SCROLL REVEAL & CIPHER DECRYPT LOGIC -- */
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            
            
            if (document.body.classList.contains('hacker-mode')) {
            
                if (entry.target.classList.contains('title') && !entry.target.dataset.decrypted) {
                    entry.target.dataset.decrypted = "true"; 
                    let iteration = 0;
                    let originalText = entry.target.dataset.value; 
                    
                    
                    if (!originalText) {
                        originalText = entry.target.innerText;
                        entry.target.dataset.value = originalText;
                    }

                    clearInterval(entry.target.interval);
                    
                    entry.target.interval = setInterval(() => {
                        entry.target.innerText = originalText
                            .split("")
                            .map((letter, index) => {
                                if(index < iteration) return originalText[index];
                                return letters[Math.floor(Math.random() * 26)];
                            })
                            .join("");
                        
                        if(iteration >= originalText.length){ 
                            clearInterval(entry.target.interval);
                            entry.target.innerText = originalText; 
                        }
                        iteration += 1 / 3; 
                    }, 30);
                }
            } else {  
                clearInterval(entry.target.interval);
                if (entry.target.dataset.value) {
                    entry.target.innerText = entry.target.dataset.value;
                }
            }
        } else {
            entry.target.classList.remove('show');
            
            // Reset state so it can happen again if they scroll away and back
            entry.target.dataset.decrypted = ""; 
            clearInterval(entry.target.interval);
            
            // Restore original text immediately while hidden
            if (entry.target.dataset.value) {
                entry.target.innerText = entry.target.dataset.value;
            }
        }
    });
}, { threshold: 0.15 });

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
                 <span class="highlight">github</span> - Fetch my live GitHub stats<br>
                 <span class="highlight">sudo su</span> - To be avoided....<br>
                 <span class="highlight">rm -rf /</span> - To end all things...<br>
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
        inputField.addEventListener('keydown', async function(e) {
            if (e.key === 'Enter') {
                const command = inputField.value.trim().toLowerCase();
                               
                const echoLine = document.createElement('p');
                echoLine.innerHTML = `<span class="prompt">callum@portfolio:~$</span> ${command}`;
                outputArea.appendChild(echoLine);

                if (command === 'github') {
                    const loadingLine = document.createElement('p');
                    loadingLine.className = 'yellow';
                    loadingLine.innerText = 'Fetching live data from GitHub API...';
                    outputArea.appendChild(loadingLine);
                    terminalBody.scrollTop = terminalBody.scrollHeight;

                    try {
                    
                        const userRes = await fetch('https://api.github.com/users/callumpye05');
                        if (!userRes.ok) throw new Error('Network response was not ok');
                        const userData = await userRes.json();

                        const repoRes = await fetch('https://api.github.com/users/callumpye05/repos?sort=updated&per_page=2');
                        const repoData = await repoRes.json();
                        outputArea.removeChild(loadingLine);
                        let githubOutput = `
                            <br><span class="highlight">GitHub Profile:</span> ${userData.login}
                            <br><span class="highlight">Followers:</span> ${userData.followers} | <span class="highlight">Public Repos:</span> ${userData.public_repos}
                            <br><br><span class="highlight">Latest Activity:</span>
                        `;

                        repoData.forEach(repo => {
                            githubOutput += `<br> - <a href="${repo.html_url}" target="_blank" style="color: #008a6d; text-decoration: underline;">${repo.name}</a> (${repo.language || 'Mixed'})`;
                        });

                        githubOutput += `<br><br><a href="${userData.html_url}" target="_blank" style="color: #1a5bba; text-decoration: underline;">[View Full Profile]</a><br>`;

                        const resultLine = document.createElement('p');
                        resultLine.innerHTML = githubOutput;
                        outputArea.appendChild(resultLine);

                    } catch (error) {
                        outputArea.removeChild(loadingLine);
                        const errorLine = document.createElement('p');
                        errorLine.className = 'red';
                        errorLine.innerText = 'Error connecting to GitHub. Please try again later.';
                        outputArea.appendChild(errorLine);
                    }
                } 
                else if (command === 'sudo su' || command === 'sudo') {
                    
                    document.body.classList.toggle('hacker-mode');
                    const isHacked = document.body.classList.contains('hacker-mode');
                
                    if (isHacked) {
                        const hackLine = document.createElement('p');
                        hackLine.className = 'red';
                        hackLine.innerText = 'WARNING: ROOT ACCESS GRANTED. OVERRIDING PROTOCOLS...';
                        outputArea.appendChild(hackLine);
                        particlesArray.forEach(p => p.color = '#00ff41'); 
                    }   
                    else {
                        const restoreLine = document.createElement('p');
                        restoreLine.className = 'yellow';
                        restoreLine.innerText = 'System restored to normal parameters. Connection closed.';
                        outputArea.appendChild(restoreLine);
                        particlesArray.forEach(p => p.color = 'rgba(255, 255, 255, 0.7)'); 
                    }
                }
                else if (command === 'rm -rf /' || command === 'sudo rm -rf /') {
                    outputArea.innerHTML += `<p class="red">CRITICAL ALERT: CORE FILE SYSTEM DELETION INITIATED.</p>`;
                    outputArea.innerHTML += `<p class="red">GRAVITATIONAL SINGULARITY FORMING. EVACUATE IMMEDIATELY.</p>`;
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                    
                    setTimeout(() => {
                        document.body.classList.add('hacker-mode');
                        singularityActive = true;
                        const uiElements = document.querySelectorAll('nav, .section__pic-container, .section__text, .about-containers, .terminal-window, .marquee-wrapper, .project-deck-container, .contact-info-container, .title, .title_contact, .section__text__p1, .arrow');
                        let physicsDOM = [];
                        
                        uiElements.forEach(el => {
                            const rect = el.getBoundingClientRect();
                            el.style.position = 'fixed';
                            el.style.left = rect.left + 'px';
                            el.style.top = rect.top + 'px';
                            el.style.width = rect.width + 'px';
                            el.style.height = rect.height + 'px';
                            el.style.margin = '0';
                            el.style.transition = 'none'; 
                            el.style.zIndex = '9999';
                            
                            physicsDOM.push({element: el,x: rect.left,y: rect.top,vx: (Math.random() - 0.5) * 15, vy: (Math.random() - 0.5) * 15,angle: 0,scale: 1});
                        });
                        function ripWebsiteApart() {
                            requestAnimationFrame(ripWebsiteApart);
                            let remainingElements = 0;

                            physicsDOM.forEach(item => {
                                if (item.scale<= 0) return;
                                remainingElements++;

                                let dx = singularityX - (item.x +  item.element.offsetWidth / 2);
                                let dy =singularityY - (item.y +item.element.offsetHeight / 2);
                                let distance =Math.sqrt(dx * dx + dy * dy);
                                
                                let force = 20000 / (distance * distance +100);
                                item.vx += (dx / distance) * force;
                                item.vy += (dy /distance) * force;

                            
                                item.vx += (dy / distance) * force * 1.3; 
                                item.vy -= (dx/ distance) * force* 1.3;
                                
                                item.vx *= 0.95; 
                                item.vy *= 0.95;
                                
                                item.x +=item.vx;
                                item.y += item.vy;
                                item.angle +=(item.vx + item.vy) * 0.5; 
                                
                                if (distance < 200) item.scale *= 0.82;
                                if (distance < 50) item.scale = 0; 

                                
                                item.element.style.transform = `
                                    translate(${item.x - parseFloat(item.element.style.left)}px, 
                                              ${item.y - parseFloat(item.element.style.top)}px) 
                                    rotate(${item.angle}deg) 
                                    scale(${item.scale})
                                `;
                            });

                            if (remainingElements === 0 && singularityActive) {
                                singularityActive = false; // Stop loop
                                document.body.innerHTML = `<div style="height: 100vh; display:flex; align-items:center; justify-content:center; background: black; color: #00ff41; font-family: 'Courier New', monospace; font-size: 1.5rem;">System rebooting in 3...</div>`;
                                setTimeout(() => location.reload(), 3000);
                            }
                        }
                        
                    
                        ripWebsiteApart();

                    }, 2000); 
                }
                else if (command === 'clear') {
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


   const canvas = document.getElementById('network-canvas');
   const ctx = canvas.getContext('2d');
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   
   let particlesArray = [];
   let pulses = []; 
   const connectionDistance = 120; 
   
   let mouse = { x: null, y: null };
   window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
   window.addEventListener('mouseout', () => { mouse.x = undefined; mouse.y = undefined; });
   window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; init(); });
   
   class Particle {
       constructor(id, x, y, directionX, directionY, size, color) {
           this.id = id;
           this.x = x;
           this.y = y;
           this.directionX = directionX;
           this.directionY = directionY;
           this.size = size;
           this.baseColor = color;
           this.color = color;
           this.neighbors = []; 
       }
   
       draw() {
           ctx.beginPath();
           ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
           ctx.fillStyle = this.color;
           ctx.fill();
       }
   
       update() {
        if (!singularityActive) {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
            this.x += this.directionX;
            this.y += this.directionY;
        } 
        
        else {
                let dx = singularityX - this.x;
                let dy = singularityY - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
            
                let force = 8000 / (distance * distance + 50);
                this.directionX += (dx / distance) * force;
                this.directionY += (dy / distance) * force;
            
                this.directionX += (dy / distance) * force * 2.5; 
                this.directionY -= (dx / distance) * force * 2.5;
            
                
                this.directionX *= 0.96;
                this.directionY *= 0.96;
            
                this.x +=this.directionX;
                this.y += this.directionY;

                if (distance < blackHoleRadius) {
                    this.size = 0; 
                }
            }
        
            if (this.size > 0) this.draw();
        }
   }
   class Pulse {
       constructor(path) {
           this.path = path;
           this.currentNodeIndex = 0;
           this.progress = 0; 
           this.speed = 0.15; 
       }
   
       drawAndUpdate() {
           if (this.currentNodeIndex >= this.path.length - 1) return true; 
   
           const startNode = this.path[this.currentNodeIndex];
           const endNode = this.path[this.currentNodeIndex + 1];
   
           //linear interpolation
           const currentX= startNode.x +(endNode.x - startNode.x) * this.progress;
           const currentY = startNode.y + (endNode.y - startNode.y)* this.progress;
   
           
           ctx.shadowBlur = 20;
           const isHacked = document.body.classList.contains('hacker-mode');
           ctx.shadowColor = isHacked ? '#00ff41' : '#1a5bba';
           
           ctx.beginPath();
           ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
           ctx.fillStyle = isHacked ? '#00ff41' : '#ffffff';
           ctx.fill();
        
           ctx.beginPath();
           ctx.moveTo(startNode.x, startNode.y);
           ctx.lineTo(currentX, currentY);
           ctx.strokeStyle = isHacked ? '#00ff41' : '#1a5bba';
           ctx.lineWidth = 3;
           ctx.stroke();
           
           ctx.shadowBlur = 0; 
   
           this.progress += this.speed;
           if (this.progress >= 1) {
               this.progress = 0;
               this.currentNodeIndex++;
           }
           return false;
       }
   }
   
   function init() {
       particlesArray = [];
       pulses = [];
       let numberOfParticles = (canvas.height * canvas.width) / 10000;
       for (let i = 0; i < numberOfParticles; i++) {
           let size = (Math.random() * 2) + 1;
           let x = Math.random() * innerWidth;
           let y = Math.random() * innerHeight;
           let dirX = (Math.random() * 1.5) - 0.75;
           let dirY = (Math.random() * 1.5) - 0.75;
           let color = 'rgba(255, 255, 255, 0.5)';
           particlesArray.push(new Particle(i, x, y, dirX, dirY, size, color));
       }
   }
   function buildGraph() {
       for (let i = 0; i < particlesArray.length; i++) {
           particlesArray[i].neighbors = [];
       }
       for (let a = 0; a < particlesArray.length; a++) {
           for (let b = a + 1; b < particlesArray.length; b++) {
               let dx = particlesArray[a].x - particlesArray[b].x;
               let dy = particlesArray[a].y - particlesArray[b].y;
               let distance = Math.sqrt(dx * dx + dy * dy);
   
               if (distance < connectionDistance) {
                   particlesArray[a].neighbors.push({ node: particlesArray[b], weight: distance });
                   particlesArray[b].neighbors.push({ node: particlesArray[a], weight: distance });
                   
                   let opacityValue = 1 - (distance / connectionDistance);
                   const isHacked = document.body.classList.contains('hacker-mode');
                   ctx.strokeStyle = isHacked ? `rgba(0, 255, 65, ${opacityValue * 0.3})` : `rgba(255, 255, 255, ${opacityValue * 0.2})`;
                   ctx.lineWidth = 1;
                   ctx.beginPath();
                   ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                   ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                   ctx.stroke();
               }
           }
       }
   }
   
   
   function findShortestPath(startNode, endNode) {
       let distances = new Map();
       let previous = new Map();
       let unvisited = new Set(particlesArray);
       particlesArray.forEach(node =>distances.set(node, Infinity));
       distances.set(startNode, 0);
   
       while (unvisited.size > 0) {
           let currNode = null;
           let minDistance = Infinity;
           unvisited.forEach(node => {
               if (distances.get(node) < minDistance) {
                   minDistance = distances.get(node);
                   currNode = node;
               }
           });
           if (currNode === null || currNode === endNode) break;
           unvisited.delete(currNode);
   
           currNode.neighbors.forEach(neighborInfo => {
               let neighbor = neighborInfo.node;
               if (unvisited.has(neighbor)) {
                   let alt = distances.get(currNode) + neighborInfo.weight;
                   if (alt < distances.get(neighbor)) {
                       distances.set(neighbor, alt);
                       previous.set(neighbor,currNode);
                   }
               }
           });
       }
    
       let path =[];
       let curr = endNode;
       while (curr) {
           path.unshift(curr);
           curr = previous.get(curr);
       }
       return path.length > 1 &&path[0] === startNode ? path : []; 
   }
   window.addEventListener('click', (e) => {
       if (particlesArray.length === 0) return;
       let targetNode= particlesArray.reduce((prev, curr) => {
           let prevDist =Math.hypot(prev.x -e.clientX, prev.y -e.clientY);
           let currDist = Math.hypot(curr.x - e.clientX, curr.y - e.clientY);
           return (prevDist < currDist) ? prev : curr;
       });
   
      
       let centerX = canvas.width /2;
       let centerY =canvas.height / 2;
       let sourceNode = particlesArray.reduce((prev, curr) => {
           let prevDist =Math.hypot(prev.x -centerX, prev.y - centerY);
           let currDist = Math.hypot(curr.x - centerX, curr.y -centerY);
           return (prevDist < currDist) ? prev : curr;
       });
       let shortestPath =findShortestPath(sourceNode, targetNode);
       if (shortestPath.length > 0) {
           pulses.push(new Pulse(shortestPath));
           canvas.classList.add('pulse-active');
       }
   });
   
   function animate() {
       requestAnimationFrame(animate);
       ctx.clearRect(0, 0, innerWidth, innerHeight);
       //draw singulairty
        if (singularityActive) {
            if (blackHoleRadius < 50) blackHoleRadius += 2.5; //black hole growth
            
            ctx.beginPath();
            ctx.arc(singularityX, singularityY, blackHoleRadius, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.shadowBlur = 60;
            ctx.shadowColor = "#ff0000";
            ctx.fill();
            ctx.shadowBlur = 0;
        }
       
       
       for (let i = 0; i < particlesArray.length; i++) {
           particlesArray[i].update();
       }
       buildGraph();
   
       //udate and dra pulses
       for (let i = pulses.length - 1; i >= 0; i--) {
           let isFinished = pulses[i].drawAndUpdate();
           if (isFinished) {
               pulses.splice(i, 1);
               if (pulses.length === 0) canvas.classList.remove('pulse-active');
           }
       }
   }
   
   init();
   animate();

