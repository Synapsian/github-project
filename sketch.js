const { VerletPhysics2D, VerletParticle2D, VerletSpring2D } = toxi.physics2d;

const { GravityBehavior } = toxi.physics2d.behaviors;

const { Vec2D, Rect} = toxi.geom;

let physics;

let particles = []
let eyes = []
let springs = []
let holdpoint;

function setup() {
  createCanvas(700, 700);
  
  physics = new VerletPhysics2D();
  let v = new Vec2D(0,1)
  let gravity = new GravityBehavior(v);
  physics.addBehavior(gravity)
  
  let bounds = new Rect(0,0,width,height)
  physics.setWorldBounds(bounds)
  
  particles.push(new Particle(450,100))
  particles.push(new Particle(400,200))
  particles.push(new Particle(450,300))
  
  particles.push(new Particle(200,300))
  particles.push(new Particle(250,200))
  particles.push(new Particle(200,100))
  
  eyes.push(new Particle(275, 150));
  eyes.push(new Particle(325, 150));
  
  holdpoint = new Particle(325,200)
  
  springs.push(new Spring(particles[0],particles[1],0.1))
  springs.push(new Spring(particles[1],particles[2],0.1))
  springs.push(new Spring(particles[0],particles[5],0.1))
  
  springs.push(new Spring(particles[3],particles[4],0.1))
  springs.push(new Spring(particles[4],particles[5],0.1))
  springs.push(new Spring(particles[2],particles[3],0.1))
  
  springs.push(new Spring(particles[1],particles[4],0.1))
  springs.push(new Spring(particles[0],particles[3],0.1))
  springs.push(new Spring(particles[5],particles[2],0.1))

  for (let particle of particles) {
    springs.push(new Spring(particle, eyes[0], 0.005));
    springs.push(new Spring(particle, eyes[1], 0.005));
    springs.push(new Spring(particle, holdpoint, 0.001))
  }
  
}

function draw() {
  background(255);
  
  physics.update();
  
  beginShape()
  
  
  fill(247,129,129)
  stroke(0)
  strokeWeight(5)
  for (let particle of particles) {
    vertex(particle.x,particle.y)
  }
  endShape(CLOSE)
  
//   for (let particle of particles) {
//     particle.show()
//   }
  
//   for (let spring of springs) {
//     spring.show()
//   }
  
  strokeWeight(10)
  point(eyes[0].x,eyes[0].y)
  point(eyes[1].x,eyes[1].y)
  
  
  if (mouseIsPressed) {
    holdpoint.lock()
    holdpoint.x = mouseX
    holdpoint.y = mouseY
    holdpoint.unlock()
  }
}
