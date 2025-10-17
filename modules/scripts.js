import { getRandomArray } from "./utils.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

// Rectangle

class Bar {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;

        this.drawBar();
    }

    drawBar() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

const X = 100;
const Y = 350;
const W = 4;
const MIN = 10;
const MAX = 250;
const FREQ = 100;
const BLUE = "rgb(0, 82, 171)";
const RED = "rgba(171, 0, 0, 1)";
let barArray = [];

const setBarArray = () => {
    let h = getRandomArray(MIN, MAX, FREQ);
    for (let idx = 0; idx < FREQ; idx++) {
        let bar = new Bar(X + idx * 6, Y, W, -h[idx], BLUE);
        barArray.push(bar);
    }
}

const drawBarArray = () => {
    barArray.forEach(bar => {
        bar.drawBar();
    });
}

const changeBarColor = (idx, color) => {
    barArray[idx].color = color;
}

const switchBackColor = (idx, color) => {
    changeBarColor(0,color);
    setTimeout(()=>{
        changeBarColor(idx,BLUE);
    },1000);
}

const init = () => {
    setBarArray();
    // changeBarColor(0,RED);
    switchBackColor(0,RED);
    // drawRectangle();
};

init();

// Animate function
const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBarArray();
};

animate();