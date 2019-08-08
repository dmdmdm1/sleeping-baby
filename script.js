const startImage = new Image();
startImage.src = "./images/baby-start.jpg";

const momImg = new Image();
momImg.src = "./images/momavatar.png";

const fryingPanImg = new Image();
fryingPanImg.src = "./images/frying-pan.png";

const bigPanImg = new Image();
bigPanImg.src = "./images/big-pan.png";

const panImages = [fryingPanImg, bigPanImg]

const coffeeImg = new Image();
coffeeImg.src = "./images/coffee.jpeg";

const crying1Img = new Image();
crying1Img.src = "./images/crying1.jpeg";

const crying2Img = new Image();
crying2Img.src = "./images/crying2.jpeg";

const crying3Img = new Image();
crying3Img.src = "./images/crying4.jpeg";

const crying4Img = new Image();
crying4Img.src = "./images/crying5.jpeg";

const crying5Img = new Image();
crying5Img.src = "./images/crying6.jpeg";

const cryingBabiesImages = [crying1Img, crying2Img, crying3Img, crying4Img, crying5Img];

let randomBabyImage = cryingBabiesImages[Math.floor(Math.random() * cryingBabiesImages.length)]

const sleepingBabyImage = new Image();
sleepingBabyImage.src = "./images/sleeping-baby.jpeg";

const pacifier = new Image();
pacifier.src = "./images/pacifier.jpeg";

let pacifiers = [];

let lives = 3;

let audiosArray;

let score = 0;

let displayScore;

let displayLevel;

let gameDone = true;

let level = 0;

let panSpeed = 10;

let parentSpeedLeft = 20;

let parentSpeedRight = 20;

let canvas;
let ctx;
let mom;
let pan;
let pansArray = [];
let coffeeArray = [];
let frameCounter = 0;

class Parent {
  constructor(image, width, height, x, y) {
    this.width = width,
      this.height = height,
      this.x = x,
      this.y = y,
      this.image = image
  }

  moveRight() {
    if (this.x < 730) {
      this.x += parentSpeedRight;
    }
  }

  moveLeft() {
    if (this.x > -30) {
      this.x -= parentSpeedLeft;
    }
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

}

class SleepEnemy {
  constructor() {
    this.x = Math.floor(Math.random() * (canvas.width - 80));
    this.y = 0;//Math.floor(Math.random() * -100);
    this.height = 50;
    this.width = 80;
  }
}

class Pan extends SleepEnemy {
  constructor(image) {
    super()
    this.image = image;
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Coffee {
  constructor() {
    this.x = Math.floor(Math.random() * canvas.width - 50);
    this.y = 0;
    this.height = 40;
    this.width = 60;
    this.image = coffeeImg;
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

function startScreen() {
  ctx.drawImage(startImage, 0, 0, 800, 800);
  ctx.font = "bold 30px baby";
  ctx.fillText(
    "Try to catch anything that can wake the baby by falling",
    32,
    35
  ),
    ctx.font = "bold 30px baby";
  ctx.fillText("Use the left and right arrows",
    26,
    140);
  (ctx.font = "bold 25px baby");
  ctx.fillText("And don't forget to drink your coffee !", 400, 160);
}

function drawWakeUpScreen() {
  ctx.drawImage(randomBabyImage, 0, 0, 800, 800);
  displayScore.innerText = "Game Over";
  displayLevel.innerText = "ten and counting..."
}


function drawWinScreen() {
  ctx.drawImage(sleepingBabyImage, 0, 0, 800, 800);
  displayScore.innerText = "Win!";
}


function initialize() {
  gameDone = false;
  displayScore.innerText = "0";
  displayLevel.innerText = "0";
  lives = 3;
  score = 0;
  level = 0;
  pacifiers = [];
  pansArray = [];
  crying.pause();
  snoring.pause();
}

function drawLives() {
  space = 0;
  for (let i = 0; i < lives; i++) {
    ctx.drawImage(pacifier, 10 + space, 10, 24, 24);
    space += 34;
  }
}

function playGame() {
  ctx.clearRect(0, 0, 800, 850);
  drawLives();
  mom.draw();
  pansArray.forEach((pan) => {
    pan.draw()
  })
  coffeeArray.forEach((coffee) => {
    coffee.draw()
  })

  if (frameCounter % 10 === 0) {
    pansArray.forEach((pan) => {
      pan.y += panSpeed;
    })
    coffeeArray.forEach((coffee) => {
      coffee.y += 20;
    })
  }
  // every three seconds
  if (frameCounter % 180 === 0 && !gameDone) {
    pansArray.push(new Pan(panImages[Math.floor(Math.random() * panImages.length)]));

  }
  catchPan();
  drinkCoffee();
  frameCounter++;
}

function draw() {
  if (lives > 0 && !gameDone) {
    playGame();
    if (score >= 150) {
      win();
    }
  } else if (lives < 1) {
    if (!gameDone) {
      crying.play()
      setTimeout(() => {
        crying.pause();
        crying.currentTime = 0;
      }, 10000);
    }
    gameOver();
  } else if (score >= 150) {
    win();
  }
}


function intersectParent(parent, object) {
  let parentleft = parent.x;
  let parenttop = parent.y;
  let parentright = parent.x + parent.width;
  let parentbottom = parent.y + parent.height;

  let objectleft = object.x + 30;
  let objecttop = object.y;
  let objectright = object.x + object.width - 20;
  let objectbottom = object.y + object.height;
  return !(
    parentleft > objectright ||
    parentright < objectleft ||
    parenttop > objectbottom ||
    parentbottom < objecttop
  );
}

function intersectGround(object) {

  let groundbottom = 800;
  let objectbottom = object.y + object.height;
  return (
    groundbottom < objectbottom
  );
}

function catchPan() {
  for (var i = 0; i < pansArray.length; i++) {
    let object = pansArray[i];

    if (intersectGround(object)) {
      pan1.play();
      object.intersects = true;
      lives -= 1;
    } else if (intersectParent(mom, object)) {
      femaleRelief.play();
      object.intersects = true;
      score += 10;
      displayScore.innerText = `${score}`;
      if (score > 50 && score % 50 === 0) {
        level += 1;
        panSpeed += level;
        displayLevel.innerText = `${level}`;
        if (level % 1 === 0) {
          coffeeArray.push(new Coffee());
        }
        if (level === 10) { // is this really necessary?
          level === 0;
        }
        if (level % 2 === 0) {
          parentSpeedLeft -= 2;
          parentSpeedRight -= 2;
        }
      }
    }
  }
  pansArray = pansArray.filter(obj => !obj.intersects);
}

function drinkCoffee() {
  for (var i = 0; i < coffeeArray.length; i++) {
    let object = coffeeArray[i];
    if (intersectGround(object)) {
      object.intersects = true;
      drinkingCoffee.play();
    } else if (intersectParent(mom, object)) {
      object.intersects = true;
      parentSpeedLeft += 3;
      parentSpeedRight += 3;
    }
  }
  coffeeArray = coffeeArray.filter(obj => !obj.intersects);
}


function gameOver() {
  gameDone = true;
  drawWakeUpScreen();
}

function win() {
  gameDone = true;
  clearInterval(draw, 10);
  pan1.pause();
  snoring.play();
  drawWinScreen();
}

window.onload = function () {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  mom = new Parent(momImg, 100, 150, 350, 650)
  displayScore = document.getElementById("score");
  displayLevel = document.getElementById("level");
  audiosArray = [pan1, femaleRelief, crying, snoring, drinkingCoffee];

  startScreen();
  setInterval(draw, 10);

  document.getElementById("start-button").onclick = function () {
    if (gameDone) {
      initialize();
      gameDone = false;
    }
  }

  document.getElementById("mute-button").onclick = function () {
    audiosArray.forEach((audio) => {
      if (audio.muted) {
        audio.muted = false;
      } else {
        audio.muted = true;
      }
    })
  }
}

window.onkeydown = (event) => {
  if (event.keyCode === 39) {
    mom.moveRight();
  } else if (event.keyCode === 37) {
    mom.moveLeft();
  }

}

// audiosArray.forEach((audio) => {
//   console.log(audio);
//   audio.pause()

//}


/* QUESTIONS

HOW TO STOP THE SOUNDS

appreciate `a code review, clean code and well organized
*/


