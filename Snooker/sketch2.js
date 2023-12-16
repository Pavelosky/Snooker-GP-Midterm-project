// Initialize Matter.js engine
let engine;
let world;
let balls = [];

function setup() {
  createCanvas(800, 600);

  // Create the Matter.js engine
  engine = Matter.Engine.create();
  world = engine.world;

  // Create the snooker table boundaries as trapezoids
  let tableWidth = 600;
  let tableHeight = 400;
  let wallHeight = 20;

  // Define the vertices of the trapezoids
  let verticesLeft = [
    { x: 0, y: height },
    { x: 0, y: height - wallHeight },
    { x: tableWidth / 4, y: 0 },
    { x: 0, y: 0 },
  ];
  let verticesRight = [
    { x: width, y: height },
    { x: width, y: height - wallHeight },
    { x: (3 * tableWidth) / 4, y: 0 },
    { x: width, y: 0 },
  ];

  // Create the trapezoid bodies
  leftWall = Matter.Bodies.fromVertices(0, 0, verticesLeft, { isStatic: true });
  rightWall = Matter.Bodies.fromVertices(width, 0, verticesRight, { isStatic: true });

  // Add the trapezoid boundaries to the world
  Matter.World.add(world, [leftWall, rightWall]);

  // Create snooker balls
  for (let i = 0; i < 5; i++) {
    let x = random(tableWidth / 4, (3 * tableWidth) / 4);
    let y = random(tableHeight / 4, (3 * tableHeight) / 4);
    let radius = 20;
    let ball = Matter.Bodies.circle(x, y, radius);
    balls.push(ball);
  }

  // Add the balls to the world
  Matter.World.add(world, balls);
}

function draw() {
  background(255);

  // Update the Matter.js engine
  Matter.Engine.update(engine);

  // Display the snooker balls
  fill(255, 0, 0);
  for (let i = 0; i < balls.length; i++) {
    ellipse(balls[i].position.x, balls[i].position.y, 40, 40);
  }

  // Display the trapezoid table boundaries
  fill(150);
  drawVertices(leftWall.vertices);
  drawVertices(rightWall.vertices);
}

// Helper function to draw trapezoid vertices
function drawVertices(vertices) {
  beginShape();
  for (let i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
