class Arrow {
    constructor(){
          
    }
    show(x, y, angle, XX){
        this.letter = XX
        this.x = x // x Mittellinie
        this.y = y // y Start
        this.l = 100 // gesamte Pfeillänge
        this.e = this.y+this.l // End
        this.b = 90 // Breite
        this.a = this.b/2 // Pfeilspitzlänge/Dreieck
        this.s = 20 // Stroke

        this.angle = angle
        rotate(this.angle)
        strokeWeight(this.s)
        noFill()
        strokeCap(SQUARE)
        line(this.x, this.y, this.x, this.e)
        strokeJoin(MITER)
        beginShape()
        vertex(this.x - this.b/2, this.e - this.a)
        vertex(this.x, this.e)
        vertex(this.x + this.b/2, this.e - this.a)
        endShape()
        fill(255)

    }
}