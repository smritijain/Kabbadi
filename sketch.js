// add your code here
var redPlayer, database;
var position1, position2
var yellowPlayer;
var redPanimation, yellowPanimation;
var gameState;
var redPlayerScore;
var yellowPlayerScore;

function preload(){
    redPanimation= loadAnimation("assests\player1a.png","assests\player1b.png","assests\player1a.png","assests\player1b.png");
    yellowPanimation= loadAnimation("assests\player2a.png","assests\player2b.png","assests\player2a.png","assests\player1b.png");
}

function setup(){
    database= firebase.database();
    createCanvas(600,600);
    redPlayer= createSprite(300,250,10,10);
    redPlayer.shapeColor="red";
    redPlayer.addAnimation("walking",redPanimation);
    redPanimation.frameDelay =200;
    redPlayer.scale =0.5;
    redPlayer.setCollider("circle",0,0,60);

    var redPlayerPos= database.ref('redPlayer/position1');
    redPlayerPos.on("value",readPosition, showError);

    yellowPlayer= createSprite(300,250,10,10);
    yellowPlayer.shapeColor="Green";
    yellowPlayer.addAnimation("walking",yellowPanimation);
    yellowPanimation.frameDelay =200;
    yellowPlayer.scale =0.5;
    yellowPlayer.setCollider("circle",0,0,60);

    var redPlayerPos= database.ref('redPlayer/position1');
    redPlayerPos.on("value",readPosition2, showError);

    gameState= database.ref('gameState/');
    gameState.on("value",readGS,showError);
    
    redPlayerScore=database.ref('player1Score/');
    redPlayerScore.on("value",readScore1,showError);

    yellowPlayerScore= database.ref('gameState/');
    yellowPlayerScore.on("value",readScore2,showError);
}
function draw(){
    background("white");

    if(gameState===0){
         fill("Black");
         text("Press space to start the toss",100,200);
    
    
        if(keyDown("space")){
            rand=Math.round(random(1,2))
            if(rand===1){
                database.ref('/').update({
                'gameState': 1
            })
            alert("RED Turn");
        }
        if(rand===2){
                database.ref('/').update({
                'gameState': 2
            })
            alert("YELLOW Turn");
        }
        database.ref('player1/position').update({
            'x': 150,
            'y': 300
        })
        database.ref('player1/position').update({
            'x': 450,
            'y': 300
        })
        }
    }

if(gameState===1){
    if(keyDown(LEFT_ARROW))
    {
        writePosition(-5,0);
    }   
    else if(keyDown(RIGHT_ARROW))
    {
        writePosition(5,0);
    }   
    else if(keyDown(UP_ARROW))
    {
        writePosition(0,-5);
    }   
    else if(keyDown(DOWN_ARROW))
    {
        writePosition(0,+5);
    }
    else if(keyDown("w")){
        writePosition2(0,-5);
    }
    else if(keyDown("d")){
        writePosition2(0,+5);
    }

    if(redPlayer.x>500){
        database.ref('/').update({
            'player1Score': redPlayerScore - 5,
            'player2Score': yellowPlayerScore + 5,
            'gameState':0
        })
        
    }
    if(redPlayer.isTouching(yellowPlayer)){
        database.ref('/').update({
            'gameState': 0,
            'player1Score': redPlayerScore + 5,
            'player2Score': yellowPlayerScore -5

        })
        alert(" Red has lost");
    }
}

if(gameState===2){
    if(keyDown("a"))
    {
        writePosition(-5,0);
    }   
    else if(keyDown("s"))
    {
        writePosition(5,0);
    }   
    else if(keyDown("w"))
    {
        writePosition(0,-5);
    }   
    else if(keyDown("d"))
    {
        writePosition(0,+5);
    }
    else if(keyDown("UP_ARROW")){
        writePosition2(0,-5);
    }
    else if(keyDown("DOWN_ARROW")){
        writePosition2(0,+5);
    }

    if(yellowPlayer.x<150){
        database.ref('/').update({
            'player1Score': redPlayerScore + 5,
            'gameState':0,
            'player2Score': yellowPlayerScore - 5
            
        })
    }
    if(redPlayer.isTouching(yellowPlayer)){
        database.ref('/').update({
            'gameState': 0,
            'player1Score': redPlayerScore - 5,
            'player2Score': yellowPlayerScore +5

        })
        alert(" Yellow has lost");
    }
}
    drawSprites();
}

function writePosition1(x,y){
    database.ref('player1/position').update({
        'x': redPlayer.x + x,
        'y': redPlayer.y + y
    });
}

//updating player2 position in database
function writePosition2(x,y){
    database.ref('player2/position').update({
        'x': yellowPlayer.x + x,
        'y': yellowPlayer.y + y
    });
}

//function to update game state in database
function updateState(s){
    database.ref('/').update({
        'gameState': s
    });
}

//function to update toss in database
function updateToss(t){
    database.ref('/').update({
        'toss': t
    });
}

//function to update players' score in database
function writeScore(s1,s2){
    database.ref('/').update({
        'player1Score': redPlayerScore+s1,
        'player2Score': yellowPlayerScore+s2
    });
}

//function to reset player1 to original position
function resetPosition1(){
    database.ref('player1/position').update({
        'x': 400,
        'y': 300
    });
}

//function to reset player2 to original position
function resetPosition2(){
    database.ref('player2/position').update({
        'x': 200,
        'y': 300
    });
}




