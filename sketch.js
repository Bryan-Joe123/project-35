var dog, happyDog,foodS;
var database, foodStock;
 

function preload(){
    happyDog=loadImage("happydog.png")
}

function setup(){
    createCanvas(500,500);
    database=firebase.database();
    dog = createSprite(250,250,10,10);
    dog.shapeColor = "red";
    dog.addImage(happyDog);
    dog.scale=0.2;

    //Refering to the database position
    foodStock=database.ref('pet/food');
    foodStock.on("value",readStock,showError);
}

function draw(){
    background("white");
    textSize(20);
    text("Food: "+foodS,200,150)
    if(foodS != undefined){
        if(keyDown(UP_ARROW)){
            writeStock(5);
        }
    }
    drawSprites();
}

function writeStock(amount){
    database.ref('pet/food').set(
        {
            food:foodS+amount
        }
    )
    console.log(foodS);
}

function readStock(data){
    foodS=data.val();
    foodS=foodS.food;
}

function showError(){
    console.log('Error');
}
