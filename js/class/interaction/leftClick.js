canvas.addEventListener('mousedown', (event) => {
	getCursorPosition(canvas, event);
})

// gets x, y coord on canvas
function getCursorPosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    addSand(x, y);
}

function addSand(x, y) {
	targetTile = tiles[Math.floor(x/4)][Math.floor(y/4)];
	console.log(targetTile)
	switch (targetTile.info.name) {
		case 'sea' :
			let biome = new Reef();
			ctx.fillStyle = biome.getTileColor();
			ctx.fillRect(targetTile.pos.x*tileSize, targetTile.pos.y*tileSize, tileSize, tileSize);
	}
}