

class Connection extends Entity {
    constructor(p1, p2) {
        super(0,0,0,0);
        
        this.pin1 = p1;
        this.pin2 = p2;
    }
    draw() {

        var p1x = this.pin1.pos.x;
        var p1y = this.pin1.pos.y;
        var p2x = this.pin2.pos.x;
        var p2y = this.pin2.pos.y;

        var pt1x = this.pin2.pos.x;
        var pt1y = this.pin2.pos.y;
        var pt2x = this.pin1.pos.x;
        var pt2y = this.pin1.pos.y;
        
        if (p1x < p2x) {
            var cache = pt2x;
            pt2x = pt1x;
            pt1x = cache;
        } else {
            var cache = pt2y;
            pt2y = pt1y;
            pt1y = cache;
        }

        push();
        noFill();
        strokeWeight(6);
        stroke('purple');
        bezier(p1x, p1y, pt1x,pt1y, pt2x,pt2y, p2x, p2y);
        //bezier(this.pos.x, this.pos.y, p1x, p1y, p2x, p2y, mouseX, mouseY);
        pop();
    }
}