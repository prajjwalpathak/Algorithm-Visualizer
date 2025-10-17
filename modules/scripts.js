import { getRandomArray } from "./utils.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

// Bar Class
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

const DELAY = 20;
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

// Initialize barArray
const setBarArray = () => {
    let h = getRandomArray(MIN, MAX, FREQ);
    for (let idx = 0; idx < FREQ; idx++) {
        let bar = new Bar(X + idx * (W + GAP), Y, W, -h[idx], BLUE);
        barArray.push(bar);
    }
}

// Draw barArray
const drawBarArray = () => {
    barArray.forEach(bar => {
        bar.drawBar();
    });
}

// Change bar color
const changeBarColor = (idx, color) => {
    barArray[idx].color = color;
}

// Switch bar color
async function switchBackColor(idx, color) {
    changeBarColor(idx, color);
    await delay(DELAY);
    changeBarColor(idx, BLUE);
}

// Move bar color from start index to end index
const moveColorBar = (startIdx, endIdx, color) => {
    for (let idx = startIdx; idx <= endIdx; idx++) {
        setTimeout(() => {
            switchBackColor(idx, color);
        }, idx * DELAY);
    }
}

// Swap bar values
async function swapBar(firstBarIdx, secondBarIdx) {
    await delay(DELAY);
    [barArray[firstBarIdx].h, barArray[secondBarIdx].h] = [barArray[secondBarIdx].h, barArray[firstBarIdx].h];
}

// Find Minimum
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

// Clear red bars (bruteforce fix)
const clearRed = (startIdx, endIdx) => {
    for (let i = startIdx; i <= endIdx; i++) {
        changeBarColor(i, BLUE);
    }
}

// Add delay
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Selection Sort
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

// Insertion Sort
async function insertionSort() {
    const n = FREQ;

    for (let i = 1; i < n; i++) {
        // clearRed(i, n - 1);
        // let currIdx = i;
        // changeBarColor(currIdx, RED);

        // Step 1: Find if curr element at correct place
        // for (let j = i + 1; j < n; j++) {
        //     changeBarColor(j, RED);
        //     await delay(DELAY);

        //     if (-barArray[j].h < -barArray[minIdx].h) {
        //         changeBarColor(minIdx, BLUE);
        //         minIdx = j;
        //         changeBarColor(minIdx, RED);
        //     } else {
        //         changeBarColor(j, BLUE);
        //     }
        // }
        changeBarColor(0, GREEN);
        await delay(DELAY);
        // for (let j = i; j > 0; j--) {
        //     changeBarColor(j, RED);
        //     await delay(DELAY);
        //     if (-barArray[j].h < -barArray[j - 1].h) {
        //         changeBarColor(j, RED);
        //         [barArray[j].h, barArray[j - 1].h] = [barArray[j - 1].h, barArray[j].h];
        //         changeBarColor(j, GREEN);
        //     }
        //     else {
        //         changeBarColor(j, GREEN);
        //     }
        // }
        changeBarColor(0, GREEN);
        let j = i;
        changeBarColor(j, RED);
        await delay(DELAY);
        while (j > 0 && -barArray[j].h < -barArray[j - 1].h) {
            await delay(DELAY);
            [barArray[j].h, barArray[j - 1].h] = [barArray[j - 1].h, barArray[j].h];
            [barArray[j].color, barArray[j - 1].color] = [barArray[j - 1].color, barArray[j].color];
            j--;
        }
        changeBarColor(j, GREEN);

        // Step 2: Swap with first unsorted
        // if (minIdx !== i) {
        //     await delay(DELAY);
        //     [barArray[i].h, barArray[minIdx].h] = [barArray[minIdx].h, barArray[i].h];
        // }

        // Step 3: Mark as sorted
        // changeBarColor(i, GREEN);
        // drawBarArray();
    }

    // Mark last bar as sorted

    console.log("Insertion Sort Complete");
}

const init = () => {
    setBarArray();
    // changeBarColor(0,RED);
    // moveColorBar(0,10,RED);
    // drawRectangle();
    // swapBar(0, 10);
    // findMin(0, FREQ - 1);
    // selectionSort();
    insertionSort();
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