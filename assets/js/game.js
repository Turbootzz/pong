class Game {
    constructor() {
        //Verbinden met de pong canvas (moet elke frame opnieuw getekend worden)
        this.canvas = document.getElementById("pong");
        this.context = this.canvas.getContext("2d");

        //bal object aanmaken
        this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, 'orange');

        //bepaald de framerate (niet aller beste manier maar wel makkelijkste)
        // let me = this;
        // setInterval(function() {
        //     me.update();
        //     me.draw();
        // }, 1000/60);

        //Gameloop
        let lastTime;
        const callback = (milliseconds) => {
            if (lastTime) {
                this.update((milliseconds - lastTime) / 1000);
                this.draw();
            }
            lastTime = milliseconds;
            window.requestAnimationFrame(callback);
        }

        callback();

    }
    update(deltatime) {
        //console.log(deltatime);
        //console.log("update")

    }

    draw() {
        //console.log("draw")
        this.drawRectangle(this.context, this.ball);
    }

    drawRectangle(ctx, rect, color = 'white') {
        ctx.fillStyle = color;
        ctx.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }
}