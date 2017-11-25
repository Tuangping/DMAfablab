var scene =[];
var state,password;
var color, alpha, playing,showpic;
var lat,lon,locationData;
var clickAble;
//state1+ fablab180
var pic1,x_pos, last_x, last_move, last_y;
var rotations = [];
var myFont,blink;

// state 2-3,5
var blade, wheel, graphic_y;
var rotateDirection = 'clockwise';
var rY, pRY, frame;

//state 4
var matt_x,matt_y,isCut;

//state 6
var trigger, color_s6;
var nextMove, operating,howto;

function preload(){
    locationData =  getCurrentPosition();
    myFont = loadFont('font/LemonMilk.otf');
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    console.log(locationData.latitude);
    navigator.geolocation.watchPosition(doThisOnLocation);   
    background("RED");
    blink=0;
    textAlign(CENTER);
    textFont(myFont);
    textSize(50);
    fill("BLACK");
    noStroke();
    text("LOADING...", innerWidth/2,innerHeight/2);
    /////////
    for(var i=1; i<7; i++){
        console.log("video loaded: "+i);
        scene[i] = document.querySelector('video');
        scene[i] = createVideo(['scenes/scene'+i+'.webm', 'scenes/scene'+i+'.mp4']);
        scene[i].attribute('playsinline', '');
        window.enableInlineVideo(scene[i]);
        scene[i].hide();
    }
    //to hide the extra video on html canvas
    state=1;
    scene[state].play() //to show first frame of the video
    scene[state].pause(); //to stop it from playing right away
    password=createInput();
    password.position(windowWidth/2-100,windowHeight/2-50);
    password.attribute('size','20');
    password.hide();
    pic1 = loadImage("scenes/fablab1.jpg");
    for (var i = 0; i < 80; i++) { // change number here to affect smooth
        rotations.push(0);
    }
    //////////
    playing = false;
    showpic=false;
    clickAble=true;
    isCut=false;
    imageMode(CENTER);
    angleMode(DEGREES);
    color = 255;
    alpha = 100;
    frame=0;
    matt_x = windowWidth/2-60;
    matt_y = windowHeight-200;
    //////////
    trigger = 0;
    color_s6 = "GREEN";
    nextMove = false;
    operating = false;
    howto="";

}
function doThisOnLocation(position){
    fill(0);
    textSize(20);
    lat=position.latitude;
    lon=position.longitude;
    textAlign(LEFT);
    text("Latitude: "+lat,40,200);
    text("Longitude: "+lon,40,250);
}

function draw() {
    //    push();
    //    translate(windowWidth / 2, windowHeight / 2);
    //    noTint();
    //    rotate(90);
    //    console.log("state: "+state);
    //    if (state ==6){ 
    //        console.log("state 6");
    //    }
    //    else {
    //        image(scene[state],windowWidth / 2, windowHeight / 2);
    //    }
    //    pop();
    ////////

    noStroke();
    console.log("isPlaying: "+playing);
    console.log("showpic: "+showpic);
    if (state==1){
      
        image(scene[state],windowWidth / 2, windowHeight / 2);
        doThisOnLocation(locationData);
        console.log("lat: " + locationData.latitude);
        console.log("long: " + locationData.longitude);
        fill(color, 0, 0, alpha);
        ellipse((windowWidth / 2) - 30, (windowHeight / 2) + 30, 100, 100);
        if(playing) {
            console.log("video time: "+round(scene[state].time()))
            textAlign(CENTER);
            textSize(16);
            fill("YELLOW");
            text("if cannot be at the location, type in password here", windowWidth/2, windowHeight/2-100);       
            password.show();
            //        password.attribute('maxlength','5');
            if(lat>=33.5&&lat<34.5&&lon>=-119&&lon<-118){          if(scene[state].time()==scene[state].duration()){
                console.log("show pic");
                scene[state].stop();
                //state=2;
                alpha = 100;
                playing=false;
                showpic=true;
            }
                                                        }
        }else{
              blinking();
        }
        if(showpic){
            password.remove();
            rotations.push(rotationZ);
            rotations.shift();
            var curRotation = 0;
            for (var i = 0; i < rotations.length; i++) {
                curRotation += rotations[i];
            }
            curRotation /= rotations.length;
//            if(curRotation<5){
//                curRotation=0;
//            } else if(curRotation>windowWidth){
//                curRotation=275;
//            }
            imageMode(CORNER,CENTER);
            image(pic1, round(curRotation)*7, 0, pic1.width*5, pic1.height*5);
            imageMode(CENTER);
            fill(255,0,0,alpha);
            ellipse(((pic.widht/2)-80)+(round(curRotation)*7),windowHeight/2-120,50,50);
            textAlign(CENTER);
            fill(color, 0, 0, 255);
            textSize(50);
            text("now ro z", 150,500);
            text("WELCOME to Fab lab!", windowWidth/2,100 );
            textSize(30);
            text("We have many machines and materials for you to explore. However, since you are first time here, how about making some basic cut with one of the most common machines.Let's use the table saw(: ", 80, 150, windowWidth-120, windowHeight/2);
            text("curRo= "+round(curRotation), 150, windowHeight - 100);
            fill("YELLOW");
            text("Ro Z = "+round(rotationZ), 300, windowHeight - 100);
         
        }
    }else if (state==2){
        image(scene[state],windowWidth / 2, windowHeight / 2);
        rotateWheel();
        fill(color, 0, 0, alpha);
        ellipse((windowWidth / 2) - 30, (windowHeight / 2) + 30, 100, 100);
        console.log("in 2");
        console.log("video time: "+round(scene[state].time()));
        password.remove();
        fill(color, 0, 0, 255);
        textSize(50);
        text(rotateDirection, windowWidth-200, windowHeight/2 - 50);
        text(playing + ": " + round(scene[state].time()), 150, 150);
    }else if (state==3){
        image(scene[state],windowWidth / 2, windowHeight / 2);
        rotateWheel();
        fill(color, 0, 0, alpha);
        ellipse((windowWidth / 2) - 30, (windowHeight / 2) + 180, 100, 100);
        console.log("in 3");
        console.log("video time: "+round(scene[state].time()));
        fill(color, 0, 0, 255);
        textSize(50);
        text(rotateDirection, windowWidth-200, windowHeight/2 - 50);
        text(playing + ": " + round(scene[state].time()), 150, 150);

    }else if (state ==4){
        image(scene[state],windowWidth / 2, windowHeight / 2);
        console.log("in 4");
        console.log("video time: "+round(scene[state].time()));
        if(round(scene[state].time())==0){
            fill(color, 0, 0, alpha);
            ellipse(windowWidth-50,windowHeight/2, 100, 100);
        }else if (round(scene[state].time())==4){
            scene[state].pause();
            playing=false;
            fill(color, 0, 0, 100);
            ellipse(windowWidth-200,windowHeight-50, 100, 100);
        }else if (round(scene[state].time())==11){
            scene[state].pause();
            playing=false;
            fill(color, 0, 0, 100);
            ellipse(250,windowHeight/2-100, 100, 100);
        }else if (round(scene[state].time())>=25){
            fill(255,0,0,100);
            rectMode(CENTER);
            rect(matt_x,matt_y,700,350);
            runningSaw();
        }
    }else if (state ==5){
        image(scene[state],windowWidth / 2, windowHeight / 2);
        rotateWheel();
        rectMode(CORNER);
        fill(color, 0, 0, alpha);
        ellipse(windowWidth / 2, 200, 100, 100);
        fill(color,0,0,100);
        rect(0,windowHeight/2+270,windowWidth, 110);
        console.log("in 5");
        console.log("video time: "+round(scene[state].time()));
        fill(color, 0, 0, 255);
        textSize(50);
        text(rotateDirection, windowWidth-200, 500 );
        text(playing + ": " + round(scene[state].time()), 150, 150);
    }else if (state ==6){
        image(scene[state],windowWidth / 2, windowHeight / 2);
        console.log("in 6");
        //        text("video time: "+scene[state].time(),20,50);
        textSize(40);
        textAlign(LEFT);
        //        fill("BLACK");
        //        text("accelerationX = " + round(accelerationX) + "Y =" + round(accelerationY) + "Z =" + round(accelerationZ), 20, 200);
        //        fill("YELLOW");
        //        text("rotationX = " + round(rotationX) + " | ro Y =" + round(rotationY)+ " | ro Z =" + round(rotationZ), 20, 250);
        fill("RED");
        text("step: " + trigger ,20,350);
        text("touching: " + operating, 20, 400);
        fill("YELLOW");
        text(howto,20,450,windowWidth/2-100,windowHeight/2);
        //        text("next move: " + nextMove, 20, 450);
        //        text("playing: " +playing, 20,500);

        fill(color_s6);
        checkSaw();

    }
}//password is 34118 (LAT 34.07603371, -118.44086627)
function touchStarted() {
    if(clickAble){
        //        if(state==6){
        //            if(operating){
        //                scene[state].play();
        //            }else{
        //                scene[state].pause();
        //            }
        //        }
        //    }else{
        if (playing && !showpic) {
            alpha = 100;
            scene[state].pause();
        } else if (!playing && !showpic) {
            scene[state].play();
        } else if (!playing && showpic){
            state= 2;
            showpic=false;
        } else{
            scene[state].play();
        }
        //    }
        ///////--------------------------------////////
        if(state==1 ||state==2){
            if (mouseX > (windowWidth / 2) - 100 && mouseX < (windowWidth / 2) + 50) {
                if (mouseY < (windowHeight / 2) + 80 && mouseY > (windowHeight / 2) - 20) {
                    console.log("hit");
                    alpha = 0;
                }
            } else {
                color = 255;

            }
        }else if (state==3){
            // ellipse((windowWidth / 2) - 30, (windowHeight / 2) + 180, 100, 100);
            if (mouseX > (windowWidth / 2) - 80 && mouseX < (windowWidth / 2) + 20) {
                if (mouseY < (windowHeight / 2) + 230 && mouseY > (windowHeight / 2) + 130) {
                    console.log("hit");
                    alpha = 0;
                }
            } else {
                color = 255;

            }
        }else if (state==4){
            if(round(scene[state].time())==0){
                if (mouseX > (windowWidth / 2) - 100 && mouseX < (windowWidth / 2) + 50) {
                    if (mouseY < (windowHeight / 2) + 180 && mouseY > (windowHeight / 2) + 130) {
                        console.log("hit");
                        alpha = 0;
                    }
                } else {
                    color = 255;

                }
            }else if(round(scene[state].time())==4){  //windowWidth-200,windowHeight-50, 100, 100
                if (mouseX > windowWidth - 250 && mouseX < windowWidth-150) {
                    if (mouseY < windowHeight && mouseY > windowHeight - 100) {
                        console.log("hit");
                        alpha = 0;
                        scene[state].time(5);
                    }
                } else {
                    color = 255;

                }
            }else if(round(scene[state].time())==11){ //ellipse(250,windowHeight/2-100, 100, 100);

                if (mouseX > 200 && mouseX < 300) {
                    if (mouseY < 850 && mouseY > 720) {
                        console.log("hit");
                        alpha = 0;
                        scene[state].time(12);
                    }
                } else {
                    color = 255;

                }
            }else if(round(scene[state].time())>=25){
                if (!isCut){
                    scene[state].play();
                    clickAble=false;
                } else{
                    state=5;
                    isCut=false;
                }

            }
        }else if (state==5){
            if (mouseX > windowWidth/2 - 50 && mouseX < windowWidth/2+150) {
                if (mouseY < 250 && mouseY > 150 ) {
                    console.log("hit");
                    alpha = 0;
                }
            } else {
                color = 255;

            }
        } else {
            console.log("clickable in 6");
            operating =true;
        }

        playing = !playing;
    }
    return false;
}
function touchEnded(){
    operating=false;
    return false;
}
function touchMoved() {
    if(round(scene[state].time())>=25){
        matt_x = mouseX;
        matt_y = mouseY;
    }
    return false;
}
function rotateWheel() {
    var endState;
    if (state ==5){
        endState=20;
    }else{
        endState=round(scene[state].duration());
    }

    if (playing) {
        rY = rotationY + 180;
        pRY = pRotationY + 180;
        if ((rY - pRY > 0 && rY - pRY < 180) || rY - pRY < -180) {
            rotateDirection = 'clockwise';
            if(frame<34){
                frame+=0.25;
            }else if(frame>=0){
                frame=34;
            }
            scene[state].time(frame);
        } else if (rY - pRY < 0 || rY - pRY > 180) {
            rotateDirection = 'counter-clockwise';
            if(frame>0){
                frame-=0.25;
            }else if(frame<=0){
                frame=0;
            }
            scene[state].time(frame);
        }
    }

    if(round(scene[state].time())==endState){
        fill(0,255,100);
        textSize(40);
        rotateDirection="Next, adjust the blade's height.";
        scene[state].pause();
        alpha=100;
        if(mouseIsPressed){
            state++;
            console.log(state);
            playing=false; 
        }
    }

}
function runningSaw(){
    console.log("machine is running.");
    if(round(scene[state].time())==27){
        scene[state].time(26);
    }
    //    strokeWeight(20);
    //    stroke(255);
    //    alpha = 100;
    //    line(windowWidth/2-20,windowHeight/2+100,windowWidth/2-20,windowHeight/2+300 );
    //    // wood size : rect(matt_x,matt_y,700,350);
    if(mouseX-350<windowWidth/2-20 && mouseX+350> windowWidth/2-20 && mouseY-175<windowHeight/2+300  && mouseY+175>windowHeight/2+100  ){
        fill("YELLOW");
        noStroke(); 
        textSize(60);
        text("CUT!!",windowWidth/2,300);
        isCut=true;
    }
    if (isCut){
        if(mouseY+175<windowHeight/2+100){ //the wood has went pass the saw already
            fill("YELLOW");
            noStroke(); 
            textSize(60);
            text("--DONE--",windowWidth/2,300);
            scene[state].pause();
            clickAble=true;
        }
    }
}
function checkSaw() {

    if (operating) {
        //check if move
        if (round(accelerationX) == 0 && round(accelerationY) == 0 && round(accelerationZ) == 0) {
            nextMove = true;
        }

        //run ball
        if (trigger == 0 && nextMove && round(rotationX) >=75 && round(rotationX) <=95 && round(accelerationX) <= -3  ){
            howto="While still pressing the button, pull the handler close to you."
            scene[state].play();
            scene[state].time(6);
            trigger = 1;
            nextMove = false;
        }
        if (trigger == 1 && nextMove && round(rotationX) >=75 && round(rotationX) <=95 && round(accelerationY) >= 10){
            howto="While still pressing the button, pull down the handler."
            scene[state].play();
            scene[state].time(8);
            trigger = 2;
            nextMove = false;
        }
        if (trigger == 2 && nextMove && round(rotationX) >=75 && round(rotationX) <=95 && round(accelerationY) >= 3){
            howto="While still pressing the button, push the handler back to cut your materail."
            scene[state].play();
            scene[state].time(16);
            trigger = 3;
            nextMove = false;
        }
        if (trigger == 3 && round(accelerationX) == 0 && round(accelerationY) == 0 && round(accelerationZ) == 0) {

        }	
    }
    // 
    if(round(scene[state].time())==0){
        scene[state].time(2);
        howto="Press button with your thumb and hold it."
    } else if (round(scene[state].time())==5){    
        scene[state].pause();
    } else if (round(scene[state].time())==7){
        scene[state].pause();
    } else if (round(scene[state].time())==15){
        scene[state].pause();
    }else if (round(scene[state].time())==22){
        scene[state].pause();
    }
}

function blinking(){
    if (alpha>=180){
        alpha = 0;
    }else {
        alpha +=20;
    }    
}
//function mousePressed() {
//    if(state==1 ||state==2){
//        if (mouseX > (windowWidth / 2) - 100 && mouseX < (windowWidth / 2) + 50) {
//            if (mouseY < (windowHeight / 2) + 80 && mouseY > (windowHeight / 2) - 20) {
//                console.log("hit");
//                alpha = 0;
//            }
//        } else {
//            color = 255;
//        }
//    }else if (state==3){
//        if (mouseX > (windowWidth / 2) - 100 && mouseX < (windowWidth / 2) + 50) {
//            if (mouseY < (windowHeight / 2) + 180 && mouseY > (windowHeight / 2) + 130) {
//                console.log("hit");
//                alpha = 0;
//            }
//        } else {
//            color = 255;
//        }
//    }else if (state==4){
//        if(round(scene[state].time())==0){
//            if (mouseX > (windowWidth / 2) - 100 && mouseX < (windowWidth / 2) + 50) {
//                if (mouseY < (windowHeight / 2) + 180 && mouseY > (windowHeight / 2) + 130) {
//                    console.log("hit");
//                    alpha = 0;
//                }
//            } else {
//                color = 255;
//            }
//        }else if(round(scene[state].time())==4.0){  //windowWidth-200,windowHeight-50, 100, 100
//            if (mouseX > windowWidth - 150 && mouseX < windowWidth + 250) {
//                if (mouseY < windowHeight && mouseY > windowHeight - 100) {
//                    console.log("hit");
//                    alpha = 0;
//                }
//            } else {
//                color = 255;
//            }
//        }
//    }
//
//
//    ///////--------------------------------////////
//    if (playing && !showpic) {
//        alpha = 100;
//        scene[state].pause();
//    } else if (!playing && !showpic) {
//        scene[state].play();
//    } else if (!playing && showpic){
//        state= 2;
//        showpic=false;
//    }else{
//        scene[state].play();
//    }
//    playing = !playing;
//}
