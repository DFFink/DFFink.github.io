var streams = [];
var fadeInterval = 1;
var symbolSize = 20;
var krancorp = ["K","R","A","N","C","O","R","P"];
var nick = ["B","I","G","B","U","D","D","A"];

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);

  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize
  }

  textFont('Consolas');
  textSize(symbolSize);
}

function draw() {
  background(0, 150);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.switchInterval = 20;

  this.setToRandomSymbol = function() {
    if (frameCount % this.switchInterval == 0) {
        this.value = krancorp[round(random(0,7))];       
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

}

function Stream() {
  this.symbols = [];
  this.totalSymbols = 7
  this.speed = random(5, 15);

  this.generateSymbols = function(x, y) {
    var opacity = 255;
    var first = round(random(0, 4)) == 1;
	var budda = round(random(0,3)) == 1;
    for (var i =0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(
        x,
        y,
        this.speed,
        first,
        opacity
      );
      //symbol.setToRandomSymbol();
	  if(budda == true){
		symbol.value = nick[7 - i];  
	  }
	  else{
		symbol.value = krancorp[7 - i];
	  }
      this.symbols.push(symbol);
      opacity -= (200 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(140, 255, 170, symbol.opacity);
      } else {
        fill(0, 255, 70, symbol.opacity);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      //symbol.setToRandomSymbol();
    });
  }
}

