class Sea extends Biomes {
    constructor(climateNoise){
        super(); 
        this.name = 'sea';
        this.climateNoise = climateNoise;
        this.climate = this.getClimate(climateNoise);
        this.tileColor = this.getTileColor(this.climate);
    }

    init(){
    	console.log('init sea')
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
            return '#0c35ed';
        }else{
            return '#0c35ed'
        }
    }

    getBiomeInfo(){
    	return {color: this.tileColor, name: this.name};
    }
}