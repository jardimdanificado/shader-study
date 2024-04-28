let _camera;

let obj = 
{
    position: {x: 50, y: -60, z: 50}
}

let tile = 
{
    a: 0,
    b: 0,
    c: 1,
    d: 1
}


function setup() 
{
    createCanvas(500, 500, WEBGL);
    _camera = createCamera();
    _camera.setPosition(500, -100, 0);
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

// get the right height of the tile in the object cordinates considering the depth, example: if the object is in the x = .50, and z = .50, in a a=1,b=1,c=0,d=0 the height is .50
function getHeight(x, z, vertices) {
    // Extrair os valores de y dos vértices
    let y0 = vertices.a;
    let y1 = vertices.b;
    let y2 = vertices.c;
    let y3 = vertices.d;

    // Determinar os vértices do quadrado 1x1 no plano xz
    let v1 = { x: 0, y: y0, z: 0 };
    let v2 = { x: 1, y: y1, z: 0 };
    let v3 = { x: 1, y: y2, z: 1 };
    let v4 = { x: 0, y: y3, z: 1 };

    // Interpolação linear para encontrar a coordenada y no ponto (x, z)
    let y;
    if (x >= 0 && x <= 1 && z >= 0 && z <= 1) 
    {
        if (z <= 1 - x) {
            // Ponto está no triângulo inferior esquerdo do quadrado
            y = y0 + (y3 - y0) * z;
        } else {
            // Ponto está no triângulo superior direito do quadrado
            y = y1 + (y2 - y1) * (1 - x);
        }
    } else {
        console.error("Erro: O ponto está fora do quadrado 1x1 no plano xz.");
        return null;
    }

    return y;  // Coordenada y correspondente para o ponto (x, z) no plano xz
}

function gravity(obj, tile)
{
    if (obj.position.y >= 0)
    {
        return;
    }
    
    let velocity = {x: 0, y: 0, z: 0};
    let a = tile.a;
    let b = tile.b;
    let c = tile.c;
    let d = tile.d;
    //get the right height of the tile in the object cordinates
    let position;


    velocity = g4point(a,b,c,d);
    obj.position.x += velocity.x;
    obj.position.y += velocity.y;
    obj.position.z += velocity.z;
}

function draw() 
{
    clear()
    background(0,0,0);
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
    fill('white');
    stroke('black');
    box(10,10,10);
    pop();
}