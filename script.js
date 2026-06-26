// Database Mock Engine for Character Profile Generation
const characterIntelligenceData = {
    kira: {
        name: "Light Yagami (Kira)",
        status: "DECEASED",
        desc: "An honors student who discovers the Death Note dropped by Shinigami Ryuk. Attempted to cleanse the world of criminals to rule as the 'God of the New World'. Mass executions executed entirely via induced cardiac arrest events."
    },
    l: {
        name: "L Lawliet (L)",
        status: "DECEASED",
        desc: "World's leading consulting detective. Orchestrated the global tracking operation against Kira. Highly eccentric individual possessing unmatched deductive logic and computational pattern analysis capabilities."
    },
    misa: {
        name: "Misa Amane",
        status: "UNKNOWN",
        desc: "A top-tier model who becomes the Second Kira. Possessed the Shinigami Eyes configuration, sacrificing half her remaining lifespan twice to support Light Yagami's structural operations."
    },
    ryuk: {
        name: "Ryuk",
        status: "IMMORTAL (SHINIGAMI)",
        desc: "A death god bored with the status quo of the Shinigami Realm. Purposely dropped his second documentation book into the human ecosystem to observe human behavior. Loves apples."
    }
};

// Architecture Control Hooks
let scene, camera, renderer, notebook, controls;
const introLayer = document.getElementById('intro-layer');
const databaseLayer = document.getElementById('database-layer');
const uiLayer = document.getElementById('ui-layer');
const dossierModal = document.getElementById('dossier-modal');

// --- STAGE FLOW LOGIC ---
document.getElementById('skip-intro-btn').addEventListener('click', () => {
    introLayer.classList.remove('active');
    databaseLayer.classList.add('active');
});

// Star Node Click Management (Updated to target .star-node)
document.querySelectorAll('.star-node').forEach(star => {
    star.addEventListener('click', () => {
        // Grab the character key from the star element
        const charKey = star.getAttribute('data-char');
        const data = characterIntelligenceData[charKey];
        
        // Safety check to ensure data exists for the clicked star
        if (data) {
            document.getElementById('modal-name').innerText = data.name;
            document.getElementById('modal-status-val').innerText = data.status;
            document.getElementById('modal-desc').innerText = data.desc;
            
            // Open the card modal
            dossierModal.classList.remove('modal-hidden');
        }
    });
});

// Close Modal Management
document.getElementById('close-modal-btn').addEventListener('click', () => {
    dossierModal.classList.add('modal-hidden');
});


// Proceed to 3D Space & Input Terminal
document.getElementById('proceed-to-note-btn').addEventListener('click', () => {
    databaseLayer.classList.remove('active');
    uiLayer.classList.add('active');
    triggerCinematicCameraIntro();
});

// --- THREE.JS GRAPHICS COMPONENT ---
function init3DSpace() {
    const canvas = document.getElementById('webgl-canvas');
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.12);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(20, 30, 45); // Set camera pulled back initially

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.04;
    controls.maxPolarAngle = Math.PI / 2 - 0.02;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.08);
    scene.add(ambientLight);

    const dramaticRedSpot = new THREE.SpotLight(0xff0033, 8, 50, Math.PI / 4, 0.4, 1);
    dramaticRedSpot.position.set(0, 18, 4);
    scene.add(dramaticRedSpot);

    buildProcedural3DNotebook();
    buildEnvironmentFloor();

    window.addEventListener('resize', onWindowResize);
    animateLoop();
}

function buildProcedural3DNotebook() {
    notebook = new THREE.Group();
    const coverMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0c, roughness: 0.85 });
    const pagesMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.95 });

    const frontCover = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.12, 10.2), coverMat);
    frontCover.position.set(3.6, 0.1, 0);
    notebook.add(frontCover);

    const backCover = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.12, 10.2), coverMat);
    backCover.position.set(3.6, -0.1, 0);
    notebook.add(backCover);

    const innerPages = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.18, 9.8), pagesMat);
    innerPages.position.set(3.6, 0, 0);
    notebook.add(innerPages);

    notebook.position.set(0, 0.5, 0);
    scene.add(notebook);
}

function buildEnvironmentFloor() {
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), new THREE.MeshStandardMaterial({ color: 0x030305 }));
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);
}

function triggerCinematicCameraIntro() {
    gsap.to(camera.position, { x: 0, y: 7, z: 11, duration: 4, ease: "power3.out" });
}

// --- TERMINAL EXECUTION LOGIC ---
const writeBtn = document.getElementById('write-btn');
const targetInput = document.getElementById('target-name');
const killOverlay = document.getElementById('kill-overlay');
const deathTimer = document.getElementById('death-timer');
const climaxLayer = document.getElementById('climax-layer');

writeBtn.addEventListener('click', () => {
    const name = targetInput.value.trim();
    if(name === "") return;

    // Fast camera dive into the notebook pages
    gsap.to(camera.position, {
        x: 0, y: 2.5, z: 3.5, duration: 1.2, ease: "power4.inOut",
        onComplete: () => {
            killOverlay.classList.add('active');
            runCountDownSequence();
        }
    });
});

function runCountDownSequence() {
    let count = 5; // Fast duration for testing showcase
    deathTimer.innerText = count;

    const interval = setInterval(() => {
        count--;
        deathTimer.innerText = count;

        if (count <= 0) {
            clearInterval(interval);
            triggerSupernaturalClimax();
        }
    }, 1000);
}

function triggerSupernaturalClimax() {
    killOverlay.classList.remove('active');
    climaxLayer.classList.add('active');

    // Extreme camera shake action
    const shakeTimeline = gsap.timeline({ repeat: 10 });
    shakeTimeline.to(camera.position, { x: "+=0.4", y: "-=0.3", duration: 0.05 })
                 .to(camera.position, { x: "-=0.4", y: "+=0.3", duration: 0.05 });

    setTimeout(() => {
        shakeTimeline.kill();
        climaxLayer.classList.remove('active');
        targetInput.value = "";
        triggerCinematicCameraIntro();
    }, 4500);
}

function animateLoop() {
    requestAnimationFrame(animateLoop);
    if(notebook) {
        notebook.position.y = 0.5 + Math.sin(Date.now() * 0.0015) * 0.08;
    }
    controls.update();
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init3DSpace();