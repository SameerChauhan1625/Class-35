var ball;
var ballPosition;
var database;
function setup(){
    createCanvas(500,500);
    database = firebase.database();

    ball = createSprite(200,200,10,10);
    ball.shapeColor = "red";

//check for value change in the database

  var positionref = database.ref('ball/position')
  positionref.on("value",readpos,showerror);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}
// update the database
function changePosition(a,b){
    database.ref('ball/position').set(
        {

            'x' : ballPosition.x + a,
            'y': ballPosition.y + b
    })
}
//read from the database
function readpos(data){

    ballPosition = data.val();
    ball.x = ballPosition.x;
    ball.y = ballPosition.y;
}

function showerror(){

    console.log("there was an error reading the database");
}