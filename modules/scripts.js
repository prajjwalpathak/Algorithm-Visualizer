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

const DELAY = 10;
const FREQ = 50;
const GAP = 2;
const X = 100;
const Y = 350;
const W = (600 - (FREQ * GAP)) / FREQ;
const MIN = 10;
const MAX = 250;

const BLUE = "rgb(0, 82, 171)";
const RED = "rgba(171, 0, 0, 1)";
const GREEN = "rgba(100, 171, 0, 1)";
let barArray = [];

const setBarArray = () => {
    let h = getRandomArray(MIN, MAX, FREQ);
    for (let idx = 0; idx < FREQ; idx++) {
        let bar = new Bar(X + idx * (W + GAP), Y, W, -h[idx], BLUE);
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

async function switchBackColor(idx, color) {
    changeBarColor(idx, color);
    await delay(DELAY);
    changeBarColor(idx, BLUE);
}

const moveColorBar = (startIdx, endIdx, color) => {
    for (let idx = startIdx; idx <= endIdx; idx++) {
        setTimeout(() => {
            switchBackColor(idx, color);
        }, idx * DELAY);
    }
}

async function swapBar(firstBarIdx, secondBarIdx) {
    await delay(DELAY);
    [barArray[firstBarIdx].h, barArray[secondBarIdx].h] = [barArray[secondBarIdx].h, barArray[firstBarIdx].h];
}

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

// function* selectionSortGenerator(startIdx, endIdx) {
//     let minIdx = findMinimum(startIdx, endIdx);
//     yield 1
//     findMin(startIdx, endIdx);
//     yield 2
//     swapBar(startIdx, minIdx);
//     yield 3
// }

// const ss = () => {
//     let i = 0;
//     let ssInterval = setInterval(() => {
//         let genObj = selectionSortGenerator(i, FREQ - 1);
//         genObj.next();
//         genObj.next();
//         setTimeout(() => {
//             genObj.next();
//         }, (FREQ - i) * DELAY);

//         i++;
//         if (i == FREQ - 1) {
//             clearInterval(ssInterval);
//             console.log("SS complete");
//         };
//     }, (FREQ - i) * DELAY);
// }



// async function findMin(startIdx, endIdx) {
//     let min = Number.MAX_SAFE_INTEGER;
//     let minIdx = 0;
//     for (let idx = startIdx; idx <= endIdx; idx++) {
//         await delay(DELAY);
//         if (-barArray[idx].h < min) {
//             changeBarColor(minIdx, BLUE);
//             min = -barArray[idx].h;
//             minIdx = idx;
//             changeBarColor(minIdx, RED);
//         }
//         else {
//             switchBackColor(idx, RED);
//         }
//     }
// }

const clearRed = (startIdx, endIdx) => {
    for (let i = startIdx; i <= endIdx; i++) {
        changeBarColor(i, BLUE);
    }
}

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function selectionSort() {
    const n = FREQ;

    for (let i = 0; i < n - 1; i++) {
        clearRed(i, n - 1);
        let minIdx = i;
        changeBarColor(i, RED);

        // Step 1: Find smallest element
        for (let j = i + 1; j < n; j++) {
            changeBarColor(j, RED);
            await delay(DELAY);

            if (-barArray[j].h < -barArray[minIdx].h) {
                changeBarColor(minIdx, BLUE);
                minIdx = j;
                changeBarColor(minIdx, RED);
            } else {
                changeBarColor(j, BLUE);
            }
        }

        // Step 2: Swap with first unsorted
        if (minIdx !== i) {
            await delay(DELAY);
            [barArray[i].h, barArray[minIdx].h] = [barArray[minIdx].h, barArray[i].h];
        }

        // Step 3: Mark as sorted
        changeBarColor(i, GREEN);
        drawBarArray();
    }

    // Mark last bar as sorted
    changeBarColor(n - 1, GREEN);
    console.log("Selection Sort Complete");
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
    // const genObj = valueGenerator();
    // console.log(genObj.next());
    // console.log(genObj.next());
    // setTimeout(() => {
    //     console.log(genObj.next());
    // }, FREQ * DELAY);
    // ss();
};

init();

// Animate function
const animate = () => {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBarArray();
};

animate();