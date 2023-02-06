const renderItem = document.getElementById("renderItem");

const ball = {
    x: renderItem.width / 2,
    y: renderItem.height / 2,
    r: 40,
    velocity: 5,
    angle: 40,
    xVelocity: 0,
    yVelocity: 0,
    checkAngle: true,
    shape: () => {
        const canvas = renderItem.getContext("2d");

        canvas.fillStyle = "rgb(255, 255, 255, 0)";
        canvas.beginPath();
        canvas.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        canvas.fill();
    },
    image: () => {
        const canvas = renderItem.getContext("2d");
        const img = document.getElementById("ball");

        canvas.drawImage(img, ball.x - ball.r, ball.y - ball.r, ball.r*2, ball.r*2);
    },
    move: () => {
        while(ball.checkAngle) {
            ball.xVelocity = Math.cos(ball.angle * (Math.PI/180)) * ball.velocity;
            ball.yVelocity = Math.sin(ball.angle * (Math.PI/180)) * ball.velocity;
            ball.checkAngle = !ball.checkAngle;
        }

        ball.x += ball.xVelocity;
        ball.y += ball.yVelocity;

        if (ball.x <= ball.r || ball.x + ball.r >= renderItem.width) {
            ball.xVelocity = ball.xVelocity * -1;
        }

        if (ball.y <= ball.r || ball.y + ball.r >= renderItem.height) {
            ball.yVelocity = ball.yVelocity * -1;
        }
    }
}

const layout = {
    background: () => {
        const canvas = renderItem.getContext("2d");
        const img = document.getElementById("background");
        canvas.drawImage(img, 0, 0, renderItem.width, renderItem.height);
    }
}

const update = () => {
    ball.move();
}

const render = () => {
    layout.background();
    ball.shape();
    ball.image();
}

const startGame = () => {
    update();
    render();
}

const fps = 60;
setInterval(startGame, 1000/60);