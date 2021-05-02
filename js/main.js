
const backgroundColor = '#222';
let entities = [];

let selectedEntity;
let selectDeltaPos = {x:0, y:0};

function setup() {
    createCanvas(displayWidth, displayHeight);

    entities.push(new Switch(200, 100));
    entities.push(new Light(500, 200));

    entities.push(new Generator(200, 400, 1));
    entities.push(new Light(500, 500));
    
    entities.push(new Generator(200, 600, 8));
}

function draw() {

    background(backgroundColor);

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
            selectedEntity.pos.x = mouseX + selectDeltaPos.x;
            selectedEntity.pos.y = mouseY + selectDeltaPos.y;
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