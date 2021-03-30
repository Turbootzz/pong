class Game {
    constructor() {
        console.log("Test Game");


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
    }
}