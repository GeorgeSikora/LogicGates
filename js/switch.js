

class Switch extends Entity {
    constructor (x, y) {
        super(x, y, 32, 32);

        this.state = 0;
        this.output = new Pin(x, y, OUTPUT);
    }
    draw() {

        this.output.pos.x = this.pos.x+32;
        this.output.pos.y = this.pos.y;
        this.output.draw();

        push();
        translate(this.pos.x, this.pos.y);

        if (this.mouseOver()) {
            stroke('white');
        } else {
            noStroke();
        }

        if (this.state) {
            fill('green');
        } else {
            fill('red');
        }

        rectMode(CENTER);
        rect(0, 0, 32, 32);

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(24);
        text(this.state, 0, 0);

        pop();
    }

    mousePressed() {
        if (this.mouseOver() && !this.selected) this.state = ~this.state & 1;
        this.output.mousePressed();
    }
    mouseReleased() {
        this.output.mouseReleased();
    }
}