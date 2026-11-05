let racerXs = [30, 30, 30];
let startY = 50;
let yStep = 60;
let finishX = 560;

function setup() {
    createCanvas(600, startY + yStep * racerXs.length);
}
function makeCanvasLonger() {
    resizeCanvas(600, startY + yStep * racerXs.length);
}

function draw() {
    background(240);
    line(finishX, 0, finishX, height);
    for (let i = 0; i < racerXs.length; i++) {
        let y = startY + yStep * i;
        if (racerXs[i] < finishX) {
            racerXs[i] += random(1, 3);
        }
        circle(racerXs[i], y, 24);

    }

    let max = 0;
    for (let i = 0; i < racerXs.length; i++) {
        if (racerXs[i] > racerXs[max]) {
            max = i;
        }
    }
    if (racerXs.some(x => x >= finishX)) {
        fill("red");
        textSize(24);
        text(max, 40, 30);
    }
}


function keyPressed() {
    if (key === "r") {
        location.reload();
    }

    if (keyIsDown(UP_ARROW)) {
        racerXs.push(40);
        makeCanvasLonger();

    }

    if (keyIsDown(DOWN_ARROW)) {
        racerXs.pop();
        makeCanvasLonger();
    }

    if (key === "1") {
        racerXs[0] += 20;
    }

    if (key === "2") {
        racerXs[1] += 20;
    }

    if (key === "3") {
        racerXs[2] += 20;
    }

}
