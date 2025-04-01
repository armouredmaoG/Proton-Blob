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

    const proton = new Proton();
    let timer, emitter;

    useEffect(() => {

        const canvasWrap = document.querySelector(".canvas-wrap");
        const canvas = document.getElementById("colorCanvas");
        
        function updateBannerColor() {
            let randomColorNum = getRandomInt(itemsLength);
            let randomColor = Object.values(colors)[randomColorNum];
            canvasWrap.style.backgroundColor = randomColor;
        }

        function createImageEmitter() {
            emitter = new Proton.Emitter();
            emitter.rate = new Proton.Rate(new Proton.Span(0, 0), new Proton.Span(0.01, 0.015));
            emitter.addInitialize(new Proton.Mass(1));
            emitter.addInitialize(new Proton.Life(0.1, 1));
            emitter.addInitialize(new Proton.Body("./particle.png"));
            // emitter.addInitialize(new Proton.Radius(7));
            // emitter.addInitialize(new Proton.Velocity(new Proton.Span(0, 0), 500, "polar"));
            emitter.addBehaviour(new Proton.Alpha(0.8, 0));
            emitter.addBehaviour(new Proton.Color("#ffcc00", "#ffcc00"));
            emitter.addBehaviour(new Proton.Scale(4, 4));
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
        function tick() {
            requestAnimationFrame(tick);
            proton.update();
          }

        if (canvasWrap) {
            canvas.width = canvasWrap.offsetWidth;
            canvas.height = canvasWrap.offsetHeight;
            updateBannerColor();
          
            setInterval(function () {
              updateBannerColor();
            }, 1500);
            createProton();
            tick();

            canvasWrap.addEventListener("mousemove", function (e) {
                const canvasRect = canvas.getBoundingClientRect();
    
                emitter.p.x = e.pageX - canvasRect.left;
                emitter.p.y = e.pageY - canvasRect.top;
            
                emitter.rate = new Proton.Rate(new Proton.Span(1, 3), new Proton.Span(0.01, 0.01));
            
                clearTimeout(timer);
                timer = setTimeout(() => {
                    clearTimeout(timer);
                    emitter.rate = new Proton.Rate(new Proton.Span(0, 0), new Proton.Span(0.01, 0.01));
                }, 100);
            });
        }
    }, []);

    return (
        <section className="canvas-wrap">
            <canvas id="colorCanvas"></canvas>
            <div className="content-wrap">
                <h1>Let the Color be your Guide</h1>
                <p>(Mouse your mouse around :D)</p>
            </div>
            
        </section>
    );
};

export default Particles;
