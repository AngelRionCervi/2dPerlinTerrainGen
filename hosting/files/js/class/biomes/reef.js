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
            return '#3C5DF0';
        }else{
            return '#3C5DF0'
        }
    }

    getBiomeInfo(){
    	return {color: this.tileColor, name: this.name};
    }
}