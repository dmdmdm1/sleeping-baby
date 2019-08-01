const momImg = new Image();
momImg.src = "./images/momavatar.png";

const fryingPanImg = new Image();
fryingPanImg.src = "./images/frying-pan.png";

const bigPanImg = new Image();
bigPanImg.src = "./images/big-pan.png";

const panImages = [fryingPanImg, bigPanImg]

//let randomPanImage = panImages[Math.floor(Math.random() * panImages.length)];

let canvas;
let ctx;
let mom;
let pan;
let pansArray = [];
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
    if (this.x === 730) {
      this.x = 730;
    } else {
      this.x += 20;
    }
  }

  moveLeft() {
    if (this.x === -30) {
      this.x = -30;
    } else {
      this.x -= 20;
    }
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

}

class SleepEnemy {
  constructor() {
    this.x = Math.floor(Math.random() * canvas.width - 50); // -100 (Breite des Bildes) weil sonst außerhalb des Bildrandes
    this.y = 0;//Math.floor(Math.random() * -100);
    this.height = 50;
    this.width = 80;
  }
}

class Pan extends SleepEnemy {
  constructor(image) {//maybe not pass img as an argument since it will always be the same img or maybe later randomize it between an array of different pans 
    //super do I need to use super here? as I am not passing arguments?
    super()
    this.image = image;
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}





//       // drawSleepEnemy(){
//       //   ctx.fillStyle = this.color
//       //   ctx.fillRect(this.x, this.y, this.width, this.height)
//       // }

//   }
// }


// let sleepEnemies = [new SleepEnemy(10, 10, blue), new SleepEnemy(10, 10, red)]


function draw() {
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, 800, 800);
  mom.draw();
  pansArray.forEach((pan) => {
    pan.draw()
  })
  if (frameCounter % 10 === 0) {
    pansArray.forEach((pan) => {
      pan.y += 10;
    })
  }
  // every two seconds
  if (frameCounter % 180 === 0) {
    pansArray.push(new Pan(panImages[Math.floor(Math.random() * panImages.length)]));// add random here afterwards to randomize the image
  }

  frameCounter++;
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

window.onload = function () {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  mom = new Parent(momImg, 100, 150, 350, 650)

  setInterval(draw, 40)

  window.onkeydown = (event) => {
    if (event.keyCode === 39) {
      mom.moveRight();
      console.log("hello")
    } else if (event.keyCode === 37) {
      mom.moveLeft();
    }
  }





  // declare a function in which the sleep objects start falling maybe make a subclass called pans and add
  // some different ones : pans and skillets , thenn implement the collision detection 
}


/* QUESTIONS

Super w/o arguments
appreciate `a code review, clean code and well organized
Frame counter vs Request Animation Frame?
Pan is added and now disappearing because canvas needs to get redrawn
sparring partner to discuss data  structures and order of the code
collision detection
I have the parent that needs to be drawn and then the objects which position is being updated
how do I organize this?
*/