class Desert extends Biomes {
    constructor(climateNoise){
        super(); 
        this.tileColor = '#f5dd42';
        this.name = 'desert';
        this.climateNoise = climateNoise;
    }

    init(){
    	console.log('init desert')
    }

    getClimate(){
    	if(this.climateNoise > 125){
    		return 'hot';
    	} else {
    		return 'cold';
    	}
    }

    getBiomeInfo(){
    	return {color: this.tileColor, name: this.name};
    }
}