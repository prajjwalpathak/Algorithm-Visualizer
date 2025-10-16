import { getRandomArray } from "./utils.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

// Rectangle

const drawRectangle = () => {
    ctx.fillStyle = "rgb(0, 82, 171)";
    let x = 100;
    let y = 350;
    let w = 4;
    const MIN = 10;
    const MAX = 250;
    const FREQ = 100;

    let h = getRandomArray(MIN, MAX, FREQ);
    for (let idx = 0; idx < FREQ; idx++) {
        ctx.fillRect(x + idx * 6, y, w, -h[idx]);
    }
}


const init = () => {
    // Your code
    drawRectangle();
};

init();

// Animate function
const animate = () => {
    requestAnimationFrame(animate);
    // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // Your code
};

animate();