// Three.js Setup for Background Particles
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Create Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const particlePositions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    particlePositions[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
const particlesMaterial = new THREE.PointsMaterial({
    color: 0x00ffcc,
    size: 0.1,
    transparent: true,
    opacity: 0.7,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Animation Loop for Particles
function animateParticles() {
    requestAnimationFrame(animateParticles);
    particles.rotation.y += 0.002;
    renderer.render(scene, camera);
}
animateParticles();

// Load Interactive Schemes
const diagramContainer = document.getElementById('diagram-container');
const schemes = [
    {
        src: 'images/scheme1.png',
        description: 'This scheme illustrates how photons interact with materials during light absorption.',
    },
    {
        src: 'images/scheme2.png',
        description: 'This scheme demonstrates energy conversion in materials when absorbing light.',
    },
    {
        src: 'images/scheme3.png',
        description: 'This scheme shows the dependence of light absorption on wavelength.',
    },
];

function loadSchemes() {
    schemes.forEach((scheme) => {
        const img = document.createElement('img');
        img.src = scheme.src;
        img.alt = scheme.description;
        img.classList.add('scheme-image');
        img.title = scheme.description;
        img.onclick = () => alert(scheme.description);
        diagramContainer.appendChild(img);
    });
}
loadSchemes();

// Quiz Questions
const quizQuestions = [
    {
        question: "Which of the following is a key concept of light absorption?",
        answers: ["Reflection", "Photons", "Refraction", "Transmission"],
        correct: 1,
    },
    {
        question: "What determines the energy of a photon?",
        answers: ["Its speed", "Its wavelength", "Its size", "Its temperature"],
        correct: 1,
    },
    // Add all remaining questions here
];
let currentQuestion = 0;

// Quiz Logic
function loadQuestion() {
    const questionEl = document.getElementById("question");
    const answersEl = document.getElementById("answers");
    const feedbackEl = document.getElementById("feedback");
    const nextBtn = document.getElementById("next-btn");

    const question = quizQuestions[currentQuestion];
    questionEl.textContent = question.question;
    answersEl.innerHTML = "";

    question.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.onclick = () => {
            if (index === question.correct) {
                feedbackEl.textContent = "Correct!";
                feedbackEl.style.color = "green";
            } else {
                feedbackEl.textContent = "Incorrect. Try Again!";
                feedbackEl.style.color = "red";
            }
        };
        answersEl.appendChild(btn);
    });

    nextBtn.onclick = () => {
        currentQuestion++;
        if (currentQuestion < quizQuestions.length) {
            loadQuestion();
        } else {
            questionEl.textContent = "Quiz Complete!";
            answersEl.innerHTML = "";
            feedbackEl.textContent = "";
            nextBtn.style.display = "none";
        }
    };
}
loadQuestion();

// Toggle Content Function for Interactive Sections
function toggleContent(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.toggle("hidden");
}