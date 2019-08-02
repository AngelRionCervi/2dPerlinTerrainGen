class Beach extends Biomes {
    constructor(climateNoise, river){
        super(); 
        this.name = 'beach';
        this.climateNoise = climateNoise;
        this.climate = this.getClimate(climateNoise);
        this.isRiver = this.isRiver(river);
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
        if(this.isRiver){
            return '#0c35ed';
        }else{
            if(climate === 'hot'){
                return '#f5dd42';
            }else{
                return '#f5dd42';
            }
        }
    }

    isRiver(riverNoise){
        if(riverNoise < 40){
            return true;
        }else{
            return false;
        }
    }

    getBiomeInfo(){
    	return {color: this.tileColor, name: this.name};
    }
}