let inputDir={x:0,y:0};
// importing sound files
const foodsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
const musicsound = new Audio('music.mp3');
let speed = 5;
let lastPaintTime=0;
let SnakeArr=[{x:13,y:15}];
let food={x:6,y:7};
let score =0;

let scorebox = document.querySelector("#scorebox");
let highscorebox = document.querySelector("#highscorebox");
let reset = document.querySelector("#reset");

// GAME FUNCTIONS//

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function gameEngine(){
    //1:updating snake and food
    if(isCollide(SnakeArr)){
        gameoversound.play();
        musicsound.pause();
        inputDir ={x:0,y:0};
        

        alert("Game Over!! Score: "+score+" press any key to start again");
        SnakeArr={x:13,y:15};
        musicsound.play();
        score=0;
    }

    //if eaten food..increment score and regenerate food
    if(SnakeArr[0].y===food.y && SnakeArr[0].x===food.x  ){//eating
        foodsound.play();
        SnakeArr.unshift({x:SnakeArr[0].x+inputDir.x,y:SnakeArr[0].y+inputDir.y});
        score = score+1;
       if(score>highval){
        highval = score;
        localStorage.setItem("highscore",JSON.stringify(highval));
        highscorebox.innerHTML="HISCORE : "+highscore;
       }
       scorebox.innerHTML="SCORE : "+score;
       
        
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};//generate random coordinated for food
    }


    //moving the snake
    for(let i=SnakeArr.length-2;i>=0;i--){
       
        SnakeArr[i+1] = {...SnakeArr[i]}
    }
    SnakeArr[0].x += inputDir.x;
    SnakeArr[0].y +=inputDir.y; 
        

    //2:display the snake and food
    //display the snake
    board.innerHTML="";
    SnakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart =e.y;
        snakeElement.style.gridColumnStart =e.x;
        
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart =food.y;
    foodElement.style.gridColumnStart =food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//reset
const Reset=()=>{
    snakeArr={x:13,y:15};
    food={x:6,y:7};
    score =0;
}












// MAIN LOGIC STARTS HERE//

let highscore = localStorage.getItem("highscore");
if(highscore===null){
    highval=0;
    localStorage.setItem("highscore",JSON.stringify(highval));
}
else{
    highval = JSON.parse(highscore);
    highscorebox.innerHTML="HIGHSORE : "+highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir ={x:0,y:1}//startb the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("Arrowup");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("Arrowdown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("Arrowleft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("Arrowright");
            inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }
});

function isCollide(SnakeArr){//when the snake collides
   //if u bump into urself
    for(let i=1;i<SnakeArr.length;i++){
         
        if(SnakeArr[0].x===SnakeArr[i].x && SnakeArr[0].y===SnakeArr[i].y){
            return true;
        }
    }
        //if u bump into border of board
        if(SnakeArr[0].x>=18 || SnakeArr[0].x <=0 || SnakeArr[0].y>=18 || SnakeArr[0].y <=0){
            return true;
        }
    
}