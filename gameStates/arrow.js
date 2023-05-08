class Arrow {
    constructor(l, b, s){
        this.x = 0 // x Mittellinie
        this.y = 0 // y Start
        this.l = l // gesamte Pfeillänge
        this.e = this.y+this.l // End
        this.b = b // Breite
        this.a = this.b/2 // Pfeilspitzlänge/Dreieck
        this.s = s // Stroke
          
    }
    show(angle){
        this.angle = angle
        rotate(this.angle)
        strokeWeight(this.s)
        noFill()
        strokeCap(ROUND)
        line(this.x, this.y, this.x, this.e)
        strokeJoin(MITER)
        beginShape()
        vertex(this.x - this.b/2, this.e - this.a)
        vertex(this.x, this.e)
        vertex(this.x + this.b/2, this.e - this.a)
        endShape()
    }
}