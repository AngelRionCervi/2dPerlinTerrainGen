class Middle extends Biomes {
    constructor(climateNoise, river){
        super(); 
        this.name = 'forest';
        this.climateNoise = climateNoise;
        this.climate = this.getClimate(climateNoise);
        this.isRiver = this.isRiver(river);
        this.tileColor = this.getTileColor(this.climate);
    }

    init(){
    	console.log('init forest')
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

    getTileColor(climate){
         if(this.isRiver){
            return '#3C5DF0';
        }else{
            if(climate === 'normal'){
                return '#00c42e';
            }
            if(climate === 'cold'){
                return '#00801e';
            }
            if(climate === 'hot'){
                return '#f5dd42';
            }
        }
    }

    isRiver(riverNoise){
        if(riverNoise < 20){
            return true;
        }else{
            return false;
        }
    }

    getBiomeInfo(){
    	return {color: this.tileColor, name: this.name};
    }
}