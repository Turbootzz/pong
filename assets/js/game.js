class Game {
    constructor() {
        //Verbinden met de pong canvas (moet elke frame opnieuw getekend worden)
        this.canvas = document.getElementById("pong");
        this.context = this.canvas.getContext("2d");

        //bal object aanmaken
        this.ball = new Ball(this.canvas.width / 2, this.canvas.height / 2, 'orange');

        //bepaald de framerate (niet aller beste manier maar wel makkelijkste)
        // let me = this;
        // setInterval(function() {
        //     me.update();
        //     me.draw();
        // }, 1000/60);
        this.players = [
            new Player(20, this.canvas.height / 2, 1),
            new Player(this.canvas.width - 20, this.canvas.height / 2, 2)
        ];

        //shows score
        this.hud = new Hud(this);

        //array for the input
        this.keys = [];
        //event for pressing key
        window.addEventListener('KEY_DOWN', (event) => {
            switch (event.detail) {
                case 'ArrowUp': this.keys[38] = true;
                    break;
                case 38: this.keys[38] = true;
                    break;
                case 'ArrowDown': this.keys[40] = true;
                    break;
                case 40: this.keys[40] = true;
                    break;
            }
        });
        //when letting go of key
        window.addEventListener('KEY_UP', (event) => {
            switch (event.detail) {
                case 'ArrowUp': this.keys[38] = false;
                    break;
                case 38: this.keys[38] = false;
                    break;
                case 'ArrowDown': this.keys[40] = false;
                    break;
                case 40: this.keys[40] = false;
                    break;
            }
        });

        // Gameloop
        let lastTime;
        const callback = (milliseconds) => {
            if (lastTime) {
                this.update((milliseconds - lastTime) / 1000);
                this.draw();
            }
            lastTime = milliseconds;
            window.requestAnimFrame(callback);
        }
        callback();
    }

    checkInput(player, ball) {
        switch (player.id) {
            case 1:     // Human player (left)
                player.velocity.y = 0;
                player.velocity.y += (this.keys[38] === true) ? -400 : 0;
                player.velocity.y += (this.keys[40] === true) ? 400 : 0;
                break;
            case 2:     // A.I player (right)
                player.position.y = ball.position.y;
                break;
        }
    }

    update(deltatime) {

        //position of the ball changes on velocity
        this.ball.position.x += this.ball.velocity.x * deltatime;
        this.ball.position.y += this.ball.velocity.y * deltatime;

        //position of player changes based on velocity
        this.players[0].position.y += this.players[0].velocity.y * deltatime;
        this.players[1].position.y += this.players[1].velocity.y * deltatime;

        //checks the players input
        this.players.forEach(player => this.checkInput(player, this.ball));

        this.checkCollisions(this.players, this.ball, this.hud.edges, deltatime);
    }

    checkCollisions(players, ball, edges, deltatime) {

        for(let p=0; p<players.length; p++) {
            if(players[p].top < edges[0].bottom) {
                players[p].position.y = edges[0].size.y + (players[p].size.y/2);
            }else if(players[p].bottom > edges[1].top) {
                players[p].position.y = this.canvas.height - edges[1].size.y - (players[p].size.y/2);
            }
        }

        

        //checks if the ball hits the top or the bottom.
        if (this.ball.bottom > this.canvas.height-10 || this.ball.top < 10) {
            this.ball.velocity.y = -this.ball.velocity.y;
        }


        //checks if ball hits the player
        if(this.collide(ball, players[0], deltatime)) {
            alert('bots!');
        }


        //
    }

    collide(rect1, rect2, dt) {
        if (rect1.left   + rect1.velocity.x * dt < rect2.right  + rect2.velocity.x * dt &&
            rect1.right  + rect1.velocity.x * dt > rect2.left   + rect2.velocity.x * dt &&
            rect1.top    + rect1.velocity.y * dt < rect2.bottom + rect2.velocity.y * dt &&
            rect1.bottom + rect1.velocity.y * dt > rect2.top    + rect2.velocity.y * dt) {
            return true;
        }else{
            return false;
        }
    }



    draw() {
        //clears the context
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // draws ball
        this.drawRectangle(this.context, this.ball);

        // Draws players
        for (let i = 0; i < this.players.length; i++) {
            this.drawRectangle(this.context, this.players[i]);
        }

    }

    drawRectangle(ctx, rect, color = 'white') {
        // choose the colour
        ctx.fillStyle = color;
        // draws a rectangle on the canvas
        ctx.fillRect(rect.left, rect.top, rect.size.x, rect.size.y);
    }
}