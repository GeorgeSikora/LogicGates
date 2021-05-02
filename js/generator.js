
class Generator extends Entity {
    constructor (x, y, frequency) {
        super(x, y, 32, 32);

        this.frequency = frequency;

        this.state = 0;
        this.output = new Pin(x, y, OUTPUT);
    }
    draw() {

        this.output.pos.x = this.pos.x+32;
        this.output.pos.y = this.pos.y;
        this.output.draw();
        
        this.state = millis()%(2000/this.frequency)<(1000/this.frequency) ? 1 : 0;

        push();
        translate(this.pos.x, this.pos.y);

        if (this.mouseOver()) {
            stroke('white');
        } else {
            noStroke();
        }

        fill('#888');
        rectMode(CENTER);
        rect(0, 0, 32, 32);

        noStroke();

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(24);
        text(this.state, 0, 0);
        
        textSize(12);
        textAlign(CENTER, TOP);
        text('Freq: ' + this.frequency + ' hz', 0, 20);

        pop();
    }
    
    mousePressed() {
        this.output.mousePressed();
    }
    mouseReleased() {
        this.output.mouseReleased();
    }
}