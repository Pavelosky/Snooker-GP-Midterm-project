let Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Bodies = Matter.Bodies,
Composite = Matter.Composite;
Body = Matter.Body;
Constraint = Matter.Constraint;

let table;
// to change the size of the table change only tableHeight, rest is scaled to it.
let tableHeight = 400;
let tableWidth = tableHeight*2;

let ball;
let balls = [];
let cueBall;
let cueBallRadius;
let ballWidth;
let pocketSize;
let cue;
let cueLength;


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

    cueBall = Matter.Bodies.circle(tableWidth / 2, tableHeight / 2, cueBallRadius, { restitution: 0.5, friction: 0.01 });
    ball = Matter.Bodies.circle(tableWidth/2,tableHeight/2, ballWidth/2, {restitution:0.5, friction: 0.01});
    cue = Matter.Bodies.rectangle(cueBall.position.x - cueLength / 2 - 20, cueBall.position.y, cueLength, 5, { isStatic: true });

    cushion = Matter.Bodies.fromVertices(tableWidth * 1/4, tableHeight, verticesCushion, { isStatic: true,restitution: 0.5, friction: 0.01 });
    cushion2 = Matter.Bodies.fromVertices(tableWidth * 3/4, tableHeight, verticesCushion, { isStatic: true,restitution: 0.5, friction: 0.01 });
    cushion3 = Matter.Bodies.fromVertices(tableWidth * 1/4, 0, verticesCushion, { isStatic: true, angle: PI, restitution: 0.5, friction: 0.01});
    cushion4 = Matter.Bodies.fromVertices(tableWidth * 3/4, 0, verticesCushion, { isStatic: true, angle: PI, restitution: 0.5, friction: 0.01});
    cushion5 = Matter.Bodies.fromVertices(tableWidth, tableHeight/2, verticesCushion, { isStatic: true, angle: PI*1.5, restitution: 0.5, friction: 0.01});
    cushion6 = Matter.Bodies.fromVertices(0, tableHeight/2, verticesCushion, { isStatic: true, angle: PI*0.5, restitution: 0.5, friction: 0.01});
    Composite.add(engine.world, [cushion, cushion2, cushion3, cushion4, cushion5, cushion6, ball, cueBall]);
    
    for(let i = 0; i < 7; i++){
        generateBalls()
    }

}

function draw() {
    fill(44,130,87);

    Engine.update(engine)
    
    rect(tableWidth/2, tableHeight/2, tableWidth, tableHeight)
    stroke(255)
    line(tableWidth/5, 0, tableWidth/5, tableHeight)
    arc(tableWidth/5, tableHeight/2, tableHeight/3, tableHeight/3, PI*0.5, PI*1.5, CHORD)
    

    // Update cue ball position based on mouse
    // Body.setPosition(cueBall, { x: mouseX, y: mouseY });

    // draw white ball
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

    // draw balls
    for (let i = 0; i < balls.length; i++) {
        fill(200, 50, 50)
        stroke(1)
        drawVertices(balls[i].vertices)
    }

    // Draw cue
    fill(139, 69, 19); 
    let angle = atan2(mouseY - cueBall.position.y, mouseX - cueBall.position.x);
    Body.setPosition(cue, { x: cueBall.position.x - cueLength * cos(angle), y: cueBall.position.y - cueLength * sin(angle) });
    Body.setAngle(cue, angle);
    drawVertices(cue.vertices);
}

function generateBalls(x,y){

    let b = Bodies.circle(random(0,tableWidth), random(0,tableHeight), ballWidth/2, {restituton:0.01, friction: 0.1});
    balls.push(b)
    Composite.add(engine.world, [b]);
}

function mousePressed(){
    // Calculate the direction vector
    let direction = createVector(cueBall.position.x - cue.position.x, cueBall.position.y - cue.position.y);
    let velocityMagnitude = createVector(mouseX - cueBall.position.x, mouseY - cueBall.position.y).mag() / 10;
    
    // Normalize the direction vector
    direction.normalize();
    
    // Set the velocity of the cueBall
    Body.setVelocity(cueBall, { x: direction.x * velocityMagnitude/2, y: direction.y * velocityMagnitude/2 });
}


function drawVertices(vertices){
    beginShape();
    for (let i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE)
}