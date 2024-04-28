let _camera;

let obj = 
{
    position: {x: 50, y: -100, z: 50}
}

let tile = 
{
    a: 0,
    b: 0,
    c: 1,
    d: 0
}


function setup() 
{
    createCanvas(500, 500, WEBGL);
    _camera = createCamera();
    _camera.setPosition(0, -400, 400);
    _camera.lookAt(50, 0, 50);
}

function g4point(a,b,c,d)
{
    let velocity = {x: 0, y: 0, z: 0};
    if (a > 0 || b > 0 || c > 0 || d > 0)
    {
        if (a > b && a > c && a > d)
        {
            velocity.x = a;
            velocity.z = a;
            velocity.y = (a-c);
        }
        else if (b > a && b > c && b > d)
        {
            velocity.y = (b-d);
            velocity.z = b;

        }
        else if (c > a && c > b && c > d)
        {
            velocity.x = -c;
            velocity.z = -c;
            velocity.y = (c-a);
        }
        else if (d > a && d > b && d > c)
        {
            velocity.y = (d-b);
            velocity.z = -d;
        }
        else if (a == b && c == d)
        {
            if (a > c)
            {
                velocity.y = a;
                velocity.x = a;
            }
            else if (a < c)
            {
                velocity.y = c;
                velocity.x = -c;
            }
        }
        else if (a == d && b == c)
        {
            if (a > b)
            {
                velocity.y = a;
                velocity.z = -a;
            }
            else if (a < b)
            {
                velocity.y = b;
                velocity.z = b;
            }
        }
    }
    return velocity;
}

function gravity(obj, tile)
{
    let velocity = {x: 0, y: 0, z: 0};
    let a = tile.a;
    let b = tile.b;
    let c = tile.c;
    let d = tile.d;
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
    beginShape(TESS);
    
    
    // b
    fill('blue');
    stroke('blue');
    vertex( 0, tile.b*-100, 100);
    
    // a
    fill('red');
    stroke('red');
    vertex(0, tile.a*-100, 0);
    
    
    // d
    fill('green');
    stroke('green');
    vertex( 100, tile.d*-100,  0);
    
    // c
    fill('yellow');
    stroke('yellow');
    vertex(100, tile.c*-100,  100);
    
    // Stop drawing the shape.
    endShape();

    gravity(obj, tile);

    push();
    translate(obj.position.x, obj.position.y, obj.position.z);
    box(10,10,10);
    pop();
}