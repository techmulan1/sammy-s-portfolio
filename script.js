const train = document.querySelector('.bottom');
const videos = document.querySelectorAll('.bottom video');
const dots = document.querySelectorAll('.dot');

let currentIndex = 3; 
const totalOriginals = 7;

function updateCarousel(isInstant = false) {
    if (isInstant) {
        train.style.transition = 'none'; 
    } else {
        train.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
    }

    const offset = currentIndex * 33.33;
    train.style.transform = `translateX(-${offset}vw)`;

    videos.forEach((vid, index) => {
        vid.classList.toggle('active-video', index === currentIndex + 1);
    });

    const realIndex = currentIndex - 3;
    const dotIndex = Math.floor((realIndex / (totalOriginals - 1)) * 3);
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === dotIndex);
    });
}

function nextSlide() {
    currentIndex++;
    updateCarousel();

    if (currentIndex >= totalOriginals + 3) {
        setTimeout(() => {
            currentIndex = 3;
            updateCarousel(true);
        }, 600); 
    }
}

updateCarousel(true);

let scrollInterval = setInterval(nextSlide, 4000);

function resetTimer() {
    clearInterval(scrollInterval);
    scrollInterval = setInterval(nextSlide, 4000);
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        if (i === 0) currentIndex = 3;
        if (i === 1) currentIndex = 6;
        if (i === 2) currentIndex = 8;

        updateCarousel();
        resetTimer();
    });
});


// ERR... This is the styling for my light and dark mode kini kini

const toggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

function update3DColors(isDark) {
    if (typeof scene !== 'undefined') {
        const color = isDark ? 0x000000 : 0xffffff;
        scene.background = new THREE.Color(color);
        
        if (typeof ambientLight !== 'undefined') {
            ambientLight.intensity = isDark ? 0.8 : 1.5;
        }
    }
}

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    const isDark = document.body.classList.contains('dark-mode');
    
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    update3DColors(isDark);
    
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
        update3DColors(true);
    }
});