const measure = {
    displayEl: undefined,
    styleEl: undefined,
    measuring: false,
    p1: undefined,
    p2: undefined,
    pointStart: {
        x: 0,
        y: 0,
    },
    pointEnd: {
        x: 0,
        y: 0,
    },
    diff(end, start) {
        return end - start;
    },
    mouseMoveHandlerMeasure(e) {
        if (this.measuring && !this.pointStart.x && !this.pointStart.y) {
            this.pointStart = {
                x: e.x,
                y: e.y,
            };
        }
        if (this.measuring) {
            this.pointEnd = {
                x: e.x,
                y: e.y,
            };
        }
        this.p1.innerText = `x: ${this.diff(
            this.pointEnd.x,
            this.pointStart.x
        )}px`;
        this.p2.innerText = `y: ${this.diff(
            this.pointEnd.y,
            this.pointStart.y
        )}px`;
    },
    keyDownHandlerMeasure(e) {
        if (e.key === "m") {
            this.measuring = !this.measuring;
            if (this.measuring) {
                this.pointStart = {
                    x: 0,
                    y: 0,
                };
            }
        }
    },
    mouseMoveListener: undefined,
    keyDownListener: undefined,
    init() {
        this.displayEl = document.createElement("div");
        this.displayEl.className = "measure-function-display";
        document.body.appendChild(this.displayEl);

        const h4 = document.createElement("h4");
        this.p1 = document.createElement("p");
        this.p2 = document.createElement("p");
        h4.innerText = "Press 'm' to measure";
        this.p1.innerText = `x: 0px`;
        this.p2.innerText = `y: 0px`;
        this.displayEl.appendChild(h4);
        this.displayEl.appendChild(this.p1);
        this.displayEl.appendChild(this.p2);

        this.mouseMoveListener = this.mouseMoveHandlerMeasure.bind(this);
        this.keyDownListener = this.keyDownHandlerMeasure.bind(this);

        window.addEventListener("mousemove", this.mouseMoveListener);
        window.addEventListener("keydown", this.keyDownListener);

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

        this.styleEl = document.createElement("style");
        this.styleEl.textContent = style;
        document.head.appendChild(this.styleEl);
    },
    remove() {
        window.removeEventListener("mousemove", this.mouseMoveListener);
        window.removeEventListener("keydown", this.keyDownListener);
        this.styleEl.remove();
        this.displayEl.remove();
    },
};
