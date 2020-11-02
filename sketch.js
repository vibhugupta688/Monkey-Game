var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var cSound;
var endSound;
var lifetime;
var ig;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
endSound = loadSound("331912__kevinvg207__wrong-buzzer (1).wav");
  cSound = loadSound("166184__drminky__retro-coin-collect.wav");
}



function setup() {
  
  createCanvas(500,400);
  
FoodsGroup = createGroup();
obstacleGroup = createGroup();
ground= createSprite(400,350,9000000000,10);
ground.shapeColor=rgb(11,102,35);
  ground.velocityX=-7;
  ground.x=ground.width/2;
  ground2= createSprite(0,395,9000000000,80) 
  ground2.shapeColor=rgb(34,139,34);
  
  monkey = createSprite(70,330);
  monkey.addAnimation("running",monkey_running)
monkey.scale = 0.12;
  
  ig = createSprite(200,365,400,10);
  ig.visible=false;
  
  
  lifetime=100;
  
}


function draw() {
  background(135,206,235);
  
  textSize(30);
  fill("black");
  
  
  
  if (gameState===PLAY){
    text("Lifetime : "+lifetime,170,90);
   if(keyDown("space")  && monkey.y>300){
    monkey.velocityY= monkey.velocityY-6;
  }
  monkey.velocityY= monkey.velocityY+0.7;
  monkey.collide(ig);  
    
    if(frameCount%7==0){
      lifetime=lifetime-1;
    }
    
    
    spawnFood();
    if(monkey.isTouching(FoodsGroup)){
      FoodsGroup.destroyEach();
    lifetime=lifetime+10;
      cSound.play();
    }
    
    spawnObstacles();

  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
    endSound.play();
  }
    
    if(lifetime===0){
    gameState=END;
    endSound.play();
  }
    
  }
  monkey.debug=false;
  
 if(gameState===END){
   
   monkey.destroy();
   obstacleGroup.destroyEach();
   FoodsGroup.destroyEach();
   
   textSize(40);
   stroke("yellow");
   text("Game Over",150,200)
 }
  
  
  
  
drawSprites();
  
}
function spawnFood(){
  
  if(frameCount%80===0){
   
    food = createSprite(500,200);
  food.addImage(bananaImage);
  food.scale=0.08;
    food.velocityX=-6;
    food.y=Math.round(random(120,270));
    FoodsGroup.add(food);
    
    
  }
}

function spawnObstacles(){
  if(frameCount%150===0){
   
    obstacle = createSprite(500,335);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.1;
    obstacle.velocityX=-6;
    obstacleGroup.add(obstacle);
    
    
  }
  
}





