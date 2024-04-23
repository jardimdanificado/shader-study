// the vertex shader is called for each vertex

let time = 85;
let mandel;
let img;

let progress = 1;

function setup() 
{
  createCanvas(500, 500, WEBGL);

  // create and initialize the shader
  mandel = loadShader("shaders/basic.vert", "shaders/basic.frag");
  mandel.setUniform("texture", img)
  img = loadImage('a.jpg');
  noStroke();
}

absoluteTime = 0;

function draw() 
{
  background(50,150,50);
  mandel.setUniform('cactiTex', img);
  mandel.setUniform('u_mouse', [pmouseX, height - pmouseY]);
  mandel.setUniform('u_time', (time/100));
  mandel.setUniform('u_resolution', [width, height]);
  mandel.setUniform('time', time/20);
  time += progress;
  absoluteTime += 1;
  push()
  shader(mandel);
    if (time == 120 || time == 40) 
    {
        progress = -progress;
    }
    translate(0, 0, -80-(time));
    rotateX(absoluteTime / 100);
    rotateY(absoluteTime / 100);
    box(200, 200);
    pop()
}