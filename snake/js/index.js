//game constants and variables
let inputDir={x:0,y:0};
const foodsound=new Audio('musics/food.mp3');
const gameoversound=new Audio('musics/gameover.mp3');
const movesound=new Audio('musics/move.mp3');
const musicsound=new Audio('musics/music.mp3');
let speed=5; // it increases the speed of snake
let score=0;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}];//snake is arr beacause snake incresing after eating 
let food={x:6,y:7}; //not array
//game functions

function main(ctime){
        window.requestAnimationFrame(main); //game loop
        if((ctime-lastPaintTime)/1000 < 1/speed){ // at every 0.5 it repaints , 1000 becoz its miliseconds
            return;
        }
        lastPaintTime=ctime;
        gameEngine();

}
function isCollide(snake){
    //if u bump into urself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){//head hitted body segment
            return true;
        }
    }
    //if u bump into wall

        if (snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)//hitted to wall
    {
        return true;
    }
   
}

function gameEngine(){
    //part 1:  updating the snake array and food
    if(isCollide(snakeArr)){
        gameoversound.play();
        musicsound.pause();
        inputDir={x:0,y:0};//direction rechange
        alert("Game over press any key to play again");

        snakeArr=[{x:13,y:15}];
        musicsound.play();
        score=0;


    }
    //if u have eaten the food ,increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodsound.play();
        score+=1;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("HighScore",JSON.stringify(highscoreval));
             highScoreBox.innerHTML="HighScore:"+highscoreval;

        }
        scoreBox.innerHTML="Score:"+score;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y:snakeArr[0].y + inputDir.y})
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}  // a and b are range in which we want to generate random number

    }
    //moving snake
    for(let i=snakeArr.length-2;i>=0;i--){
        
        snakeArr[i+1]={...snakeArr[i]};//destrucring 

    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //part 2:display the snake and food
    //display the snake 
    board.innerHTML=""; //empty board
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
      
        if(index === 0){
            snakeElement.classList.add('head');//initially snake is yellow
        }
        else{

        
        snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });
    //display the food
   
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);

}
//main logic starts here
 musicsound.play();
let HighScore=localStorage.getItem("HighScore");
if(HighScore === null){
    highscoreval=0;
    localStorage.setItem("HighScore",JSON.stringify(highscoreval));
}
else{
    highscoreval=JSON.parse(HighScore);
    highScoreBox.innerHTML="HighScore:"+HighScore;
}
window.requestAnimationFrame(main); // main is called then this w.raf in main will loop the game
window.addEventListener('keydown', e =>{ //when key is pressed
    //start the game
    inputDir={x:0,y:1}//when any key is pressed snake starts to move down y=1
    movesound.play();//plays sound
  
    switch(e.key){
        case "ArrowUp":
            console.log("Arrowup");
            inputDir.x=0;//directionchange
            inputDir.y=-1; //if moves up y decreasing 
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
