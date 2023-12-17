let Engine = Matter.Engine,
Render = Matter.Render,
Runner = Matter.Runner,
Bodies = Matter.Bodies,
Composite = Matter.Composite;
Constraint = Matter.Constraint;

let table;
let tableWidth = 600;
let tableHeight = 300;
let ball;
let balls = [];
let ballWidth;
let pocketSize;



function setup() {
    createCanvas(tableWidth,tableHeight);
    
    rectMode(CENTER);

    ballWidth = tableWidth/36
    pocketSize = ballWidth*1.5;
    let verticesCushion = [
        { x: (tableWidth / 4) +5, y: tableHeight+20},
        { x: (tableWidth *3/4) -5, y: tableHeight+20},
        { x: tableWidth *3/4 - 25, y: tableHeight},
        { x: tableWidth / 4 + 25, y: tableHeight},
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
    
    rect(tableWidth/2, tableHeight/2, tableWidth, tableHeight)
    stroke(255)
    line(tableWidth/4, 0, tableWidth/4, tableHeight)
    arc(tableWidth/4, tableHeight/2, 75, 75, PI*0.5, PI*1.5, CHORD)
    noStroke()
    fill(50)
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