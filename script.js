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

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    const isLight = document.body.classList.contains('light-mode');

    themeIcon.textContent = isLight ? '☀️' : '🌙';

    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
});




import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

function initStone(containerId, stoneColor, modelPath) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container #${containerId} not found!`);
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(stoneColor, 50);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    const loader = new GLTFLoader();
    let model;

    loader.load(modelPath, (gltf) => {
        model = gltf.scene;
        model.scale.set(3, 3, 3); 

        model.traverse((node) => {
            if (node.isMesh) {
                node.material = new THREE.MeshStandardMaterial({
                    color: stoneColor,
                    metalness: 1,
                    roughness: 0.1
                });
            }
        });
        scene.add(model);
        console.log(`Stone ${containerId} loaded!`);
    }, undefined, (err) => {
        console.warn(`Model failed for ${containerId}, using Octahedron.`);
        const geometry = new THREE.OctahedronGeometry(1.5, 0);
        const material = new THREE.MeshStandardMaterial({ color: stoneColor, metalness: 1 });
        model = new THREE.Mesh(geometry, material);
        scene.add(model);
    });

    const animate = () => {
        requestAnimationFrame(animate);
        if (model) {
            model.rotation.y += 0.01;
            model.position.y = Math.sin(Date.now() * 0.0015) * 0.2;
        }
        renderer.render(scene, camera);
    };
    animate();
}

window.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded, initializing stones...");

    initStone('container-premium', 0x00f2ff, './premium.glb');
    initStone('container-elite', 0xffd700, './premium.glb');
    initStone('container-advanced', 0xbc13fe, './premium.glb');
});



// This is the counting bar thing i'm styling

let count = 0;
let target = 100; 
let bar = document.getElementById('bar');
let percentText = document.getElementById('percent');

let interval = setInterval(function () {
    if (count >= target) {
        clearInterval(interval);
    } else {
        count++;
        bar.style.width = count + '%';
        percentText.innerText = count + '%'; 
    }
}, 20); 