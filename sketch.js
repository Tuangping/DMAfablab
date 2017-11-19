var scene =[];
var pic1,num;
var color, alpha, playing;

function setup() {
    createCanvas(innerWidth, innerHeight);
    background("RED");
    textSize(30);
    fill("BLACK");
    noStroke();
    text("LOADING...", innerWidth/2,innerHeight/2);
    for(var i=1; i<2; i++){
    console.log("video loaded: "+i);
    scene[i] = document.querySelector('video');
    scene[i] = createVideo(['scenes/scene'+i+'.webm', 'scenes/scene'+i+'.mp4']);
    scene[i].attribute('playsinline', '');
    window.enableInlineVideo(scene[i]);
    scene[i].hide();
}
     //to hide the extra video on html canvas
    scene[1].play() //to show first frame of the video
    scene[1].pause(); //to stop it from playing right away
    pic1 = loadImage("elements/numpad.png");
    playing = false;
    imageMode(CENTER);
    angleMode(DEGREES);
    color = 255;
    alpha = 100;
}

function draw() {
    noStroke();
    push();
    translate(windowWidth / 2, windowHeight / 2);
    noTint();
    rotate(90);
    image(scene[1], 0, 0);
    pop();

    if (playing) {
        tint(255, 100);
        image(pic1, windowWidth / 2, 350,1000,750);
    }

    fill(color, 0, 0, alpha);
    ellipse((windowWidth / 2) - 30, (windowHeight / 2) + 30, 100, 100);
    console.log("video time: "+round(scene[1].time()));


}

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
        scene[1].stop();
    } else {
       scene[1].play();
        scene[1].time(4);

    }
    playing = !playing;

    return false;
}

function touchMoved() {
    // if (touchX > (windowWidth / 2) - 100 && touchX < (windowWidth / 2)+50) {
    //   if(touchY < (windowHeight/2)+80 && touchY>(windowHeight/2)-80){
    //   console.log("hit");
    //      color=100;
    //   }
    // }

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
        scene[1].stop();
    } else {
        scene[1].play();
       scene[1].time(4);

    }
    playing = !playing;

}