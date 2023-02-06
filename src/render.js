const renderItem = document.getElementById("renderItem");

// Adjust minimum and maximum of degrees for the ball's direction.
const degrees = {
    min: 0,
    max: 360
};

// Object ball has radius 40, velocity 5, and a random angle.
const ball = {
    x: renderItem.width / 2,
    y: renderItem.height / 2,
    r: 40,
    velocity: 5,
    angle: Math.floor(Math.random() * ((degrees.max + 1) - degrees.min + 1) + degrees.min),
    xVelocity: 0,
    yVelocity: 0,
    checkAngle: true,
    shape: () => {
        // Create a transparent ball with position to detecting collision from box side.
        const canvas = renderItem.getContext("2d");

        canvas.fillStyle = "rgb(255, 255, 255, 0)";
        canvas.beginPath();
        canvas.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        canvas.fill();
    },
    image: () => {
        // Render the image.
        const canvas = renderItem.getContext("2d");
        const img = document.getElementById("ball");

        canvas.drawImage(img, ball.x - ball.r, ball.y - ball.r, ball.r*2, ball.r*2);
    },
    move: () => {
        while(ball.checkAngle) {
            // Convert a velocity with angle to make the ball's direction.
            ball.xVelocity = Math.cos(ball.angle * (Math.PI/180)) * ball.velocity;
            ball.yVelocity = Math.sin(ball.angle * (Math.PI/180)) * ball.velocity;
            ball.checkAngle = !ball.checkAngle;
        }

        // Run the ball after converting velocity.
        ball.x += ball.xVelocity;
        ball.y += ball.yVelocity;

        // Check collision. if get collision, then the ball will be bounce and sound triggered.
        if (ball.x <= ball.r || ball.x + ball.r >= renderItem.width) {
            ball.xVelocity = ball.xVelocity * -1;
            ball.boing(ball.x / (renderItem.width/2));
        }

        if (ball.y <= ball.r || ball.y + ball.r >= renderItem.height) {
            ball.yVelocity = ball.yVelocity * -1;
            ball.boing(ball.x / (renderItem.width/2));
        }
    },
    boing: (panner) => {
        // Create a stereo effect so the ball's direction can be hear.
        const audioCtx = new (window.AudioContext);
        const audio = new Audio("./boing.mp3");
        
        const source = audioCtx.createMediaElementSource(audio);
        const panNode = audioCtx.createStereoPanner();

        panNode.pan.setValueAtTime(panner - 1, audioCtx.currentTime);
        source.connect(panNode);
        panNode.connect(audioCtx.destination);

        audio.play();
    }
}

const layout = {
    background: () => {
        // Render the background.
        const canvas = renderItem.getContext("2d");
        const img = document.getElementById("background");
        canvas.drawImage(img, 0, 0, renderItem.width, renderItem.height);
    }
}

const update = () => {
    // Update the Ball's move.
    ball.move();
}

const render = () => {
    // Render the component.
    layout.background();
    ball.shape();
    ball.image();
}

const startGame = () => {
    // The program will be start.
    update();
    render();
}

// Adjust frame per seconds.
const fps = 60;
setInterval(startGame, 1000/60);