// the vertex shader is called for each vertex

let time = 85;
let mandel;
let img;
let _camera;

let obj = 
{
    position: {x: 0, y: -100, z: 0}
}

let tile = 
[
    [0,1],
    [1,0]
]

let progress = 1;

function setup() 
{
    createCanvas(500, 500, WEBGL);
    _camera = createCamera();
    _camera.setPosition(0, -400, 400);
    _camera.lookAt(0, 0, 0);
}

function g4point(a,b,c,d)
{
    let velocity = {x: 0, y: 0, z: 0};
    if (a > 0 || b > 0 || c > 0 || d > 0)
    {
        if (a > b && a > c && a > d)
        {
            velocity.y = a - b;
            velocity.x = a - c;
            velocity.z = a - d;
        }
        else if (b > a && b > c && b > d)
        {
            velocity.y = b - a;
            velocity.x = b - d;
            velocity.z = b - c;
        }
        else if (c > a && c > b && c > d)
        {
            velocity.y = c - a;
            velocity.x = c - d;
            velocity.z = c - b;
        }
        else if (d > a && d > b && d > c)
        {
            velocity.y = d - b;
            velocity.x = d - c;
            velocity.z = d - a;
        }
        else if (a == b && c == d)
        {
            if (a > c)
            {
                velocity.y = a - c;
                velocity.x = a - c;
            }
            else if (a < c)
            {
                velocity.y = c - a;
                velocity.x = c - a;
            }
        }
        else if (a == d && b == c)
        {
            if (a > b)
            {
                velocity.y = a - b;
                velocity.x = a - b;
            }
            else if (a < b)
            {
                velocity.y = b - a;
                velocity.x = b - a;
            }
        }
    }
    return velocity;
}

function gravity(obj, tile)
{
    let velocity = {x: 0, y: 0, z: 0};
    let a = tile[0][0];
    let b = tile[0][1];
    let c = tile[1][0];
    let d = tile[1][1];
    velocity = g4point(a,b,c,d);
    obj.position.x += velocity.x;
    obj.position.y += velocity.y;
    obj.position.z += velocity.z;
}

function draw() 
{
    clear()
    //background(50,150,50);
    color(255);
    orbitControl();
    beginShape(QUADS);
    
    // a cube
    fill('red');
    stroke('red');
    vertex(-100, tile[0][0]*100, -100);
    fill('blue');
    stroke('blue');
    vertex( 100, tile[0][1]*100, -100);
    fill('green');
    stroke('green');
    vertex( 100, tile[1][0]*100,  100);
    fill('yellow');
    stroke('yellow');
    vertex(-100, tile[1][1]*100,  100);
    
    // Stop drawing the shape.
    endShape();

    gravity(obj, tile);

    push();
    translate(obj.position.x, obj.position.y, obj.position.z);
    box(10,10,10);
    pop();
}