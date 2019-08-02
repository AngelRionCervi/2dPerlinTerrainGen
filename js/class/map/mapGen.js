class Map {
	constructor(){
		this.biomeTypes = ["sea", "desert", "forest"];
		this.biomeStart = "forest";
		this.tileSize = 5;
		this.biomes = new Biomes();
		this.circleRadRatio = 3.5; //bigger means smaller fadeoff circle
		this.fadeOffRatio = 500; // bigger means smoother

	}

	generate(){
	
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext("2d");

		noise.seed(Math.random());
		let rndm = _.random(50, 250);
		let riverZoom = _.random(80, 150);
		let elevationOffset = _.random(0.6, 1.2)
		let angle = 0;
		let radius = canvas.width/this.circleRadRatio;
		for (let x = 0; x < canvas.width; x += this.tileSize) {
  			for (let y = 0; y < canvas.height; y += this.tileSize) {

  				angle ++;
  				if(angle === 361) angle = 0;

  				let noiseOffset = 0;

  				if(((x-canvas.width/2)*(x-canvas.width/2)) + ((y - canvas.height/2)*(y - canvas.height/2)) > (radius*radius)) {

					noiseOffset = Math.round((((x-canvas.width/2)*(x-canvas.width/2)) + ((y - canvas.height/2)*(y - canvas.height/2)) - (radius*radius)) / this.fadeOffRatio);
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


    			ctx.globalAlpha = 1;
    			ctx.fillStyle = tyleType.getBiomeInfo().color
    			//ctx.fillStyle = 'rgb(' + tileElevation + ',' + tileElevation + ',' + tileElevation + ')';
    			ctx.fillRect(x, y, this.tileSize, this.tileSize)

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
    			ctx.fillRect(canvas.width/2, canvas.height/2, 4, 4)

    		
    			//ctx.fillRect(Math.abs(Math.ceil(canvas.width/2 + canvas.width/2.2*Math.cos(angle))), Math.abs(Math.ceil(canvas.height/2 + canvas.height/2.2*Math.sin(angle))), this.tileSize, this.tileSize);
    			//image[x][y].r = Math.abs(value) * 256; // Or whatever. Open demo.html to see it used with canvas.
    			
  			}
		}
	}
}