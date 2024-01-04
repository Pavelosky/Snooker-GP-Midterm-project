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
    
    // This ball is now also removed from the world
    // ball = Matter.Bodies.circle(tableWidth/2,tableHeight/2, ballWidth/2, {restitution:0.5, friction: 0.01});

    cue = Matter.Bodies.rectangle(cueBall.position.x - cueLength / 2 - 20, cueBall.position.y, cueLength, 5, { isStatic: true });

    cushion = Matter.Bodies.fromVertices(tableWidth * 1/4, tableHeight, verticesCushion, { isStatic: true,restitution: 0.5, friction: 0.01 });
    cushion2 = Matter.Bodies.fromVertices(tableWidth * 3/4, tableHeight, verticesCushion, { isStatic: true,restitution: 0.5, friction: 0.01 });
    cushion3 = Matter.Bodies.fromVertices(tableWidth * 1/4, 0, verticesCushion, { isStatic: true, angle: PI, restitution: 0.5, friction: 0.01});
    cushion4 = Matter.Bodies.fromVertices(tableWidth * 3/4, 0, verticesCushion, { isStatic: true, angle: PI, restitution: 0.5, friction: 0.01});
    cushion5 = Matter.Bodies.fromVertices(tableWidth, tableHeight/2, verticesCushion, { isStatic: true, angle: PI*1.5, restitution: 0.5, friction: 0.01});
    cushion6 = Matter.Bodies.fromVertices(0, tableHeight/2, verticesCushion, { isStatic: true, angle: PI*0.5, restitution: 0.5, friction: 0.01});
    
    Composite.add(engine.world, [cushion, cushion2, cushion3, cushion4, cushion5, cushion6, cueBall]);
    
    // This for loop generates the balls in random positions
    // for(let i = 0; i < 15; i++){
    //     generateBalls(random(0, width), random(0, height))
    // }

    // Draw red balls - they are drawn separately because they are in a specific position
    //   First row of balls
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

    
    
    noStroke()
    // Draw pockets
    fill(0)
    ellipse(0, 0, pocketSize)
    ellipse(tableWidth, 0, pocketSize)
    ellipse(0, tableHeight, pocketSize)
    ellipse(tableWidth, tableHeight, pocketSize)
    ellipse(tableWidth/2, 0, pocketSize)
    ellipse(tableWidth/2, tableHeight, pocketSize)  

    strokeWeight(1)
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

    stroke(1)
    // draw red balls
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

    noStroke()
    strokeWeight(1)

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

function mousePressed(){
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