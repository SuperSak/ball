var ball, position;
var database;

function setup(){
    database=firebase.database()
    createCanvas(500,500);
    ball = createSprite(250,250,20,20);
    ball.shapeColor = "orange";
    
    var ballPosition=database.ref('ball/position')
    ballPosition.on("value", readPosition, showError)

}


function draw(){
    background("white");
    
    if(position!==undefined){
        if(keyDown(LEFT_ARROW)){
        changePosition(-2,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(2,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-2);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,2);
        }
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref("ball/position").set({
        "x":position.x+x,
        "y":position.y+y
    });
   
}

function readPosition(data){
    position=data.val()
    ball.x = position.x
    ball.y = position.y
}

function showError(){
    console.error("The problem is: our database is bad");
}