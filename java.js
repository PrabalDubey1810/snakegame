//game constant and variable
let inputDir = {x: 0, y: 0};
const foodsound =new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
const musicsound = new Audio('music.mp3');
let speed=10;
let score = 0;
let lastPaintTime =0;
let snakearr=[
    {x:13,y:15}
];

food = {x:6,y:7};

//game function
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime- lastPaintTime)/1000 <1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}


function gameEngine()
{
    //Part 1: Updating the snake array and food;
    if(isCollide(snakearr)){
        gameOverSound.play();
        musicsound.pause();
        inputDir={x: 0, y: 0};
        alert("Game over Press any key to restart the game!");
        snakearr=[{x:13,y:15}];
        musicsound.play();
        score=0;
    }

    //if you have eaten the food,increament the score and regenerate the food
    if(snakearr[0].y===food.y && snakearr[0].x===food.x){
        foodsound.play();
        score+=1;
        scoreBox.innerHTML ="Score: "+score;
        snakearr.unshift({x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}//generating random number between a and b
    }

    //moving the snake
    for (let i = snakearr.length - 2; i>=0; i--) {
        snakearr[i+1]={...snakearr[i]};//removing the reference problem thus creating an object

    }

    snakearr[0].x +=inputDir.x;
    snakearr[0].y +=inputDir.y;

    //Part2: Display the snake and food;

    //Display the snake
    board.innerHTML = "";
    snakearr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        if(index === 0){
            snakeElement.classList.add('head');
        }
        board.appendChild(snakeElement);        
    });
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);  
}


//main logic starts
let hiscore = localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval= 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}

else{
    hiscore= JSON.parse(hiscore);
    hiscoreBox.innerHTML="Hiscore:"+hiscore;
}
window.requestAnimationFrame(main);//better than setinterval highfps
window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1} //start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;            
            break;

        case"ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;

        case"ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case"ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;

        default:
            break;
    }

});
