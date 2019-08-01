const momImg = new Image();
momImg.src = "./images/momavatar.png";

const fryingPanImg = new Image();
fryingPanImg.src = "./images/frying-pan.png";

let canvas;
let ctx;
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

  drawCharacter() {
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
  drawPan() {
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

  ctx.fillStyle = "grey";
  ctx.fillRect(0, 0, 800, 800);

}

window.onload = function () {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  draw()
  let mom = new Parent(momImg, 100, 150, 350, 650)
  mom.drawCharacter()
  let pan1 = new Pan(fryingPanImg);
  pan1.drawPan()

  window.onkeydown = (event) => {
    if (event.keyCode === 39) {
      mom.moveRight();
      console.log("hello")
    } else if (event.keyCode === 37) {
      mom.moveLeft();
    }
    draw()
    mom.drawCharacter()
  }



  // declare a function in which the sleep objects start falling maybe make a subclass called pans and add
  // some different ones : pans and skillets , thenn implement the collision detection 
}