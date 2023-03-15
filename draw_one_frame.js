let charSize = 20; // set char size
let streams = []; // create array for the streams
let firstRun  = true;


function draw_one_frame() {
if(firstRun){

  background (0) // set background colour
  let x = 0;
  for (let i = 0; i <= width / charSize; i++) {
    let stream = new Stream();
    stream.generateChars(x, random(-1000, 0)); // generate the symbols at a random y value
    streams.push(stream);
    x += charSize; 
  }
  textSize(charSize);
firstRun = false;
}

  background(0, 180);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function Char(x, y, speed, first) {
  this.x = x; // x pos
  this.y = y; // y pos
  this.value; // stores which symbol is displayed

  this.speed = speed; // how fast the symbol moves
  this.first = first; // changes the first symbol in each stream

  this.swtichInterval = round(random(2, 20));
  
  this.setToRandomChar = function() {
    if (frameCount % this.swtichInterval == 0) { // whenever switchInterval divides evenly into frameCount, then run code
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96)) //select random unicode charater from 0 to 96
      );
    }
  }
  
  this.rain = function() {
    if (this.y >= height){ // checks to see if the symbol has reached the bottom, in which case it will reset back to the top
      this.y = 0;
    } else {
      this.y += this.speed;
    }
  }
}

function Stream(){
  this.chars = [];
  this.totalChars = 8//round(random(5, 35)); // select total number of symbols for each row
  this.speed = 25//random(30, 50); // select random speed for symbols

  this.generateChars = function(x, y) {
    let first = round(random(0, 4)) == 1; // check if number is == to 1, if so set to true otherwise set to false
    for (let i =0; i <= this.totalChars; i++) {
      char = new Char(x, y, this.speed, first);
      char.setToRandomChar();
      this.chars.push(char);
      y -= charSize;
      first = false; // change variable to false after first loop
    }
  }

  this.render = function() {
    
    this.chars.forEach(function(char) {
      if (char.first) {
        fill(180, 255, 180);
      } else {
        fill(0, 255, 70); // symbol colour, green
      }
      textSize(charSize)
      text(char.value, char.x, char.y); // display the symbol as text
      char.rain(); // call the rain function
      char.setToRandomChar();
    });

  }

}