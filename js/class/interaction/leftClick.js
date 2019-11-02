let mousedownID = null;  //Global ID of mouse down interval
let clickCoord;
let xRndmInc = 0;
let yRndmInc = 0;
let radiusInc = 0;
let alreadyUsedPos = [];
let radius = 0;
let circlePoints = [];
let index = 0;
let shift = false;
let mainTargetBiome = "";
let startedClick = false;

window.addEventListener('keydown', (event) => {
  if (event.keyCode === 16) { //shift left
    shift = true;
  } 
})

window.addEventListener('keyup', (event) => {
  if (event.keyCode === 16) { //shift left
    shift = false;
  } 
})


function mousedown(event) {
  if(mousedownID === null){  //Prevent multimple loops!
    clickCoord = {x: event.clientX, y: event.clientY}
    mousedownID = setInterval(whilemousedown, 10);
  }
}

function mouseup(event) {
   if(mousedownID!= null) {  //Only stop if exists
     clearInterval(mousedownID);
     mousedownID= null;
     xRndmInc = 0;
     yRndmInc = 0;
     radius = 0;
     circlePoints = [];
     alreadyUsedPos = [];
     index = 0;
     startedClick = false;
   }

 }
 function whilemousedown() {
   getCursorPosition(clickCoord)
 }

//Assign events
document.addEventListener("mousedown", mousedown);
document.addEventListener("mouseup", mouseup);
// Clear the interval when user leaves the window with mouse
document.addEventListener("mouseout", mouseup);



// gets x, y coord on canvas
function getCursorPosition(clickCoord) {
  let rect = canvas.getBoundingClientRect();
  let xClick = clickCoord.x - rect.left;
  let yClick = clickCoord.y - rect.top;
  if(!startedClick) {
    startedClick = true;
    mainTargetBiome = tiles[Math.floor(xClick/tileSize)][Math.floor(yClick/tileSize)].info.name;
  }
  calcSamplePos(xClick, yClick);
}



function getNewCirclePoints () {
  for (let n=0; n<360; n+=360/((2*Math.PI*radius)/tileSize)) { //every tile her angle
    circlePoints.push(n);
  }
  index = 0;
  circlePoints = shuffle(circlePoints);
}


function calcSamplePos(xClick, yClick) {

  if(index < circlePoints.length) {

    let radian = circlePoints[index];


    let trueX = tiles[Math.floor(xClick/tileSize)][Math.floor(yClick/tileSize)].pixelPos.x + tileSize/2 // so we get the cente of the tile no matter where we click on it
    let trueY = tiles[Math.floor(xClick/tileSize)][Math.floor(yClick/tileSize)].pixelPos.y + tileSize/2

    let x = trueX + (radius) * Math.cos(-radian*Math.PI/180) * 1;
    let y = trueY + (radius) * Math.sin(-radian*Math.PI/180) * 1;

    let posMarker = tiles[Math.floor(x/tileSize)][Math.floor(y/tileSize)].pos.x + '-' + tiles[Math.floor(x/tileSize)][Math.floor(y/tileSize)].pos.y

    
    if(!alreadyUsedPos.includes(posMarker) && tiles[Math.floor(x/tileSize)][Math.floor(y/tileSize)].info.name === mainTargetBiome) { // checks if the tile is already set and if the biome to color is the right one
      alreadyUsedPos.push(posMarker)
      addSand(x, y)
      index++;
    } else {
      index++;
      calcSamplePos(xClick, yClick)
    }
    

  } else {

    radius += 1;
    getNewCirclePoints() // call new circle with new radius

  }
}

function addSand(x, y) {

	let targetTile = tiles[Math.floor(x/tileSize)][Math.floor(y/tileSize)];

  if(!shift) {
    switch (targetTile.info.name) {

      case 'sea' :
        let reef = new Reef();
        ctx.fillStyle = reef.getTileColor();
        tiles[Math.floor(x/tileSize)][Math.floor(y/tileSize)].info = reef.getBiomeInfo();
        ctx.fillRect(targetTile.pos.x*tileSize, targetTile.pos.y*tileSize, tileSize, tileSize);

        break;

      case 'reef' :
        let beach = new Beach();
        ctx.fillStyle = beach.getTileColor();
        tiles[Math.floor(x/tileSize)][Math.floor(y/tileSize)].info = beach.getBiomeInfo();
        ctx.fillRect(targetTile.pos.x*tileSize, targetTile.pos.y*tileSize, tileSize, tileSize);

        break;
    }

  } else {

    switch (targetTile.info.name) {

      case 'reef' :
    
        let sea = new Sea();
        ctx.fillStyle = sea.getTileColor();
        tiles[Math.floor(x/tileSize)][Math.floor(y/tileSize)].info = sea.getBiomeInfo();
        ctx.fillRect(targetTile.pos.x*tileSize, targetTile.pos.y*tileSize, tileSize, tileSize);

        break;

      case 'beach' :
    
        let reef = new Reef();
        ctx.fillStyle = reef.getTileColor();
        tiles[Math.floor(x/tileSize)][Math.floor(y/tileSize)].info = reef.getBiomeInfo();
        ctx.fillRect(targetTile.pos.x*tileSize, targetTile.pos.y*tileSize, tileSize, tileSize);

        break;
    }
  }
}