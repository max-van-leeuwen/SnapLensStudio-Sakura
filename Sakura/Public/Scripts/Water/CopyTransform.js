// Max van Leeuwen || maxvanleeuwen.com || twitter: @maksvanleeuwen
// Match transformations of specified object.



//@input SceneObject matchObject
//@input bool local



function onUpdate(){
	if(script.local){
		script.getTransform().setLocalPosition(script.matchObject.getTransform().getLocalPosition());
		script.getTransform().setLocalRotation(script.matchObject.getTransform().getLocalRotation());
		script.getTransform().setLocalScale(script.matchObject.getTransform().getLocalScale());
	}else{
		script.getTransform().setWorldPosition(script.matchObject.getTransform().getWorldPosition());
		script.getTransform().setWorldRotation(script.matchObject.getTransform().getWorldRotation());
		script.getTransform().setWorldScale(script.matchObject.getTransform().getWorldScale());
	}
}
var updateEvent = script.createEvent("UpdateEvent");



function init(){
	updateEvent.bind(onUpdate);
}
init();