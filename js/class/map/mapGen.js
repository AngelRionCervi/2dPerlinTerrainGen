class Map {
	constructor(){
		this.biomeTypes = ["sea", "desert", "forest", "reef"];
		this.biomeStart = "forest";
		this.tileSize = 16;
		this.biomes = new Biomes();
		this.circleRadRatio = 8; //bigger means smaller fadeoff circle
		this.fadeOffRatio = 3000; // bigger means smoother

	}

	generate(){

		let canvasGen = document.getElementById("canvasGen");
        canvasGen.width = 10000;
        canvasGen.height = 10000;
        let ctx = canvasGen.getContext("2d");

        noise.seed(Math.random());

		//let angle = 0;

        let fill = ['red', 'green', 'blue', 'orange', 'purple', 'black', 'yellow', "pink", "grey", "cyan"];
	

        let primeRectCoor = [];
        let mapSquares = [];
            let min = 1000
            let max = 8000
            let rndmRectXLength = _.random(min, max);
            let rndmRectYLength = _.random(min, max);
            let rndmRectXStart = _.random(min, canvasGen.width - min - rndmRectXLength);
            let rndmRectYStart = _.random(min, canvasGen.height - min - rndmRectYLength);
            
            //let rndmSide = _.random(1, 1);
            let sqr1 = [rndmRectXStart, rndmRectYStart, rndmRectXLength, rndmRectYLength]
            let sqr2 = [0, 0, rndmRectXStart + rndmRectXLength, rndmRectYStart];
            let sqr3 = [0, rndmRectYStart, rndmRectXStart, canvasGen.height - (rndmRectYStart)];
            let sqr4 = [rndmRectXStart, rndmRectYStart + rndmRectYLength, canvasGen.width - rndmRectXStart, canvasGen.height - (rndmRectYStart + rndmRectYLength)];
            let sqr5 = [rndmRectXStart + rndmRectXLength, 0, canvasGen.width - rndmRectXLength - rndmRectXStart, rndmRectYStart + rndmRectYLength];
        
            primeRectCoor.push(sqr1, sqr2, sqr3, sqr4, sqr5);

            primeRectCoor.forEach((v, i, a) => {
                ctx.fillStyle = "#0c35ed";
                ctx.fillRect(v[0], v[1], v[2], v[3]);

                if (v[2]/v[3] >= 2) {
                    let subXstart1 = _.random(v[0], (v[2]/2)-v[3]+v[0]);
                    let subXstart2 = _.random((v[2]/2)+v[0], v[2]+v[0]-v[3]);
                    mapSquares.push([subXstart1, v[1], v[3], v[3]]);
                    mapSquares.push([subXstart2, v[1], v[3], v[3]]);
                } else if(v[2]/v[3] >= 1){
                    let subXstart = _.random(v[0], v[2]+v[0]-v[3]);
                    mapSquares.push([subXstart, v[1], v[3], v[3]]);
                } 

                if (v[3]/v[2] >= 2) {
                    let subYstart1 = _.random(v[1], (v[3]/2)-v[2]+v[1]);
                    let subYstart2 = _.random((v[3]/2)+v[1], v[3]+v[1]-v[2]);
                    mapSquares.push([v[0], subYstart1, v[2], v[2]]);
                    mapSquares.push([v[0], subYstart2, v[2], v[2]]);
                } else if(v[3]/v[2] >= 1){
                    let subYstart = _.random(v[1], v[3]+v[1]-v[2]);
                    mapSquares.push([v[0], subYstart, v[2], v[2]]);
                } 

            })


            mapSquares.forEach((v2, i2, a2) => { 

                let rndm = _.random(200 + v2[2]/1000, 1000 + v2[2]/100);
                let riverZoom = _.random(400, 800);
                let elevationOffset = _.random(0.5, 1.6)
                let radiusWidth = v2[2]/this.circleRadRatio;
                let radiusHeight = v2[3]/this.circleRadRatio;

                for (let x = 0; x < v2[2]; x += this.tileSize) {
                    for (let y = 0; y < v2[3]; y += this.tileSize) {


                        let noiseOffset = 0;


                        if(((x-v2[2]/2) * (x-v2[2]/2)) + ((y - v2[3]/2)*(y - v2[3]/2)) > (radiusWidth*radiusHeight)) {

                            noiseOffset = Math.round((((x-v2[2]/2) * (x-v2[2]/2)) + ((y - v2[3]/2) * (y - v2[3]/2)) - (radiusWidth*radiusHeight)) / this.fadeOffRatio);
                            //console.log(noiseOffset)

                        }
                        // All noise functions return values in the range of -1 to 1.

                        // noise.simplex2 and noise.perlin2 for 2d noise

                        let elevation = noise.perlin2(x / rndm, y / rndm);
                        elevation = (elevationOffset + elevation) * 0.8;
                        let tileElevation = Math.abs(elevation) * 256 + noiseOffset;

                        let climate = noise.perlin2((x+500) / 100, (y+500) / 100);
                        climate = (1 + climate) * 0.7;
                        let tileClimate = Math.abs(climate) * 256;

                        let rivers = noise.simplex2((x+1000) / riverZoom, (y+1000) / riverZoom);
                        rivers = rivers * 1.2;
                        let tileRivers = Math.abs(rivers) * 256;

                        let idk = noise.perlin2((x+50) / 100, (y+50) / 100);
                        idk = (1 + idk) * 0.8;
                        let tileidk = Math.abs(idk) * 256;

                        let tyleType = this.biomes.getBiomeByNoise(tileElevation, tileClimate, tileRivers);


                        ctx.globalAlpha = 1;
                        ctx.fillStyle = tyleType.getBiomeInfo().color
                        //ctx.fillStyle = 'rgb(' + tileElevation + ',' + tileElevation + ',' + tileElevation + ')';
                        ctx.fillRect(Math.round(x+v2[0]), Math.round(y+v2[1]), this.tileSize, this.tileSize)
                    }

                }
            })

        }

}