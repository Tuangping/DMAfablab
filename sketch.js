var scene =[];
var state,password;
var color, alpha, playing,showpic;
var lat,lon,locationData;

//scene1 fablab180
var pic1,x_pos, last_x, last_move, last_y;
var rotations = [];

// scene2-3
var blade, wheel, graphic_y;
var rotateDirection = 'clockwise';
var rY, pRY, frame;

function preload(){
    locationData =  getCurrentPosition();
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    console.log(locationData.latitude);
    navigator.geolocation.watchPosition(doThisOnLocation);   
    background("RED");
    textAlign(CENTER);
    textSize(50);
    fill("BLACK");
    noStroke();
    text("LOADING...", innerWidth/2,innerHeight/2);
    /////////
    for(var i=1; i<6; i++){
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
    imageMode(CENTER);
    angleMode(DEGREES);
    color = 255;
    alpha = 100;
    frame=0;


}
function doThisOnLocation(position){
    fill(0);
    textSize(20);
    lat=position.latitude;
    lon=position.longitude;
    text("Latitude: "+lat,100,200);
    text("Longitude: "+lon,100,250);
}

function draw() {
    //    push();
    //    translate(windowWidth / 2, windowHeight / 2);
    //    noTint();
    //    rotate(90);
    //    console.log("state: "+state);
    image(scene[state],windowWidth / 2, windowHeight / 2);
    //    pop();
    ////////
    noStroke();
    console.log("isPlaying: "+playing);
    if (state==1){
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
            if(lat>=33.5&&lat<34.5&&lon>=-119&&lon<-118){
                if(scene[state].time()==scene[state].duration()){
                    console.log("show pic");
                    scene[state].stop();
                    //                    state=2;
                    alpha = 100;
                    playing=false;
                    showpic=true;
                }
            }
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
            if(curRotation<5){
                curRotation=0;
            } else if(curRotation>windowWidth){
                curRotation=275;
            }
            image(pic1, round(curRotation)*7, windowHeight / 2, pic1.width*5, pic1.height*5);
            textSize(30);
            fill(color, 0, 0, 255);
            text("curRo= "+round(curRotation), 50 windowHeight - 100);
        }
    }else if (state==2){
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
        rotateWheel();
        fill(color, 0, 0, alpha);
        ellipse((windowWidth / 2) - 30, (windowHeight / 2) + 30, 100, 100);
        console.log("in 3");
        console.log("video time: "+round(scene[state].time()));
        fill(color, 0, 0, 255);
        textSize(50);
        text(rotateDirection, windowWidth-200, windowHeight/2 - 50);
        text(playing + ": " + round(scene[state].time()), 150, 150);

    }else if (state ==4){
        console.log("in 4");
    }
}//password is 34118 (LAT 34.07603371, -118.44086627)
function touchStarted() {
    if (mouseX > (windowWidth / 2) - 100 && mouseX < (windowWidth / 2) + 50) {
        if (mouseY < (windowHeight / 2) + 80 && mouseY > (windowHeight / 2) - 80) {
            console.log("hit");
            alpha = 0;
        }
    } else {
        color = 255;
    }
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
    playing = !playing;
    return false;
}

function mousePressed() {
    if (mouseX > (windowWidth / 2) - 100 && mouseX < (windowWidth / 2) + 50) {
        if (mouseY < (windowHeight / 2) + 80 && mouseY > (windowHeight / 2) - 80) {
            console.log("hit");
            alpha = 0;
        }
    } else {
        color = 255;
    }

    if (playing && !showpic) {
        alpha = 100;
        scene[state].pause();
    } else if (!playing && !showpic) {
        scene[state].play();
    } else if (!playing && showpic){
        state= 2;
        showpic=false;
    }else{
        scene[state].play();
    }
    playing = !playing;
}

function rotateWheel() {
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

    if(round(scene[state].time())==round(scene[state].duration())){
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