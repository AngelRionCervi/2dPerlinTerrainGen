class Map {
	constructor(){
		this.biomes = new Biomes();
		this.circleRadRatio = 100; //bigger means smaller fadeoff circle
		this.fadeOffRatio = 50; // bigger means smoother

	}

	generate(){

		
        canvas.width = 1600;
        canvas.height = 900;

        for (let n=0; n<closestNumber(canvas.width/tileSize, tileSize); n++){
            tiles.push(new Array(closestNumber(canvas.height/tileSize, tileSize)).fill(0))
        }

        
        ctx.fillStyle = "#0c35ed";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        noise.seed(Math.random());


        let primeRectCoor = [];
        let mapSquares = [];
        let min = 200
        let max = 400
        let rndmRectXLength = randomWithStep(min, max, tileSize);
        let rndmRectYLength = randomWithStep(min, max, tileSize);
        let rndmRectXStart = randomWithStep(min, canvas.width - min - rndmRectXLength, tileSize);
        let rndmRectYStart = randomWithStep(min, canvas.height - min - rndmRectYLength, tileSize);

            
        let sqr1 = [rndmRectXStart, rndmRectYStart, rndmRectXLength, rndmRectYLength];
        let sqr2 = [0, 0, rndmRectXStart + rndmRectXLength, rndmRectYStart];
        let sqr3 = [0, rndmRectYStart, rndmRectXStart, canvas.height - (rndmRectYStart)];
        let sqr4 = [rndmRectXStart, rndmRectYStart + rndmRectYLength, canvas.width - rndmRectXStart, canvas.height - (rndmRectYStart + rndmRectYLength)];
        let sqr5 = [rndmRectXStart + rndmRectXLength, 0, canvas.width - rndmRectXLength - rndmRectXStart, rndmRectYStart + rndmRectYLength];
        
        primeRectCoor.push(sqr1, sqr2, sqr3, sqr4, sqr5);

        primeRectCoor.forEach((v) => {

            if (v[2]/v[3] >= 2) {
                let subXstart1 = randomWithStep(v[0], (v[2]/2)-v[3]+v[0], tileSize);
                let subXstart2 = randomWithStep((v[2]/2)+v[0], v[2]+v[0]-v[3], tileSize);
                mapSquares.push([closestNumber(subXstart1, tileSize), v[1], v[3], v[3]]);
                mapSquares.push([closestNumber(subXstart2, tileSize), v[1], v[3], v[3]]);
            } else if(v[2]/v[3] >= 1){
                let subXstart = randomWithStep(v[0], v[2]+v[0]-v[3], tileSize);
                mapSquares.push([closestNumber(subXstart, tileSize), v[1], v[3], v[3]]);
            } 

            if (v[3]/v[2] >= 2) {
                let subYstart1 = randomWithStep(v[1], (v[3]/2)-v[2]+v[1], tileSize);
                let subYstart2 = randomWithStep((v[3]/2)+v[1], v[3]+v[1]-v[2], tileSize);
                mapSquares.push([v[0], closestNumber(subYstart1, tileSize), v[2], v[2]]);
                mapSquares.push([v[0], closestNumber(subYstart2, tileSize), v[2], v[2]]);
            } else if(v[3]/v[2] >= 1){
                let subYstart = randomWithStep(v[1], v[3]+v[1]-v[2], tileSize);
                mapSquares.push([v[0], closestNumber(subYstart, tileSize), v[2], v[2]]);
            } 

        })


        mapSquares.forEach((v) => { 

            let rndm = _.random(40 - v[2]/100, 120 - v[2]/100);
            let riverZoom = _.random(100, 200);
            let elevationOffset = _.random(0.5, 1.8)
            let radiusWidth = v[2]/this.circleRadRatio;
            let radiusHeight = v[3]/this.circleRadRatio;

            for (let x = 0; x < v[2]; x += tileSize) {
                for (let y = 0; y < v[3]; y += tileSize) {


                    let noiseOffset = 0;


                    if(((x-v[2]/2) * (x-v[2]/2)) + ((y - v[3]/2)*(y - v[3]/2)) > (radiusWidth*radiusHeight)) {

                        noiseOffset = Math.floor((((x-v[2]/2) * (x-v[2]/2)) + ((y - v[3]/2) * (y - v[3]/2)) - (radiusWidth*radiusHeight)) / this.fadeOffRatio);

                    }
                       
                    let elevation = noise.perlin2(x / rndm, y / rndm);
                    elevation = (elevationOffset + elevation) * 0.8;
                    let tileElevation = Math.abs(elevation) * 256 + noiseOffset*2; // *2 ?

                    let climate = noise.perlin2((x+500) / 100, (y+500) / 100);
                    climate = (1 + climate) * 0.7;
                    let tileClimate = Math.abs(climate) * 256;

                    let rivers = noise.simplex2((x+1000) / riverZoom, (y+1000) / riverZoom);
                    rivers = rivers * 1.2;
                    let tileRivers = Math.abs(rivers) * 256;

                    let idk = noise.perlin2((x+50) / 100, (y+50) / 100);
                    idk = (1 + idk) * 0.8;
                    let tileidk = Math.abs(idk) * 256;

                    let tileType = this.biomes.getBiomeByNoise(tileElevation, tileClimate, tileRivers); // returns a biome

                    ctx.globalAlpha = 1;
                    ctx.fillStyle = tileType.getBiomeInfo().color
                    //ctx.fillStyle = 'rgb(' + tileElevation + ',' + tileElevation + ',' + tileElevation + ')';
                    ctx.fillRect(Math.floor(x+v[0]), Math.floor(y+v[1]), tileSize, tileSize)
                    tiles[Math.floor((x+v[0])/tileSize)][Math.floor((y+v[1])/tileSize)] = {info: tileType.getBiomeInfo(), pos: {x:Math.floor((x+v[0])/tileSize), y:Math.floor((y+v[1])/tileSize)}, pixelPos: {x:Math.floor(x+v[0]), y:Math.floor(y+v[1])}}
                }

            }
        })

        tiles.forEach((subArr, index) => { // fill 0 of tiles with the sea biome
            subArr.forEach((v, i, a) => {
                if(v === 0) {
                    let biome = new Sea();
                    a[i] = {info: biome.getBiomeInfo(), pos:{x:index, y:i}, pixelPos:{x:index*tileSize, y:i*tileSize}}
                }
            })
        })

    }

    animate(){
        let sea = new Sea();

        setInterval(()=>{

            let waveNumber = _.random(0, 5);

            for(let n=0; n<waveNumber; n++) {
                sea.createWaves();
            }
        }, 1000)
        
    }

}