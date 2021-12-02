// Game Constants & Variables
const foodSound = new Audio('media/food.mp3');
const gameOverSound = new Audio('media/gameover.mp3');
const moveSound = new Audio('media/move.mp3');
const gameplaySound = new Audio('media/music.mp3');
let inputDir = {x: 0, y: 0}; 
let speed = 5;
let score = 0;
let hiscoreval = 0;
let lastPaintTime = 0;
let paused = false;
let gamePlay = false;
let currStage = 1;
let snakeLine = [
    { x: Math.round(2 + 14 * Math.random()), y: Math.round(2 + 14 * Math.random())}
];
food = { x: 9, y: 9 };
// Game Functions
function main(ctime) {
    if (!paused) {
        
        window.requestAnimationFrame(main);
        console.log(ctime)
        console.log(speed);
        if((ctime - lastPaintTime)/1000 < 1/speed){
            return;
        }
        lastPaintTime = ctime;
        gameEngine();
    }
}
function resetGame() {
    inputDir = { x: 0, y: 0 };
    gamePlay = false;
    speed = 5;
    currStage = 1;
    score = 0;
    stage.innerHTML = "Stage " + currStage;
    scoreBox.innerHTML = "Score : " + score;
}
function isCollide(snake) {
    for (let i = 1; i < snake.length; i++)
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    if (snake[0].x > 18 || snake[0].x < 0 || snake[0].y > 18 || snake[0].y < 0)
        return true;
    return false;
}
function gameEngine() {
    //Snake Updation
    // if (isCollide(snakeLine)) {
    //     gameOverSound.play();
    //     gameplaySound.pause();
    //     inputDir = { x: 0, y: 0 };
    //     alert("Game Over");
    //     snakeLine = [
    //         { x: Math.round(2 + 14 * Math.random()), y: Math.round(2 + 14 * Math.random())}
    //     ];
    //     gameplaySound.play();
    //     score = 0;
    // }
    // Update the stage
    
    if (snakeLine[0].y === food.y && snakeLine[0].x === food.x) {
        foodSound.play();
            snakeLine.unshift({ x: snakeLine[0].x + inputDir.x, y: snakeLine[0].y + inputDir.y });
        score++;
        if(score%5===0){
            currStage = Math.floor(score / 5 + 1);
            speed *= 1.2;
        }
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        stage.innerHTML = "Stage " + currStage;
        scoreBox.innerHTML = "Score : " + score;
        food = { x: Math.round(2 + 14 * Math.random()), y: Math.round(2 + 14 * Math.random()) };
        }
    // Move the snake
    for (let i = snakeLine.length - 2; i >= 0; i--){
        // const element = array[i];
        snakeLine[i + 1] = { ...snakeLine[i] };
    }
    snakeLine[0].x += inputDir.x;
    snakeLine[0].y += inputDir.y;


    if (isCollide(snakeLine)) {
        // Game Over
        gameOverSound.play();
        gameplaySound.pause();
        alert("Game Over");
        resetGame();
        snakeLine = [
            { x: Math.round(2 + 14 * Math.random()), y: Math.round(2 + 14 * Math.random())}
        ];
        gameplaySound.play();
    }

    //Display the snake
    board.innerHTML = "";
    snakeLine.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //Display the food;
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);



}

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}


// Main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    if (e.key === ' ' && gamePlay) {
        if (paused) {
            paused = false;
            gameplaySound.play();
        } else {
            paused = true;
            gameplaySound.pause();

        }
            console.log(paused);
            if (!paused)
                window.requestAnimationFrame(main);
    } else {
        gamePlay = true;
        let curry = inputDir.y;
        if(inputDir.x === 0 && inputDir.y === 0)
            inputDir = { x: 0, y: 1 };
        switch (e.key) {
            case "ArrowUp":
                if (curry === 1)
                    break;
                moveSound.play();
                inputDir.x = 0;
                inputDir.y = -1;
                break;
            case "ArrowDown":
                if (inputDir.y === -1)
                    break;
                moveSound.play();
                inputDir.x = 0;
                inputDir.y = 1;
                break;
            case "ArrowLeft":
                if (inputDir.x === 1)
                    break;
                moveSound.play();
                inputDir.x = -1;
                inputDir.y = 0;
                break;
            case "ArrowRight":
                if (inputDir.x === -1)
                    break;
                moveSound.play();
                inputDir.x = 1;
                inputDir.y = 0;
                break;
            default:
                break;
        }
    }
    
});
