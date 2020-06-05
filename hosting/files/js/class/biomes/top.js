class Top extends Biomes {
    constructor(climateNoise){
        super(); 
        this.name = 'mountain';
        this.climateNoise = climateNoise;
        this.climate = this.getClimate(climateNoise);
        this.tileColor = this.getTileColor(this.climate);
    }

    init(){
    	console.log('init mountain');
    }

    getClimate(){
    	if(this.climateNoise > 220){
    		return 'hot';
    	} 
        if(this.climateNoise >= 125 && this.climateNoise <= 220){
    		return 'normal';
    	}
        if(this.climateNoise < 125){
            return 'cold'
        }
    }

    getTileColor(climate, river){
    	if(climate === 'normal'){
    		return '#D6C3DE';
    	}
    	if(climate === 'cold'){
    		return '#D6C3DE';
    	}
    	if(climate === 'hot'){
    		return '#A5682A';
    	}
    }

    getBiomeInfo(){
    	return {color: this.tileColor, name: this.name};
    }
}