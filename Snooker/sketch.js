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

let ball;
let balls = [];
let ballWidth;
let pocketSize;



function setup() {
    createCanvas(tableWidth,tableHeight);
    engine = Engine.create();
    
    rectMode(CENTER);

    ballWidth = tableWidth/36
    pocketSize = ballWidth*1.5;
    let verticesCushion = [
        { x: (tableWidth / 4) + (tableWidth/120), y: tableHeight+(tableHeight/15)},
        { x: (tableWidth *3/4) -(tableWidth/120), y: tableHeight+(tableHeight/15)},
        { x: tableWidth *3/4 - (tableWidth/24), y: tableHeight},
        { x: tableWidth / 4 + (tableWidth/24), y: tableHeight},
      ];

    ball = Matter.Bodies.circle(tableWidth/2,tableHeight/2, ballWidth/2, {restituton:0.5, friction: 0.01});
    cushion = Matter.Bodies.fromVertices(tableWidth * 1/4, tableHeight, verticesCushion, { isStatic: true });
    cushion2 = Matter.Bodies.fromVertices(tableWidth * 3/4, tableHeight, verticesCushion, { isStatic: true });
    cushion3 = Matter.Bodies.fromVertices(tableWidth * 1/4, 0, verticesCushion, { isStatic: true, angle: PI});
    cushion4 = Matter.Bodies.fromVertices(tableWidth * 3/4, 0, verticesCushion, { isStatic: true, angle: PI});
    cushion5 = Matter.Bodies.fromVertices(tableWidth, tableHeight/2, verticesCushion, { isStatic: true, angle: PI*1.5});
    cushion6 = Matter.Bodies.fromVertices(0, tableHeight/2, verticesCushion, { isStatic: true, angle: PI*0.5});
    Composite.add(engine.world, [cushion, cushion2, cushion3, cushion4, cushion5, cushion6, ball]);
    
    for (let i = 0; i < 7; i++) {
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
    
    noStroke()
    fill(50)
    drawVertices(cushion.vertices)
    drawVertices(cushion2.vertices)
    drawVertices(cushion3.vertices)
    drawVertices(cushion4.vertices)
    drawVertices(cushion5.vertices)
    drawVertices(cushion6.vertices)

    fill(200, 50, 50)
    stroke(50)
    drawVertices(ball.vertices);


    for (let i = 0; i < balls.length; i++) {
        drawVertices(balls[i].vertices)
    }
}

function generateBalls(x,y){

    let b = Bodies.circle(random(0,tableWidth), random(0,tableHeight), ballWidth/2, {restituton:0.5, friction: 0.01});
    balls.push(b)
    Composite.add(engine.world, [b]);
}


function drawVertices(vertices){
    beginShape();
    for (let i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE)
}