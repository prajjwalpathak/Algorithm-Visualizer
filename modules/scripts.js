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

const DELAY = 500;
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
    changeBarColor(idx, color);
    setTimeout(() => {
        changeBarColor(idx, BLUE);
    }, DELAY);
}

const moveColorBar = (startIdx, endIdx, color) => {
    for (let idx = startIdx; idx <= endIdx; idx++) {
        setTimeout(() => {
            switchBackColor(idx, color);
        }, idx * DELAY);
    }
}

const swapBar = (firstBarIdx, secondBarIdx) => {
    setTimeout(() => {
        [barArray[firstBarIdx].h, barArray[secondBarIdx].h] = [barArray[secondBarIdx].h, barArray[firstBarIdx].h];
    }, DELAY);
}

// const findMin = (startIdx, endIdx) => {
//     let min = Number.MAX_SAFE_INTEGER;
//     let minIdx = 0;
//     for (let idx = startIdx; idx <= endIdx; idx++) {
//         console.log(idx);

//         setTimeout(() => {
//             if (-barArray[idx].h < min) {
//                 changeBarColor(minIdx, BLUE);
//                 min = -barArray[idx].h;
//                 minIdx = idx;
//                 changeBarColor(minIdx, RED);
//             }
//             else {
//                 switchBackColor(idx, RED);
//             }
//         }, idx * DELAY);
//     }
//     return minIdx;
// }

const findMinimum = (startIdx, endIdx) => {
    let min = Number.MAX_SAFE_INTEGER;
    let minIdx = 0;
    for (let idx = startIdx; idx <= endIdx; idx++) {
        if (min > -barArray[idx].h) {
            min = -barArray[idx].h;
            minIdx = idx;
        }
    }
    return minIdx;
}

async function selectionSort() {
    let minIdx = 0;
    for (let i = 0; i < FREQ - 1; i++) {
        await delay(DELAY);
        // findMin(i,FREQ-1);
        minIdx = findMinimum(i, FREQ - 1);
        findMin(i, FREQ - 1);
        swapBar(i, minIdx);
    }
}

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function findMin(startIdx, endIdx) {
    let min = Number.MAX_SAFE_INTEGER;
    let minIdx = 0;
    for (let idx = startIdx; idx <= endIdx; idx++) {

        await delay(DELAY);
        if (-barArray[idx].h < min) {
            changeBarColor(minIdx, BLUE);
            min = -barArray[idx].h;
            minIdx = idx;
            changeBarColor(minIdx, RED);
        }
        else {
            switchBackColor(idx, RED);
        }
    }
}

async function runWithDelay() {
    for (let i = 1; i <= 5; i++) {
        console.log(`Iteration ${i}`);
        await delay(i * 500); // delay 1 second between iterations
    }
    console.log("Done!");
}


const init = () => {
    setBarArray();
    // changeBarColor(0,RED);
    // moveColorBar(0,10,RED);
    // drawRectangle();
    // swapBar(0, 10);
    // findMin(0, FREQ - 1);
    selectionSort();
    // runWithDelay();
};

init();

// Animate function
const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBarArray();
};

animate();