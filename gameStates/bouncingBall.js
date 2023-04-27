class Ball {
    constructor(){
        this.x = random(width)
        this.y = random(height)
        this.xSpeed = 5
        this.ySpeed = 3
        this.d = 20 // Druchmesser
    }

    show(){
        circle(this.x, this.y, this.d)
    }

    bounce(){
        this.x = this.x + this.xSpeed
        this.y = this.y + this.ySpeed
    
        if (this.x < 0 + this.d/2 || this.x > width - this.d/2){
            this.xSpeed = -this.xSpeed
        }
        if (this.y < 0 + this.d/2 || this.y > height - this.d/2){
            this.ySpeed = -this.ySpeed
        }
    
    }
}