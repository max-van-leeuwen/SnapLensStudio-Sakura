// Max van Leeuwen || maxvanleeuwen.com || twitter: @maksvanleeuwen
// Sets the right world scale to the canopy material.



//@input Asset.Material canopyMat



function onUpdate(){
	var worldObjectScale = script.getTransform().getWorldScale().x;
	script.canopyMat.mainPass.worldObjectScale = worldObjectScale;
}
var updateEvent = script.createEvent("UpdateEvent");



function init(){
	updateEvent.bind(onUpdate);
}
init();