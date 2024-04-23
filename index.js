// the vertex shader is called for each vertex

let time = 0;
let mandel;
let img;
function setup() {
  createCanvas(500, 500, WEBGL);

  // create and initialize the shader
  mandel = loadShader("shaders/basic.vert", "shaders/basic.frag");
  mandel.setUniform("texture", img)
  img = loadImage('a.jpg');
  shader(mandel);
}

function draw() {
    // 'r' is the size of the image in Mandelbrot-space
    clear();
    mandel.setUniform('cactiTex', img);
    mandel.setUniform('u_mouse', [pmouseX, height - pmouseY]);
    mandel.setUniform('u_time', (time/100));
    mandel.setUniform('u_resolution', [width, height]);
    time += 1;
    rotateX(time / 100);
    rotateY(time / 100);
    box(200, 200);
}