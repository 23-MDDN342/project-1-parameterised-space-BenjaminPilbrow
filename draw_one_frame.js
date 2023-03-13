let symbolSize = 60; // set symbol size
let streams = []; // create array for the streams

function setup() {

  createCanvas(
    window.innerWidth,
    window.innerHeight
  );

  background (0) // set background colour
  let x = 0;
  for (let i = 0; i <= width / symbolSize; i++) {
    let stream = new Stream();
    stream.generateSymbols(x, random(-1000, 0)); // generate the symbols at a random y value
    streams.push(stream);
    x += symbolSize; 
  }
  textSize(symbolSize);
}

function draw() {
  background(0, 100);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first) {
  this.x = x; // x pos
  this.y = y; // y pos
  this.value; // stores which symbol is displayed

  this.speed = speed; // how fast the symbol moves
  this.first = first; // changes the first symbol in each stream

  this.swtichInterval = round(random(2, 20));
  
  this.setToRandomSymbol = function() {
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
  this.symbols = [];
  this.totalSymbols = round(random(5, 35)); // select total number of symbols for each row
  this.speed = random(5, 25); // select random speed for symbols

  this.generateSymbols = function(x, y) {
    let first = round(random(0, 4)) == 1; // check if number is == to 1, if so set to true otherwise set to false
    for (let i =0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      y -= symbolSize;
      first = false; // change variable to false after first loop
    }
  }

  this.render = function() {
    
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(180, 255, 180);
      } else {
        fill(0, 255, 70); // symbol colour, green
      }
      text(symbol.value, symbol.x, symbol.y); // display the symbol as text
      symbol.rain(); // call the rain function
      symbol.setToRandomSymbol();
    });

  }

}