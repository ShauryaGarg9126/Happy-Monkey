var PLAY=1;
var END=0;
var gameState = 1;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var obstacleGroup,bananaGroup;
var obstacle;
var survivalTime=0;

 score=0;

function preload(){
  
  
  monkey_running =        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
 //createCanvas(600,400);
  
    monkey=createSprite(100,310,20,20);

  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.12;
  
  
  ground=createSprite(400,350,1000,10);
  ground.x= ground.width/2;
  ground.velocityX=-4;
  console.log(ground.x);
  
 score=0;
  
  obstacleGroup= createGroup();
  bananaGroup= createGroup();
}



function spawnObstacles() {
  
  if (frameCount % 200=== 0){
   var obstacle = createSprite(600,310,10,40);
   obstacle.velocityX = -5;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.lifetime=120;
    obstacleGroup.add(obstacle);
   }
  
}

function spawnBanana() {
  
  if (frameCount % 100 === 0){
   var banana = createSprite(300,150,20,20);
   banana.velocityX=-5;
   banana.addImage(bananaImage);
   banana.scale=0.1;
 banana.lifetime=50;
    bananaGroup.add(banana);

  
  }
}
function reset() {
  gameState=1;
  survivalTime=0;
   monkey.visible=true;
  
}

function draw() {
  background("lightblue");
  
 if (gameState===PLAY) {
 
    spawnObstacles();
    spawnBanana();
   stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime,50,50);
   
   
    
 if (bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    score = score+2;
   
  
  
   }
  else{
    
    if(obstacleGroup.isTouching(monkey)) {
     
      gameState=END;
      score=0;
      monkey.x=100;
      monkey.y=310;
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      bananaGroup.setLifetimeEach(-1);
      ground.velocityX=0;
      monkey.velocityY= 0;
       monkey.visible=false;
     text("Press R To Restart",100,200);
      survivalTime=0;
      
    }
      
    
    }
 }
  if(keyDown("R")) {
        reset();
    monkey.visible=true;
    
      }
  
     
      if(keyDown("space")&& monkey.y >= 100) {
     monkey.velocityY=-12;
      
  
  }
   monkey.velocityY= monkey.velocityY+0.6;
  monkey.collide(ground);
  
   if (ground.x < 0){
      ground.x = ground.width/2;
   }


  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,300,50);
  
  
}
 
