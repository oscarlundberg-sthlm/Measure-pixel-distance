let pointStart = (pointEnd = {
    x: 0,
    y: 0,
});
let measuring = false;

const diff = (end, start) => end - start;

const displayEl = document.createElement("div");
displayEl.className = "measure-function-display";
document.body.appendChild(displayEl);

const h4 = document.createElement("h4");
const p1 = document.createElement("p");
const p2 = document.createElement("p");
h4.innerText = "Press 'm' to measure";
p1.innerText = `x: 0px`;
p2.innerText = `y: 0px`;
displayEl.appendChild(h4);
displayEl.appendChild(p1);
displayEl.appendChild(p2);

const mouseMoveHandler = (e) => {
    if (measuring && !pointStart.x && !pointStart.y) {
        pointStart = {
            x: e.x,
            y: e.y,
        };
    }
    if (measuring) {
        pointEnd = {
            x: e.x,
            y: e.y,
        };
    }
    p1.innerText = `x: ${diff(pointEnd.x, pointStart.x)}px`;
    p2.innerText = `y: ${diff(pointEnd.y, pointStart.y)}px`;
};

const keyDownHandler = (e) => {
    if (e.key === "m") {
        measuring = !measuring;
        if (measuring) {
            pointStart = {
                x: 0,
                y: 0,
            };
        }
    }
};

window.addEventListener("mousemove", mouseMoveHandler);
window.addEventListener("keydown", keyDownHandler);

const style = `
    body {
        cursor: crosshair;
    }
    .measure-function-display {
        border-style: solid;
        border-color: #888;
        border-top-width: 4px;
        border-right-width: 0px;
        border-bottom-width: 4px;
        border-left-width: 4px;
        background: #202020;
        padding: 8px 14px;
        position: fixed;
        z-index: 1000000;
        bottom: 24px;
        right: 0px;
    }
    .measure-function-display > * {
        all: initial;
        display: block;
        font-family: sans-serif;
        font-size: 14px;
        color: #DDDDDD;
    }
    .measure-function-display > h4 {
        margin-bottom: .4em;
    }
    .measure-function-display > p {
        font-weight: 200;
    }
`;

const styleEl = document.createElement("style");
styleEl.textContent = style;
document.head.appendChild(styleEl);
