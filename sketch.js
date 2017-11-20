var scene =[];
var pic1,state,password;
var color, alpha, playing;
var lat,lon;
var locationData;

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
    pic1 = loadImage("elements/numpad.png");
    playing = false;
    imageMode(CENTER);
    angleMode(DEGREES);
    color = 255;
    alpha = 100;

}
function doThisOnLocation(position){
    fill(0);
    textSize(20);
    console.log("lat: " + position.latitude);
    console.log("long: " + position.longitude);
    lat=position.latitude;
    lon=position.longitude;
    text("Latitude: "+lat,100,200);
    text("Longitude: "+lon,100,250);
}

function draw() {
    //    background("RED");
//    push();
//    translate(windowWidth / 2, windowHeight / 2);
//    noTint();
//    rotate(90);
    image(scene[state],windowWidth / 2, windowHeight / 2);
//    pop();
    ////////
    noStroke();
    fill(color, 0, 0, alpha);
    ellipse((windowWidth / 2) - 30, (windowHeight / 2) + 30, 100, 100);
    console.log("video time: "+round(scene[state].time()));
    console.log("isPlaying: "+playing);
    if (state==1){
        doThisOnLocation(locationData);
        if(playing) {
            //        tint(255, 100);
            //        image(pic1, windowWidth / 2, 350,1000,750);
            textAlign(CENTER);
            textSize(16);
            fill("YELLOW");
            text("if cannot be at the location, type in password here", windowWidth/2, windowHeight/2-100);       
            password.show();
            //        password.attribute('maxlength','5');
            if(lat>=33.5&&lat<34.5&&lon>=-119&&lon<-118){
                if(scene[state].time()==scene[state].duration()){
                    console.log("state=2");
                    playing=false;
                    state=2;
                }
            }
        }
    }else if (state==2){
     password.remove();
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

    if (playing) {

        scene[state].stop();

    } else {
        alpha = 100;
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

    if (playing) {

        scene[state].stop();
    } else {
        alpha = 100;
        scene[state].play();
    }
    playing = !playing;
}