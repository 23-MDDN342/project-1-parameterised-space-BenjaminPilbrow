let streams = [];
let symbolSize = 20;


function setup() {
	  //createCanvas(windowWidth, windowHeight);
	  background(0);
	
	  let x = 0;
	  for (let i = 0; i <= width / symbolSize; i++) {
		let stream = new Stream();
		stream.generateSymbols(x, random(-1000, 0));
		streams.push(stream);
		x += symbolSize;
	  }
	
	  textSize(symbolSize);
	}

function draw_one_frame() {

	
	
	
	function draw() {
	  background(0, 150);
	  streams.forEach(function(stream) {
		stream.render();
	  });
	}
	
	class Symbol {
	  constructor(x, y, speed, first, opacity) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.first = first;
		this.opacity = opacity;
		this.switchInterval = round(random(2, 25));
	  }
	
	  setToRandomSymbol() {
		let charType = round(random(0, 5));
		if (frameCount % this.switchInterval == 0) {
		  if (charType > 1) {
			this.value = String.fromCharCode(
			  0x30A0 + round(random(0, 96))
			);
		  } else {
			this.value = round(random(0, 9));
		  }
		}
	  }
	
	  rain() {
		if (this.y >= height) {
		  this.y = 0;
		} else {
		  this.y += this.speed;
		}
	  }
	}
	
	class Stream {
	  constructor() {
		this.symbols = [];
		this.totalSymbols = round(random(5, 30));
		this.speed = random(5, 15);
	  }
	
	  generateSymbols(x, y) {
		let opacity = 255;
		let first = round(random(0, 4)) == 1;
		for (let i = 0; i <= this.totalSymbols; i++) {
		  let symbol = new Symbol(
			x,
			y,
			this.speed,
			first,
			opacity
		  );
		  symbol.setToRandomSymbol();
		  this.symbols.push(symbol);
		  y -= symbolSize;
		  opacity -= 255 / this.totalSymbols / fadeInterval;
		  first = false;
		}
	  }
	
	  render() {
		this.symbols.forEach(function(symbol) {
		  if (symbol.first) {
			fill(120, 255, 120, symbol.opacity);
		  } else {
			fill(0, 255, 70, symbol.opacity);
		  }
		  text(symbol.value, symbol.x, symbol.y);
		  symbol.rain();
		  symbol.setToRandomSymbol();
		});
	  }
	}

}
