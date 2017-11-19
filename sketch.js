var scene1, pic1;
var color, alpha, playing;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("PINK");
  scene1 = document.querySelector('video');
  scene1 = createVideo(['scenes/scene1.webm', 'scenes/scene1.mp4']);

  scene1.attribute('playsinline', '');
  window.enableInlineVideo(scene1);
  scene1.hide(); //to hide the extra video on html canvas
  scene1.play() //to show first frame of the video
  scene1.pause(); //to stop it from playing right away
  pic1 = loadImage("elements/numpad.png");
  playing = false;
  imageMode(CENTER);
  angleMode(DEGREES);
  color = 255;
  alpha = 100;
}

function draw() {
  // console.log()
  noStroke();
  push();
  translate(windowWidth / 2, windowHeight / 2);
  noTint();
  rotate(90);
  image(scene1, 0, 0);
  pop();

  if (playing) {
    tint(255, 100);
    image(pic1, windowWidth / 2, 350,1000,750);
  }
  
  fill(color, 0, 0, alpha);
  ellipse((windowWidth / 2) - 30, (windowHeight / 2) + 30, 100, 100);
  console.log(round(scene1.time()));


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
    scene1.stop();
  } else {
    scene1.play();
    scene1.time(4);

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
    scene1.stop();
  } else {
    scene1.play();
    scene1.time(4);

  }
  playing = !playing;

}