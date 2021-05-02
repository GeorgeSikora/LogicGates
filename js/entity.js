
class Entity {
    constructor(x, y, w, h) {
        this.pos = {x: x, y: y};
        this.w = w;
        this.h = h;

        this.selected = false;
        this.bindObj = null;
        this.bindShift = {x: 0, y:0};
    }

    mouseHold() {

    }

    rebind() {
        if (this.bindedObj) {
            this.pos = addVec(this.bindedObj.pos, this.bindShift);
        }
    }

    mouseOver() {
        return mouseX > this.pos.x-this.w/2 && mouseY > this.pos.y-this.h/2 && mouseX < this.pos.x+this.w/2 && mouseY < this.pos.y+this.h/2;
    }
}