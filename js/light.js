

class Light extends Entity {
    constructor(x, y) {
        super(x, y, 32, 32);
        
        this.state = 0;
        this.input = new Pin(x, y, INPUT);
    }
    draw() {

        this.input.pos.x = this.pos.x-32;
        this.input.pos.y = this.pos.y;
        this.input.draw();

        const wire = this.input.connection;
        if (wire) {
            const targetPin = wire.pin1 == this.input ? wire.pin2 : wire.pin1;

            for (var i = 0; i < entities.length; i++) {
                var e = entities[i];
                if (e.output && e.output == targetPin) {
                    this.state = e.state;
                }
            }
        }

        push();
        translate(this.pos.x, this.pos.y);

        if (this.state) {
            fill('yellow');
        } else {
            fill('black');
        }

        stroke('white');
        strokeWeight(2);

        ellipse(0, 0, 32, 32);

        pop();
    }
    
    mousePressed() {
        this.input.mousePressed();
    }
    mouseReleased() {
        this.input.mouseReleased();
    }
}