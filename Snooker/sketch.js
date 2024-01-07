let Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Bodies = Matter.Bodies,
Composite = Matter.Composite;
Body = Matter.Body;
Constraint = Matter.Constraint;

let table;
// to change the size of the table change only tableHeight, rest is scaled to it.
let tableHeight = 600;
let tableWidth = tableHeight*2;

let balls = [];
let cueBall;
let cueBallRadius;
let ballWidth;
let pocketSize;
let cue;
let cueLength;

let startScreen = true;
let selectedMode = "";

function setup() {
    createCanvas(tableWidth,tableHeight);
    engine = Engine.create();
    engine.gravity.y = 0;
    
    rectMode(CENTER);

    ballWidth = tableWidth/36;
    pocketSize = ballWidth*1.5;
    cueBallRadius = ballWidth / 2;
    cueLength = 100;

    let verticesCushion = [
        { x: (tableWidth / 4) + (tableWidth/120), y: tableHeight+(tableHeight/15)},
        { x: (tableWidth *3/4) -(tableWidth/120), y: tableHeight+(tableHeight/15)},
        { x: tableWidth *3/4 - (tableWidth/24), y: tableHeight},
        { x: tableWidth / 4 + (tableWidth/24), y: tableHeight},
      ];

    cueBall = Matter.Bodies.circle(tableWidth / 5, tableHeight / 2 -50, cueBallRadius, { restitution: 0.5, friction: 0.01 });

    cue = Matter.Bodies.rectangle(cueBall.position.x - cueLength / 2 - 20, cueBall.position.y, cueLength, 5, { isStatic: true });

    cushion = Matter.Bodies.fromVertices(tableWidth * 1/4, tableHeight, verticesCushion, { isStatic: true,restitution: 0.5, friction: 0.01 });
    cushion2 = Matter.Bodies.fromVertices(tableWidth * 3/4, tableHeight, verticesCushion, { isStatic: true,restitution: 0.5, friction: 0.01 });
    cushion3 = Matter.Bodies.fromVertices(tableWidth * 1/4, 0, verticesCushion, { isStatic: true, angle: PI, restitution: 0.5, friction: 0.01});
    cushion4 = Matter.Bodies.fromVertices(tableWidth * 3/4, 0, verticesCushion, { isStatic: true, angle: PI, restitution: 0.5, friction: 0.01});
    cushion5 = Matter.Bodies.fromVertices(tableWidth, tableHeight/2, verticesCushion, { isStatic: true, angle: PI*1.5, restitution: 0.5, friction: 0.01});
    cushion6 = Matter.Bodies.fromVertices(0, tableHeight/2, verticesCushion, { isStatic: true, angle: PI*0.5, restitution: 0.5, friction: 0.01});
    
    Composite.add(engine.world, [cushion, cushion2, cushion3, cushion4, cushion5, cushion6, cueBall]);

    // Special balls
    greenBall = new Ball(tableWidth/5, tableHeight/3, 'green', ballWidth);
    brownBall = new Ball(tableWidth/5, tableHeight/2, 'sienna', ballWidth);
    yellowBall = new Ball(tableWidth/5, tableHeight/3*2, 'yellow', ballWidth);
    pinkBall = new Ball(tableWidth/4*3, tableHeight/2, 'pink', ballWidth);
    blueBall = new Ball(tableWidth/2, tableHeight/2,'blue', ballWidth);
    
    greenBall.addToWorld(engine);
    brownBall.addToWorld(engine);
    yellowBall.addToWorld(engine);
    pinkBall.addToWorld(engine);
    blueBall.addToWorld(engine);
}

function draw() {
    if (startScreen) {
        drawStartScreen();
    } else {
        drawGame();
    }
}

function drawStartScreen() {
    background(0);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Select a mode:", width / 2, height / 2 - 50);
    textSize(24);
    text("1. Normal", width* 1/4, height / 2);
    text("2. Random", width* 3/4, height / 2);
}

function drawGame() {
    Engine.update(engine)
    
    // Draw table
    fill(44,130,87);
    rect(tableWidth/2, tableHeight/2, tableWidth, tableHeight)
    stroke(255)

    // Draw lines, arcs and dots
    line(tableWidth/5, 0, tableWidth/5, tableHeight)
    arc(tableWidth/5, tableHeight/2, tableHeight/3, tableHeight/3, PI*0.5, PI*1.5, CHORD)
    strokeWeight(5)
    point(tableWidth/5, tableHeight/2)
    point(tableWidth/2, tableHeight/2)
    point(tableWidth/4 *3, tableHeight/2)

    
    // Draw pockets
    noStroke()
    fill(0)
    ellipse(0, 0, pocketSize)
    ellipse(tableWidth, 0, pocketSize)
    ellipse(0, tableHeight, pocketSize)
    ellipse(tableWidth, tableHeight, pocketSize)
    ellipse(tableWidth/2, 0, pocketSize)
    ellipse(tableWidth/2, tableHeight, pocketSize)  

    // draw white ball
    strokeWeight(1)
    fill(255);
    stroke(50);
    drawVertices(cueBall.vertices);

    // draw cushions
    noStroke()
    fill(50)
    drawVertices(cushion.vertices)
    drawVertices(cushion2.vertices)
    drawVertices(cushion3.vertices)
    drawVertices(cushion4.vertices)
    drawVertices(cushion5.vertices)
    drawVertices(cushion6.vertices)

    // draw red balls
    stroke(1)
    for (let i = 0; i < balls.length; i++) {
        fill(200, 50, 50)
        drawVertices(balls[i].vertices)
    }

    //draw special balls - colored
    drawVertices(greenBall.body.vertices, greenBall.color)
    drawVertices(brownBall.body.vertices, brownBall.color)
    drawVertices(yellowBall.body.vertices, yellowBall.color)
    drawVertices(pinkBall.body.vertices, pinkBall.color)
    drawVertices(blueBall.body.vertices, blueBall.color)

    // Draw cue
    fill(139, 69, 19); 
    let angle = atan2(mouseY - cueBall.position.y, mouseX - cueBall.position.x);
    Body.setPosition(cue, { x: cueBall.position.x - cueLength * cos(angle) *-1, y: cueBall.position.y - cueLength * sin(angle)* -1 });
    Body.setAngle(cue, angle);
    drawVertices(cue.vertices);

    // Draw direction vector
    stroke(255, 255, 255);
    strokeWeight(3);
    line(cueBall.position.x, cueBall.position.y, cueBall.position.x - (mouseX - cueBall.position.x)*5, cueBall.position.y - (mouseY - cueBall.position.y)*5);

    strokeWeight(1)

    for (let i = balls.length - 1; i >= 0; i--) {
        let ball = balls[i];
    
        // Check if the ball is in a pocket
        if (isInPocket(ball)) {
            // Remove the ball from the array
            balls.splice(i, 1);
            // Remove the ball from the physics engine world
            Composite.remove(engine.world, ball);
        }
    }
}

function mousePressed(){
    if (startScreen) {
        if (mouseX < width / 2) {
            selectedMode = "Normal";
            startScreen = false;
            generateBalls(25 + tableWidth* 3/4 + ballWidth, tableHeight/2)
            //   Second row of balls
            generateBalls(25 + tableWidth* 3/4 + ballWidth*2, tableHeight/2- ballWidth/2)
            generateBalls(25 + tableWidth* 3/4 + ballWidth*2, tableHeight/2+ ballWidth/2)
            //   Third row of balls
            generateBalls(25 + tableWidth* 3/4 + ballWidth*3, tableHeight/2- ballWidth)
            generateBalls(25 + tableWidth* 3/4 + ballWidth*3, tableHeight/2)
            generateBalls(25 + tableWidth* 3/4 + ballWidth*3, tableHeight/2+ ballWidth)
            //   Fourth row of balls
            generateBalls(25 + tableWidth* 3/4 + ballWidth*4, tableHeight/2- ballWidth/2)
            generateBalls(25 + tableWidth* 3/4 + ballWidth*4, tableHeight/2+ ballWidth/2)
            generateBalls(25 + tableWidth* 3/4 + ballWidth*4, tableHeight/2- ballWidth*1.5)
            generateBalls(25 + tableWidth* 3/4 + ballWidth*4, tableHeight/2+ ballWidth*1.5)
            //   Fifth row of balls 
            generateBalls(25 + tableWidth* 3/4 + ballWidth*5, tableHeight/2- ballWidth)
            generateBalls(25 + tableWidth* 3/4 + ballWidth*5, tableHeight/2+ ballWidth)
            generateBalls(25 + tableWidth* 3/4 + ballWidth*5, tableHeight/2)
            generateBalls(25 + tableWidth* 3/4 + ballWidth*5, tableHeight/2- ballWidth*2)
            generateBalls(25 + tableWidth* 3/4 + ballWidth*5, tableHeight/2+ ballWidth*2)
        }
    else if (mouseX > width / 2) {
        selectedMode = "Random";
        startScreen = false;
        for(let i = 0; i < 15; i++){
            generateBalls(random(0, width), random(0, height))
        }
    } 
    } else {
        // Check if the cueBall is not moving before making new shot
        if (cueBall.velocity.x < 0.01 && cueBall.velocity.y < 0.01) {
            // Calculate the direction and magnitude of the velocity
            let direction = createVector(cueBall.position.x - cue.position.x, cueBall.position.y - cue.position.y);
            let velocityMagnitude = createVector(mouseX - cueBall.position.x, mouseY - cueBall.position.y).mag() / 5;
            
            direction.normalize();
            
            // Set the velocity of the cueBall
            Body.setVelocity(cueBall, { x: direction.x * velocityMagnitude/2, y: direction.y * velocityMagnitude/2 });
        }
    }
}

// Ball class
class Ball {
    constructor(x, y, color, width) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.body = Bodies.circle(this.x, this.y, this.width/2, {restitution:0.5, friction: 0.01});
    }

    addToWorld(engine) {
        Composite.add(engine.world, [this.body]);
    }
}


function generateBalls(x,y){
    let b = Bodies.circle(x, y, ballWidth/2, {restitution:0.5, friction: 0.01});
    balls.push(b)
    Composite.add(engine.world, [b]);
}

function isInPocket(ball) {
    // Assuming the pockets are represented as an array of pocket objects with x and y coordinates
    const pockets = [
        { x: 0, y: 0 },
        { x: tableWidth, y: 0 },
        { x: 0, y: tableHeight },
        { x: tableWidth, y: tableHeight },
        { x: tableWidth/2, y: 0 },
        { x: tableWidth/2, y: tableHeight }
    ];

    // Check if the ball's position is within the radius of any pocket
    for (let i = 0; i < pockets.length; i++) {
        const pocket = pockets[i];
        const distance = dist(ball.position.x, ball.position.y, pocket.x, pocket.y);
        if (distance < ballWidth / 2) {
            return true;
        }
    }

    return false;
}

function drawVertices(vertices, color){ 
    if(color){
        fill(color)
    }
    beginShape();
    for (let i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE)
}