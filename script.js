let canvasWidth = 900;
let canvasHeight = 600;
let personX = 0;
let personY = -150;
let circleX = 500;
let circleY = 500;
let barWidth = 0;
let ballSpeed = 0;
let ballSpeedY = 0;
let aim = 0.3;
let kickTimer = 0;
let goalScored = false;
let goalieY = 300;
let goalieSpeed = 4;
let shots = 5;
let resetTimer = 0;
let kicked = false;
let player = 1;
let score1 = 0;
let score2 = 0;
let gameOver = false;
let state = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}
function intro() {
  background(220);

  textSize(30);
  text("WELCOME TO SOCCER GAME", 280, 150);

  textSize(20);
  text("Created by Bennett", 370, 190);

  textSize(18);
  text("HOW TO PLAY", 380, 260);

  textSize(16);
  text("LEFT / RIGHT ARROWS = Move Player", 300, 300);
  text("UP / DOWN ARROWS = Aim Shot", 300, 330);
  text("SPACEBAR = Kick Ball", 300, 360);
  text("R = Reset Ball", 300, 390);
text ("Player has to be touching ball to shoot", 300, 420)
  textSize(18);
  text("Score more goals than your opponent in 5 shots!", 220, 470);

  textSize(22);
  fill("green");
  text("Press P to Play", 350, 520);
}

function draw() {
  if (state === 0) {
    intro();
  }
  if (state === 1) {
    game();
  }
}
function game() {
  background("blue");
  fill("green");
  rect(0, canvasHeight - 100, canvasWidth, 100);
  fill("yellow");
  circle(0, 0, 300);

  //goal
  fill("white");
  rect(800, 200, 10, 300);
  rect(800, 200, 100, 10);
  rect(890, 200, 10, 300);

  //net
  for (let i = 0; i < 8; i++) {
    square(810, 210 + 38 * i, 38);
    square(850, 210 + 38 * i, 38);
  }

  //move person
  if (keyIsDown(RIGHT_ARROW)) {
    personX = personX + 3;
  }
  if (keyIsDown(LEFT_ARROW)) {
    personX = personX - 3;
  }

  //aim (my dad helped me with this so I could make the player be able to aim the direction)
  if (keyIsDown(UP_ARROW) && aim < 2.5) {
    aim = aim + 0.02;
  }
  if (keyIsDown(DOWN_ARROW) && aim > 0) {
    aim = aim - 0.02;
  }

  //person
  fill("tan");
  circle(personX + 280, personY + 375, 100);
  fill("black");
  circle(personX + 265, personY + 360, 12);
  circle(personX + 295, personY + 360, 12);
  arc(personX + 280, personY + 385, 40, 30, 0, 60);
  if (player === 1) {
    fill("red");
  } else {
    fill("orange");
  }
  rect(personX + 270, personY + 425, 20, 200);
  rect(personX + 290, personY + 455, 50, 20);
  rect(personX + 220, personY + 455, 50, 20);
  fill("lightblue");
  rect(personX + 230, personY + 605, 60, 20);
  rect(personX + 230, personY + 605, 20, 80);

  //front leg (swings when kicking)
  if (kickTimer > 0) {
    rect(personX + 315, personY + 585, 60, 20);
    rect(personX + 375, personY + 585, 20, 80);
    kickTimer = kickTimer - 1;
  } else {
    rect(personX + 290, personY + 605, 60, 20);
    rect(personX + 350, personY + 605, 20, 80);
  }

  //goalie
  fill("purple");
  rect(760, goalieY, 20, 80);
  goalieY = goalieY + goalieSpeed;
  if (goalieY <= 200 || goalieY >= 420) {
    goalieSpeed = -goalieSpeed;
  }

  //goalie blocks the ball
  if (
    circleX + 50 >= 740 &&
    circleX < 800 &&
    goalieY + 80 > circleY - 50 &&
    goalieY < circleY + 50
  ) {
    ballSpeed = 0;
    ballSpeedY = 0;
    circleX = 650;
  }

  //soccer ball
  textSize(12);
  fill("white");
  circle(circleX, circleY, 100);
  fill("black");
  text("ball", circleX, circleY);

  //aim line
  if (kicked === false && gameOver === false) {
    stroke("white");
    strokeWeight(4);
    line(circleX, circleY, circleX + 80, circleY - aim * 80);
    stroke("black");
    strokeWeight(1);
  }

  //power bar
  barWidth = barWidth + 2;
  fill("gray");
  rect(250, 130, 200, 30);
  if (barWidth < 70) {
    fill("green");
  } else if (barWidth < 140) {
    fill("yellow");
  } else {
    fill("red");
  }
  rect(250, 130, barWidth, 30);
  if (barWidth >= 200) {
    barWidth = 0;
  }

  //move ball sideways
  circleX = circleX + ballSpeed;
  ballSpeed = ballSpeed * 0.98;

  //move ball up and down (gravity)
  ballSpeedY = ballSpeedY + 0.3;
  circleY = circleY + ballSpeedY;

  //bounce on the ground
  if (circleY > 500) {
    circleY = 500;
    ballSpeedY = -ballSpeedY * 0.5;
    if (ballSpeedY > -1) {
      ballSpeedY = 0;
    }
  }

  //ball reaches the goal line
  if (circleX >= 800 && goalScored === false) {
    if (circleY > 260 && circleY < 540) {
      goalScored = true;
      ballSpeed = 0;
      goalieSpeed = goalieSpeed * 1.1;
      if (player === 1) {
        score1 = score1 + 1;
      } else {
        score2 = score2 + 1;
      }
    } else {
      circleX = 790;
      ballSpeed = 0;
    }
  }

  //auto reset
  if (kicked && (goalScored || ballSpeed < 0.3) && gameOver === false) {
    resetTimer = resetTimer + 1;
    if (resetTimer > 60) {
      resetBall();
    }
  }

  //text
  fill("white");
  textSize(30);
  text("Player " + player + "'s turn", 250, 40);
  text("Shots left: " + shots, 250, 70);
  text("P1: " + score1 + "   P2: " + score2, 250, 100);

  if (gameOver) {
    fill("yellow");
    textSize(40);
    if (score1 > score2) {
      text("PLAYER 1 WINS!", 280, 300);
    } else if (score2 > score1) {
      text("PLAYER 2 WINS!", 280, 300);
    } else {
      text("IT'S A TIE!", 320, 300);
    }
    textSize(30);
    text("Press 1 to play again", 290, 350);
  } else if (goalScored) {
    fill("yellow");
    textSize(60);
    text("GOAL!", 350, 300);
  }

  //reset button (used just in case game bugs and auto reset isn't woking)
  fill("orange");
  rect(750, 20, 120, 40);
  fill("black");
  textSize(22);
  text("RESET", 768, 48);
}

function keyPressed() {
  if (key === "1" && gameOver) {
    score1 = 0;
    score2 = 0;
    shots = 5;
    player = 1;
    goalieSpeed = 3;
    gameOver = false;
    resetBall();
  }
  if (key === "r") {
    resetBall();
  }
  if (key === "p") {
    state = 1;
  }
  if (
    key === " " &&
    shots > 0 &&
    kicked === false &&
    gameOver === false &&
    personX + 370 >= circleX - 70 &&
    personX + 370 <= circleX + 50
  ) {
    ballSpeed = barWidth / 10;
    ballSpeedY = -aim * ballSpeed * 0.6;
    shots = shots - 1;
    kicked = true;
    kickTimer = 10;
  }
}

function mousePressed() {
  if (mouseX > 750 && mouseX < 870 && mouseY > 20 && mouseY < 60) {
    resetBall();
  }
}

function resetBall() {
  if (kicked && shots === 0) {
    if (player === 1) {
      player = 2;
      shots = 5;
    } else {
      gameOver = true;
    }
  }
  personX = 0;
  circleX = 500;
  circleY = 500;
  ballSpeed = 0;
  ballSpeedY = 0;
  aim = 0.3;
  goalScored = false;
  resetTimer = 0;
  kicked = false;
  goalieY = random(300, 400);
}
