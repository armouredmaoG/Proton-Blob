import Proton from 'proton-engine';
import { useEffect } from 'react';
import './Particles.css';

const Particles = () => {
    const colors = {
        "base": "#f6f2ea",
        "green": "#dfe9d2",
        "yellow": "#fffce2",
        "orange": "#feefdd",
        "red": "#fcdee5",
        "pink": "#ffe8f0",
        "purple": "#f9e8ff",
        "blue": "#eff4f7",
        "light_brown": "#fbe8d8",
        "dark_brown": "#ebddc4",
        "black": "#ebe8e3"
    };

    const itemsLength = Object.keys(colors).length;

    function getRandomInt(itemsLength) {
        return Math.floor(Math.random() * itemsLength);
    }

    function updateBannerColor(canvasWrap) {
        let randomColorNum = getRandomInt(itemsLength);
        let randomColor = Object.values(colors)[randomColorNum];
        canvasWrap.style.backgroundColor = randomColor;
    }

    function tick() {
        requestAnimationFrame(tick);
        proton.update();
    }

    const emitter = new Proton.Emitter();
    const proton = new Proton();
    let timer;

    useEffect(() => {
        const canvasWrap = document.querySelector(".canvas-wrap");
        const canvas = document.getElementById("colorCanvas");

        function createImageEmitter() {
            emitter.rate = new Proton.Rate(new Proton.Span(0, 0), new Proton.Span(0.01, 0.015));
            emitter.addInitialize(new Proton.Mass(1));
            emitter.addInitialize(new Proton.Life(0.1, 1));
            emitter.addInitialize(new Proton.Body("./particle.png"));
            emitter.addInitialize(new Proton.Radius(7));
            emitter.addInitialize(new Proton.Velocity(new Proton.Span(0, 0), 500, "polar"));
            emitter.addBehaviour(new Proton.Alpha(1, 0));
            emitter.addBehaviour(new Proton.Color("#ffcc00", "#ffcc00"));
            emitter.addBehaviour(new Proton.Scale(0.4, 0.4));

            // Set the emitter's initial position to the center of the window
            emitter.p.x = window.innerWidth / 2;
            emitter.p.y = window.innerHeight / 2;

            emitter.emit();
            proton.addEmitter(emitter);
        }

        function createProton() {
            createImageEmitter();
            let renderer = new Proton.WebGLRenderer(canvas);
            renderer.blendFunc("ONE", "ONE");
            proton.addRenderer(renderer);
            tick();
        }

        createProton();

        const intervalId = setInterval(function () {
            updateBannerColor(canvasWrap);
        }, 4000);

        document.addEventListener("mousemove", function (e) {
            // Get the position of the canvasWrap relative to the page
            const rect = canvas.getBoundingClientRect();
            
            // Calculate the mouse position relative to the canvasWrap
            let emitterPosition = {
                x: e.clientX - rect.left, // Mouse X relative to canvasWrap
                y: e.clientY - rect.top   // Mouse Y relative to canvasWrap
            };

            // Update emitter position based on the mouse
            emitter.p.x = emitterPosition.x;
            emitter.p.y = emitterPosition.y;

            emitter.rate = new Proton.Rate(new Proton.Span(1, 3), new Proton.Span(0.01, 0.01));

            clearTimeout(timer);
            timer = setTimeout(() => {
                clearTimeout(timer);
                emitter.rate = new Proton.Rate(new Proton.Span(0, 0), new Proton.Span(0.01, 0.01));
            }, 60);
        });

        // Cleanup interval on component unmount to prevent memory leaks
        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className="canvas-wrap">
            <canvas id="colorCanvas"></canvas>
        </section>
    );
};

export default Particles;
