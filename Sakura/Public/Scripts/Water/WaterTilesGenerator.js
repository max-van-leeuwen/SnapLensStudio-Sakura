// Max van Leeuwen || maxvanleeuwen.com || twitter: @maksvanleeuwen
// Instance water mesh prefabs in a grid.



//@input Asset.ObjectPrefab waterPlane
//@input int rows
//@input Asset.Material waterMat



function buildWaterTiles(){
	// get center of tiles to use as offset
	var tileCenter = new vec3(-script.rows/2, 0, -script.rows/2);

	// for each tile (rows=columns)
	for(var i = 0; i < script.rows*script.rows; i++){

		// get this tile position,
		var thisTilePos = 	new vec3(
								(i % script.rows) + tileCenter.x,
								0,
								Math.floor(i/script.rows) + tileCenter.z
							);

		// place tile at this position
		placeTile(thisTilePos);
	}
}



function placeTile(pos){
	var newTile = script.waterPlane.instantiate(script.getSceneObject());
	newTile.getTransform().setLocalPosition(pos);
}



function onUpdate(){
	// set water material world center
	var worldPos = script.getTransform().getWorldPosition();
	script.waterMat.mainPass.waterCenter = new vec2(-worldPos.x, -worldPos.z);

	// set water material world rotation
	var forward = script.getTransform().forward;
	var worldRotation = Math.atan2(forward.z, forward.x);
	script.waterMat.mainPass.waterRotation = worldRotation;
}
var updateEvent = script.createEvent("UpdateEvent");



function init(){
	buildWaterTiles();
	updateEvent.bind(onUpdate);
}
init();