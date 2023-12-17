let Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Bodies = Matter.Bodies,
Composite = Matter.Composite;
Constraint = Matter.Constraint;


let ball;
let balls = [];
let ballWidth;
let pocketSize;
let sideWall
let verticesSet
let tableWidth = 900;
let tableHeight = 450;


function setup() {
    createCanvas(tableWidth,tableHeight);
    background(200,100,100);
    
    rectMode(CENTER);

    ballWidth = tableWidth/36
    pocketSize = ballWidth*1.5;
    let verticesCushion = [
        { x: tableWidth / 4, y: tableHeight+20},
        { x: tableWidth *3/4, y: tableHeight+20},
        { x: tableWidth *3/4 - 20, y: tableHeight}, // Adjust these vertices as needed
        { x: tableWidth / 4 + 20, y: tableHeight},
      ];

    cushion = Matter.Bodies.fromVertices(tableWidth * 1/4, tableHeight, verticesCushion, { isStatic: true });
    cushion2 = Matter.Bodies.fromVertices(tableWidth * 3/4, tableHeight, verticesCushion, { isStatic: true });
    cushion3 = Matter.Bodies.fromVertices(tableWidth * 1/4, 0, verticesCushion, { isStatic: true, angle: PI});
    cushion4 = Matter.Bodies.fromVertices(tableWidth * 3/4, 0, verticesCushion, { isStatic: true, angle: PI});
    cushion5 = Matter.Bodies.fromVertices(tableWidth, tableHeight/2, verticesCushion, { isStatic: true, angle: PI*1.5});
    cushion6 = Matter.Bodies.fromVertices(0, tableHeight/2, verticesCushion, { isStatic: true, angle: PI*0.5});
}

function draw() {
    fill(44,130,87);
    fill(100)
    drawVertices(cushion.vertices)
    drawVertices(cushion2.vertices)
    drawVertices(cushion3.vertices)
    drawVertices(cushion4.vertices)
    drawVertices(cushion5.vertices)
    drawVertices(cushion6.vertices)
}


function drawVertices(vertices){
    beginShape();
    for (let i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE)
}