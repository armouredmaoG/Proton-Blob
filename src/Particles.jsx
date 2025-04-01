import Proton, { Emitter, Span, WebGLRenderer, Rate, Body, Velocity, Alpha, Color, Scale } from 'proton-engine';
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
    }

    const itemsLength = Object.keys(colors).length;

    function getRandomInt(itemsLength) {
        return Math.floor(Math.random() * itemsLength);
    }

    function updateBannerColor(canvasWrap) {
        let randomColorNum = getRandomInt(itemsLength);
        let randomColor = Object.values(colors)[randomColorNum];
        canvasWrap.style.backgroundColor = randomColor;
    }

    const emitter = new Emitter();
    const proton = new Proton();

    function createImageEmitter() {
        emitter.rate = new Rate(new Span(0, 0), new Proton.Span(0.01, 0.015));
        emitter.addInitialize(new Proton.Mass(1));
        emitter.addInitialize(new Proton.Life(0.1, 1));
        emitter.addInitialize(
            new Body("https://cdn.prod.website-files.com/67e3a3ec16164f290fb54343/67e3b0ee39871315ac536d66_particle.png")
        );
        emitter.addInitialize(new Proton.Radius(7));
        emitter.addInitialize(new Proton.Velocity(new Proton.Span(0, 0), 500, "polar"));
        emitter.addBehaviour(new Alpha(1, 0));
        emitter.addBehaviour(new Color("#ffcc00", "#ffcc00"));
        emitter.addBehaviour(new Scale(4, 4));

        // Set the emitter's position to the center of the window
        emitter.p.x = window.innerWidth / 2;
        emitter.p.y = window.innerHeight / 2;

        emitter.emit();
        proton.addEmitter(emitter);
    }

    let timer;
    document.addEventListener("mousemove", function (e) {
        let emitterPosition;
        emitterPosition = {
            x: e.pageX,
            y: e.pageY
        };

        emitter.p.x = emitterPosition.x;
        emitter.p.y = emitterPosition.y;
        emitter.rate = new Proton.Rate(new Proton.Span(1, 3), new Proton.Span(0.01, 0.01));

        clearTimeout(timer);
        timer = setTimeout(() => {
            clearTimeout(timer);
            emitter.rate = new Proton.Rate(new Proton.Span(0, 0), new Proton.Span(0.01, 0.01));
        }, 60);
    });

    useEffect(() => {
        const canvasWrap = document.querySelector(".canvas-wrap");
        const canvas = document.getElementById("colorCanvas");

        createImageEmitter();

        // add canvas renderer
        const renderer = new WebGLRenderer(canvas);
        renderer.blendFunc("ONE", "ONE");
        updateBannerColor(canvasWrap);

        proton.addRenderer(renderer);

        const intervalId = setInterval(function () {
            updateBannerColor(canvasWrap);
        }, 4000);

        // Cleanup interval on component unmount to prevent memory leaks
        return () => clearInterval(intervalId);
    });

    return (
        <section className="canvas-wrap">
            <canvas id="colorCanvas"></canvas>
        </section>
    );
};

export default Particles;
