class Reef extends Biomes {
    constructor(climateNoise){
        super(); 
        this.name = 'reef';
        this.climateNoise = climateNoise;
        this.climate = this.getClimate(climateNoise);
        this.tileColor = this.getTileColor(this.climate);
    }

    init(){
    	console.log('init reef')
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
            return reefColor;
        }else{
            return iceColor;
        }
    }

    getTileColorByNoise(){
        if(this.climate > 125){
            return reefColor;
        }else{
            return iceColor;
        }
    }

    getBiomeInfo(){
    	return {color: this.tileColor, name: this.name};
    }
}