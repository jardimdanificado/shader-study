// the vertex shader is called for each vertex

let time = 0;
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
  shader(mandel);
  noStroke();
}

absoluteTime = 0;

function draw() 
{
    // 'r' is the size of the image in Mandelbrot-space
    clear();
    mandel.setUniform('cactiTex', img);
    mandel.setUniform('u_mouse', [pmouseX, height - pmouseY]);
    mandel.setUniform('u_time', (time/100));
    mandel.setUniform('u_resolution', [width, height]);
    mandel.setUniform('time', time/20);
    time += progress;
    absoluteTime += 1;
    if (time == 80 || time == 0) 
    {
        progress = -progress;
    }
    rotateX(absoluteTime / 100);
    rotateY(absoluteTime / 100);
    box(200, 200);
}