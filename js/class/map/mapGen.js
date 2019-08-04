class Map {
	constructor(){
		this.biomeTypes = ["sea", "desert", "forest"];
		this.biomeStart = "forest";
		this.tileSize = 8;
		this.biomes = new Biomes();
		this.circleRadRatio = 3.5; //bigger means smaller fadeoff circle
		this.fadeOffRatio = 100; // bigger means smoother

	}

	generate(){
	
		let canvasGen = document.getElementById("canvasGen");
        canvasGen.width = 12000;
        canvasGen.height = 10000;
		let ctx = canvasGen.getContext("2d");

		noise.seed(Math.random());

		
		//let angle = 0;
		let radius = canvasGen.width/this.circleRadRatio;
        let fill = ['red', 'green', 'blue', 'orange', 'purple', 'black'];

        let primeRectCoor = [];

            let rndmRectXLength = _.random(150, 300);
            let rndmRectYLength = _.random(150, 300);
            let rndmRectXStart = _.random(100, canvasGen.width - 100 - rndmRectXLength);
            let rndmRectYStart = _.random(100, canvasGen.height - 100 - rndmRectYLength);
            //let rndmSide = _.random(1, 1);
            let sqr1 = [rndmRectXStart, rndmRectYStart, rndmRectXLength, rndmRectYLength]
            let sqr2 = [0, 0, rndmRectXStart + rndmRectXLength, rndmRectYStart];
            let sqr3 = [0, rndmRectYStart, rndmRectXStart, canvasGen.height - rndmRectYStart];
            let sqr4 = [rndmRectXStart, rndmRectYStart + rndmRectYLength, canvasGen.width - rndmRectXStart, canvasGen.height - rndmRectYStart];
            let sqr5 = [rndmRectXStart + rndmRectXLength, 0, canvasGen.width - rndmRectXLength - rndmRectXStart, rndmRectYStart + rndmRectYLength];
/*
            ctx.fillStyle = fill[0];
            ctx.fillRect(rndmRectXStart, rndmRectYStart, rndmRectXLength, rndmRectYLength);
            ctx.fillStyle = fill[1];
            ctx.fillRect(sqr2[0], sqr2[1], sqr2[2], sqr2[3]);
            ctx.fillStyle = fill[2];
            ctx.fillRect(sqr3[0], sqr3[1], sqr3[2], sqr3[3]);
            ctx.fillStyle = fill[3];
            ctx.fillRect(sqr4[0], sqr4[1], sqr4[2], sqr4[3]);
            ctx.fillStyle = fill[4];
            ctx.fillRect(sqr5[0], sqr5[1], sqr5[2], sqr5[3]);*/


            primeRectCoor.push(sqr1, sqr2, sqr3, sqr4, sqr5);

            primeRectCoor.forEach((v, i, a) => {

                let subRectCoor = [];
                
                let subRndmRectXlength = _.random(v[2]/4, v[2]/2.5);
                if(subRndmRectXlength < 100) subRndmRectXlength = 100;

                let subRndmRectYlength = _.random(v[3]/4, v[3]/2.5);
                if(subRndmRectYlength < 100) subRndmRectYlength = 100;

                let subRndmRectXstart = _.random(50, v[2] - 50 - subRndmRectXlength);
                let subRndmRectYstart = _.random(50, v[3] - 50 - subRndmRectYlength);

                let subSqr1 = [subRndmRectXstart, subRndmRectYstart, subRndmRectXlength, subRndmRectYlength];
                let subSqr2 = [0, 0, subRndmRectXstart + subRndmRectXlength, subRndmRectYstart];
                console.log(subSqr2)
                let subSqr3 = [0, subRndmRectYstart, subRndmRectXstart, v[3]-subRndmRectYstart+subRndmRectYlength];
                let subSqr4 = [subRndmRectXstart, subRndmRectYstart + subRndmRectYlength, v[2] - subRndmRectXstart, v[3] - subRndmRectYstart];
                let subSqr5 = [subRndmRectXstart + subRndmRectXlength, 0, v[2] - subRndmRectXlength - subRndmRectXstart, subRndmRectYlength + subRndmRectYstart];

                subRectCoor.push(subSqr1, subSqr2, subSqr3, subSqr4, subSqr5);
        
/*
                ctx.fillStyle = fill[0];
                ctx.fillRect(v[0] + subSqr1[0], v[1] + subSqr1[1], subSqr1[2], subSqr1[3]);
                ctx.fillStyle = fill[1];
                ctx.fillRect(v[0] + subSqr2[0], v[1] + subSqr2[1], subSqr2[2], subSqr2[3]);
                ctx.fillStyle = fill[2];
                ctx.fillRect(v[0] + subSqr3[0], v[1] + subSqr3[1], subSqr3[2], subSqr3[3]);
                ctx.fillStyle = fill[3];
                ctx.fillRect(v[0] + subSqr4[0], v[1] + subSqr4[1], subSqr4[2], subSqr4[3]);
                ctx.fillStyle = fill[4];
                ctx.fillRect(v[0] + subSqr5[0], v[1] + subSqr5[1], subSqr5[2], subSqr5[3]);*/
                
            

                subRectCoor.forEach((v2, i2, a2)=>{ 

                    let rndm = _.random(150, 500);
                    let riverZoom = _.random(80, 150);
                    let elevationOffset = _.random(0.3, 2)

		        for (let x = 0; x < v2[2]; x += this.tileSize) {
  			       for (let y = 0; y < v2[3]; y += this.tileSize) {

  				//angle ++;
  				//if(angle === 361) angle = 0;

  				let noiseOffset = 0;

  				if(((x-v2[2]/2) * (x-v2[2]/2)) + ((y - v2[3]/2)*(y - v2[3]/2)) > (radius*radius)) {

					noiseOffset = Math.round((((x-v2[2]/2) * (x-v2[2]/2)) + ((y - v2[3]/2) * (y - v2[3]/2)) - (radius*radius)) / this.fadeOffRatio);
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

    			let rivers = noise.perlin2((x+1000) / riverZoom, (y+1000) / riverZoom);
    			rivers = rivers * 2.4;
    			let tileRivers = Math.abs(rivers) * 256;

    			let idk = noise.perlin2((x+50) / 100, (y+50) / 100);
    			idk = (1 + idk) * 0.8;
    			let tileidk = Math.abs(idk) * 256;

    			let tyleType = this.biomes.getBiomeByNoise(tileElevation, tileClimate, tileRivers);


    			
    			ctx.fillStyle = tyleType.getBiomeInfo().color
    			//ctx.fillStyle = 'rgb(' + tileElevation + ',' + tileElevation + ',' + tileElevation + ')';
    		    ctx.fillRect(Math.round(x+v[0]+v2[0]), Math.round(y+v[1]+v2[1]), this.tileSize, this.tileSize)
/*
    			ctx.globalAlpha = 0.0;
    			ctx.fillStyle = 'rgba(' + tileClimate + ',' + tileClimate + ',' + tileClimate + ',' + tileClimate/20 + ')';
    			ctx.fillRect(x, y, this.tileSize, this.tileSize)

    			ctx.globalAlpha = 0.0;
    			ctx.fillStyle = 'rgb(' + tileRivers + ',' + tileRivers + ',' + tileRivers + ')';
    			ctx.fillRect(x, y, this.tileSize, this.tileSize)

    			ctx.globalAlpha = 0;
    			ctx.fillStyle = 'rgb(' + tileidk*(noise.perlin2((x+300) / 75, (y+300) / 75)) + ',' + tileidk*(noise.perlin2((x+200) / 75, (y+200) / 75)) + ',' + tileidk*(noise.perlin2((x+100) / 75, (y+100) / 75)) + ')';
    			ctx.fillRect(x, y, this.tileSize, this.tileSize)

    			ctx.globalAlpha = 0;
    			ctx.fillStyle = 'purple';
    			ctx.fillRect(v2[2]/2, v2[3]/2, 4, 4)*/

    		
    			//ctx.fillRect(Math.abs(Math.ceil(v2[2]/2 + canvasGen.width/2.2*Math.cos(angle))), Math.abs(Math.ceil(canvasGen.height/2 + canvasGen.height/2.2*Math.sin(angle))), this.tileSize, this.tileSize);
    			//image[x][y].r = Math.abs(value) * 256; // Or whatever. Open demo.html to see it used with canvasGen.
    			
  			
            
            }

		}

        })
        })
	}
}