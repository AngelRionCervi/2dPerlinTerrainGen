class Biomes {
	consctructor(){
		this.tileAmount = 20;
	}

	getBiomeByType(type){
		if (type === 'sea') {
			return new Sea();
		}
		if (type === 'desert') {
			return new Desert();
		}
		if (type === 'forest') {
			return new Forest();
		}
		if (type === 'reef') {
			return new Reef();
		}
	}

	createBiomeDimensions(){
		return [_.random(20, 200), _.random(20, 200)]
	}

	getBiomeByNoise(elevation, climate, river){
		let val;
		if(elevation > 240){
			val = new Sea(climate);
		}
		if(elevation > 190 && elevation < 240){
			val = new Reef(climate);
		}
		if(elevation < 190 && elevation > 160){
			val = new Beach(climate, river);
		}
		if(elevation <= 160 && elevation >= 70){
			val = new Middle(climate, river);
		}
		if(elevation < 70){
			val = new Top(climate);
		}
		return val;
	}
}