class Sea extends Biomes {
    constructor(climateNoise){
        super(); 
        this.name = 'sea';
        this.climateNoise = climateNoise;
        this.climate = this.getClimate(climateNoise);
        this.tileColor = this.getTileColor(this.climate);
        this.waveSize = 6;
        this.waveSpeed = 500; // ms
        this.waveFrames = 10; // number of frames for the animation
    }

    init(){
    	console.log('init sea');
    }

    getClimate(){
        if(this.climateNoise > 125){
            return 'hot';
        } else {
            return 'cold';
        }
    }

    getTileColor(climate){
        if(climate === 'hot'){
            return '#0c35ed';
        }else{
            return '#0c35ed';
        }
    }

    getBiomeInfo(){
    	return {color: this.tileColor, name: this.name};
    }

    createWaves(){
        
        // spawns the wave in x y where it cannot hit a map border
        let wavePixelsPos = [];
        let x = _.random(this.waveSize*(this.waveFrames/this.waveSize), tiles.length-this.waveSize-1);
        let y = _.random(1, tiles[0].length-this.waveSize-this.waveFrames-1); // why 1 ? idk

        for (let n=0; n<this.waveSize; n++) {
            wavePixelsPos.push(tiles[x][y])
            x += 1;
            y += 1;
        }

        let xInc = 0;
        let yInc = 0;
        let frameCount = 0;

        let animation = setInterval(() => {

            wavePixelsPos.forEach((v, i, a) => {
                
                // checks so the wave doesnt change color of the land
                if(tiles[v.pos.x+(xInc/tileSize)][v.pos.y+(yInc/tileSize)].info.color === "#0c35ed") {
                    ctx.fillStyle = '#1F46F4';
                    ctx.fillRect(v.pixelPos.x+xInc, v.pixelPos.y+yInc, tileSize, tileSize)
                }
                if(tiles[v.pos.x+(xInc/tileSize)+1][v.pos.y+(yInc/tileSize)-1].info.color === "#0c35ed") {
                    ctx.fillStyle = "#0c35ed";
                    ctx.fillRect(v.pixelPos.x+xInc+tileSize, v.pixelPos.y+yInc-tileSize, tileSize, tileSize)
                }
                    
            })
            
            xInc -= tileSize;
            yInc += tileSize;
            frameCount++;

            if(frameCount === this.waveFrames) {
            
                wavePixelsPos.forEach((v, i, a) => {
                    if(tiles[v.pos.x+(xInc/tileSize)+1][v.pos.y+(yInc/tileSize)-1].info.color === "#0c35ed") {
                        ctx.fillStyle = "#0c35ed";
                        ctx.fillRect(v.pixelPos.x+xInc+tileSize, v.pixelPos.y+yInc-tileSize, tileSize, tileSize)
                    }
                })
                
                clearInterval(animation);
            }
        }, this.waveSpeed);
    
    }
}