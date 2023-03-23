let charSize = 0 //20; // set char size
let streams = []; // create array for the streams
let firstRun  = true; // checks to see if first run
let hue = 0; // hue value for text colour
let hueChange = true; // set hueChange to true

//-------DRAW_ONE_FRAME-------//
function draw_one_frame() {
  if(firstRun){
    charSize = width / 100 // set text size to scale with screen size
    textSize(charSize); // apply text size

    let x = 0;

    // loop for generating streams == to the width of the screen
    for (let i = 0; i <= width / charSize; i++) {
      let stream = new Stream();
      stream.generateChars(x, random(-1000, 0)); // generate the symbols at a random y value
      streams.push(stream);
      x += charSize; 
    }

    firstRun = false; // set firstRun to false, so above only runs the first time
  }

  background(20); // set background colour

  // render each stream
  streams.forEach(function(stream) {
    stream.render(); // main stream
    stream.render2(); // background stream
  });

  // hue text colour logic
  if (hue == 0){
    hueChange = true // when hue == 0, set to true
  } else if (hue == 100) {
    hueChange = false // when hue == 100, set to false
  }

  if (hueChange == true) {
    hue = hue + 5; // if hueChange == true, keep adding 5 to the value of hue
  }
  else if (hueChange == false) {
    hue = hue - 5; // if hueChange == false, keep subtracting 5 from the value of hue
  }
}

//-------Char-------//
function Char(x, y, speed, first) {
  this.x = x; // character x pos
  this.y = y; // character y pos
  this.value; // stores which character is displayed

  this.speed = speed; // how fast the character moves
  this.first = first; // handles the first character in each stream

  this.swtichInterval = round(random(2, 20)); // how fast the character changes
  
  // handles changing the character
  this.setToRandomChar = function() {
    if (frameCount % this.swtichInterval == 0) { // whenever switchInterval divides evenly into frameCount, then run code
      this.value = String.fromCharCode(
        0x30A0 + round(random(0, 96)) //select random unicode charater from 0 to 96
      );
    }
  }
  
  // handles the raining animation
  this.rain = function() {
    if (this.y >= height){ // checks to see if the symbol has reached the bottom, in which case it will reset back to the top
      this.y = 0;
    } else {
      this.y += this.speed;
    }
  }
}

//-------Stream-------//
function Stream(){
  this.chars = []; // array for characters
  this.totalChars = 8 // set total number of characters for each row
  this.speed = 25 // set falling speed for characters

  // handles generating characters
  this.generateChars = function(x, y) {
    let first = 1 == 1; // check if number is == to 1, if so set to true otherwise set to false
    for (let i =0; i <= this.totalChars; i++) {
      char = new Char(x, y, this.speed, first);
      char.setToRandomChar(); // set to new random character
      this.chars.push(char);
      y -= charSize; // move each character above previous 
      first = false; // change variable to false after first loop
    }
  }

  // render information for main stream
  this.render = function() {
    this.chars.forEach(function(char) {
      colorMode(HSB) // set colour mode to HSB

      if (char.first) {
        fill(hue, 255, 255); // set first character to different colour (brighter)
      } else {
        fill(hue, 255, 50); // set all other character colours
      }

      textSize(charSize) // set text size
      text(char.value, char.x, char.y); // display the symbol as text

      char.rain(); // call the rain function
      char.setToRandomChar(); // call random character function
    });
  }

  // render information for background stream
  this.render2 = function() {
    
    this.chars.forEach(function(char) {
      colorMode(HSB) // set colour mode to HSB

      if (char.first) {
        fill(hue+20, 255, 100); // set first character to different colour (brighter)
      } else {
        fill(hue+20, 255, 25); // set all other character colours
      }

      textSize(charSize - 5) // set text size, but slightly smaller
      text(char.value, char.x + 100, char.y + 100); // display the symbol as text

      char.rain(); // call the rain function
      char.setToRandomChar(); // call random character function
    });
  }
  
}