class MainLoop {
	constructor(){
		this.timer = new Timer();
	}

	start(){

		setInterval(() => {
			timerValue ++;
			this.timer.updateHTML();
			
		}, mainLoopRefreshRate)
	}
}