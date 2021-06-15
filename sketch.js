var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood, feed;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  lastFed = database.ref('FeedTime')

  //Questions...
  // ^lastFed ref Not working. It gives a url link. 
  // vThe text comands bellow don't change ouptput even if I adjust the parameters(color, stroke, x, y)
  
  //write code to display text lastFed time here
  strokeWeight(4)
  
  if (lastFed>=12){
    text("Last Feed: " + lastFed - 12 + " PM", 300, 90)
  }
  else if(lastFed==0){
    text("Last Feed: 12 AM", 300, 90)
  }
  else{
    text("Last Feed: " + lastFed + " AM", 300, 90)
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);

}


function feedDog(){
  dog.addImage(happyDog);

  //foodObj.deductFood();
  //foodS = getFoodStock();
  
  foodS--;
  
  database.ref('/').set({
    'FeedTime': hour(),
      'Food': foodS
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
