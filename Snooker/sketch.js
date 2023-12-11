let ball;
let balls = [];
let ballWidth;
let pocketSize;
let table;

function setup() {
    createCanvas(920, 470);
    background(200);
    fill(44,130,87);
    rectMode(CENTER);

    ballWidth = 25;
    pocketSize = ballWidth*1.5;

}

function draw() {
    table = rect(width/2, height/2, width -20, height-20);
}
