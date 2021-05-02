
const INPUT = 1;
const OUTPUT = 2;

let wiring;
let wiringType;

class Pin extends Entity {
    constructor(x, y, type = OUTPUT) {
        super(x, y, 12, 12);

        this.type = type;
        this.connection = null;
    }
    draw() {
        push();
        translate(this.pos.x, this.pos.y);

        strokeWeight(6);
        stroke('gray');
        line(0, 0, this.type == OUTPUT ? -32 : 32, 0);
  
        noStroke();
        fill('yellow');

        if(this.mouseOver()) {
            fill('lime');
        }
        
        ellipse(0, 0, 12, 12);

        pop();

        push();
        if (wiring == this) {
            strokeWeight(6);
            stroke('gray');
            noFill();

            var p1x = this.pos.x;
            var p1y = this.pos.y;
            var p2x = mouseX;
            var p2y = mouseY;

            if (mouseX > this.pos.x) { // millis()%2000<1000
                var cache = p2x;
                p2x = p1x;
                p1x = cache;
            } else {
                var cache = p2y;
                p2y = p1y;
                p1y = cache;
            }

            bezier(this.pos.x, this.pos.y, p1x, p1y, p2x, p2y, mouseX, mouseY); // mouseY - this.pos.y, mouseX - this.pos.x
            
            /*
            fill(255, 0, 255);
            noStroke();
            ellipse(p1x, p1y, 12, 12);
            ellipse(p2x, p2y, 12, 12);
            */
        }
        pop();
    }

    mousePressed() {
        if(this.mouseOver() && (!this.connection || this.type == OUTPUT)) {
            wiring = this;
            wiringType = this.type;
        }
    }

    mouseReleased() {
        if (wiring && wiring != this && this.mouseOver() && !this.connection) {

            const targetType = this.type == INPUT ? OUTPUT : INPUT;

            if (wiringType == targetType) {
                const nc = new Connection(this, wiring);
                this.connection = nc;
                wiring.connection = nc;
                entities.push(nc);
            } else {
                console.error('Drát musí být zapojen na jiný pin !');
            }
        }
    }
}