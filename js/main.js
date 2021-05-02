
const backgroundColor = '#222';
let entities = [];

let selectedEntity;
let selectDeltaPos = {x:0, y:0};

let grid = 32;
let cursorMode = 'hand';

function setup() {
    createCanvas(displayWidth, displayHeight);

    entities.push(new Switch(200, 100));
    entities.push(new Light(500, 200));

    entities.push(new Generator(200, 400, 1));
    entities.push(new Light(500, 500));
    
    entities.push(new Generator(200, 600, 8));
}

function draw() {

    //cursor('default');

    background(backgroundColor);
    drawGrid();

    for (var i = 0; i < entities.length; i++) {
        var e = entities[i];
        e.rebind();
        if (e.draw) e.draw();
        if (e.loop) e.loop();
    }
    
    if (mouseIsPressed && startMousePressTimer+50 < millis() && !selectedEntity) {
        for (var i = 0; i < entities.length; i++) {
            var e = entities[i];
            if (e.mouseOver()) {
                e.selected = true;
                selectedEntity = e;
                selectDeltaPos = {x: e.pos.x - mouseX, y: e.pos.y - mouseY};
            } else {
                e.selected = false;
            }
        }
    }

    if (selectedEntity) {

        if (mouseIsPressed) {
            selectedEntity.pos.x = mouseX + selectDeltaPos.x + grid/2;
            selectedEntity.pos.x -= selectedEntity.pos.x % grid;

            selectedEntity.pos.y = mouseY + selectDeltaPos.y + grid/2;
            selectedEntity.pos.y -= selectedEntity.pos.y % grid;
        }

    }

}

let startMousePressTimer;
function mousePressed() {
    startMousePressTimer = millis();
    for (var i = 0; i < entities.length; i++) {
        var e = entities[i];
        if (e.mousePressed) e.mousePressed();
    }
}
function mouseReleased() {
    selectedEntity = null;
    for (var i = 0; i < entities.length; i++) {
        var e = entities[i];
        e.selected = false;
        if (e.mouseReleased) e.mouseReleased();
    }
    wiring = null;
}

function addVec(vec1, vec2) {
    return {x: vec1.x + vec2.x, y: vec1.y + vec2.y};
}

function drawGrid() {
    strokeWeight(1);
    stroke(0);
    for (var x = 0; x < width; x+=grid) {
        line(x, 0, x, height);
    }
    for (var y = 0; y < height; y+=grid) {
        line(0, y, width, y);
    }
}

function switchMode(mode) {

    cursorMode = mode;

    switch(mode) {
        case 'hand': cursor('pointer'); break;
        case 'move': cursor('move'); break;
        case 'wire': cursor('/assets/wire.png'); break;
    }
} 

// LINE/POINT
function linePoint(x1, y1, x2, y2, px, py) {

    // get distance from the point to the two ends of the line
    const d1 = dist(px,py, x1,y1);
    const d2 = dist(px,py, x2,y2);
  
    // get the length of the line
    const lineLen = dist(x1,y1, x2,y2);
  
    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    const buffer = 0.1;    // higher # = less accurate
  
    // if the two distances are equal to the line's 
    // length, the point is on the line!
    // note we use the buffer here to give a range, 
    // rather than one #
    if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
      return true;
    }
    return false;
}