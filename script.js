// 1. Floating Sparkles/Particles Generation
const floatingContainer = document.getElementById('floating-squares');
const particleCount = 40;

function createParticle() {
  const particle = document.createElement('div');
  particle.classList.add('floating-square'); // Keeping class name for compatibility with CSS
  
  // Random Position & Animation
  const size = Math.random() * 8 + 4; // 4px to 12px
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  
  particle.style.left = Math.random() * 100 + 'vw';
  particle.style.top = Math.random() * 100 + 'vh';
  
  particle.style.animationDuration = (10 + Math.random() * 20) + 's';
  particle.style.animationDelay = (Math.random() * 5) + 's';
  
  floatingContainer.appendChild(particle);
}

for(let i=0; i<particleCount; i++) {
  createParticle();
}

// 2. Custom Cursor Sparkle Effect
const cursortrail = document.createElement('div');
cursortrail.id = 'cursor-trail';
document.body.appendChild(cursortrail);

// Style for sparkler managed here or in CSS (adding simple styles dynamically for portability)
const style = document.createElement('style');
style.innerHTML = `
  .sparkle {
    position: absolute;
    width: 6px;
    height: 6px;
    background: #ff9a9e;
    border-radius: 50%;
    pointer-events: none;
    animation: fadeOut 1s linear forwards;
    z-index: 9999;
  }
  @keyframes fadeOut {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(0); opacity: 0; }
  }
`;
document.head.appendChild(style);

document.addEventListener('mousemove', (e) => {
  if (Math.random() < 0.1) { // Create sparkle only sometimes to avoid clutter
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = `${e.pageX}px`;
    sparkle.style.top = `${e.pageY}px`;
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }
});

// 3. Scroll Animations (Intersection Observer)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Target all major sections and cards
const animatedElements = document.querySelectorAll('section, .project-card, .skill-card, .cert-card, .exp-card');
animatedElements.forEach(el => {
  // Initial State set via JS to avoid hiding content if JS fails
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
  observer.observe(el);
});

// 4. Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// 5. Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');
const projectImages = document.querySelectorAll('.project-image');

projectImages.forEach(img => {
  img.addEventListener('click', (e) => {
    // Prevent default anchor behavior if wrapped
    e.preventDefault();
    e.stopPropagation();
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('visible');
    lightbox.setAttribute('aria-hidden', 'false');
  });
  
  // Add cursor pointer to indicate clickability
  img.style.cursor = 'zoom-in';
});

// Close functionality
const closeLightbox = () => {
  lightbox.classList.remove('visible');
  lightbox.setAttribute('aria-hidden', 'true');
  setTimeout(() => {
    lightboxImg.src = ''; // Clear source after transition
  }, 300);
};

closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('visible')) {
    closeLightbox();
  }
});