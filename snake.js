const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
class SnakeBody{
    constructor(x,y){
        this.x = x;
        this.y = y;

    }
}
let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 20;
let headX = 20;
let headY = 20;
const Snakebody = [];
let tailLength = 2;
let foodX = 5;
let foodY = 5;
let xVelocity =0;
let yVelocity =0;

let score = 0;

function drawGame(){
    Snakepositon();
let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();
    Snakeeats();
    drawFood();
    drawSnake();
    drawScore();

    ctx.fillStyle = 'black';
    for(let i =0;i< Snakebody.length;i++){
        let part = Snakebody[i];
        ctx.fillRect(part.x * tileCount,part.y * tileCount,tileSize,tileSize)
    }
    Snakebody.push(new SnakeBody(headX,headY));
    if(Snakebody.length>tailLength){
        Snakebody.shift();
    }
    
    
    
    setTimeout(drawGame,1000/speed);

}
function isGameOver(){
    let gameOver = false;

    if(headX < 0){
        gameOver = true;
    }
    else if(headX == 40){
        gameOver = true;
    }
    else if(headY < 0){
        gameOver = true;
    }
    else if(headY == 40){
        gameOver = true;
    }

    if(gameOver){
        ctx.fillStyle = "black"
        ctx.font=("100px Verdana")
        ctx.fillText("Game Over!",canvas.width / 6.5,canvas.height/2)
    }
    return gameOver;
}

function drawScore(){
    ctx.fillStyle = 'black';
    ctx.font = "15px Bold"
    ctx.fillText("Score "+ score,canvas.width-100,20)
}
function clearScreen(){
    ctx.fillStyle = 'oldlace';
    ctx.fillRect(0,0,canvas.width,canvas.height); 
}
function Snakepositon(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawSnake(){
    ctx.fillStyle = 'black';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}
function drawFood(){
    ctx.fillStyle = "brown"
    ctx.fillRect(foodX*tileCount,foodY*tileCount,tileSize,tileSize)
}

function Snakeeats(){
    if(foodX == headX && foodY == headY){
        foodX = Math.floor(Math.random() * tileCount);
        foodY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
    }
}


document.body.addEventListener('keydown',keyDown);

function keyDown(event){
    if(event.keyCode ==38){
        if(yVelocity ==1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    if(event.keyCode ==40){
        if(yVelocity ==-1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    if(event.keyCode ==37){
        if(xVelocity ==1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    if(event.keyCode ==39){
        if(xVelocity ==-1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}



drawGame();