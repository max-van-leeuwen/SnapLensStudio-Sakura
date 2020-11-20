// Max van Leeuwen
// Rotates the camera around the scene.



//@input bool turntable

//@input bool showSettings
//@ui {"widget":"group_start", "label":"settings", "showIf":"showSettings"}

//@input float fullCycleDuration
//@input float cycleOffset {"widget":"slider", "min":0.0, "max":1.0, "step":0.01}
//@input float camHeight
//@input float camDist
//@input float camDirection {"widget":"slider", "min":-1.0, "max":1.0, "step":0.01}
//@input Component.DeviceTracking tracking
//@input SceneObject camera
//@input SceneObject cameraParent

//@ui {"widget":"group_end"}



function onUpdate(){
	nextCameraRotation();
}
var updateEvent = script.createEvent("UpdateEvent");



var camRotation = 0;
var offset = script.cycleOffset * 2*Math.PI;
function nextCameraRotation(){

	var newRot = quat.fromEulerAngles(0, camRotation * 2*Math.PI + offset, 0);
	script.cameraParent.getTransform().setLocalRotation(newRot);
	camRotation += getDeltaTime() / script.fullCycleDuration;
}



function init(){
	if(script.turntable){

		// disable tracking, prepare camera position
		script.tracking.enabled = false;
		var transf = script.camera.getTransform();
		transf.setLocalPosition(new vec3(0, script.camHeight, script.camDist));
		transf.setLocalRotation(quat.fromEulerAngles(script.camDirection, 0, 0));

		// start camera parent rotation
		updateEvent.bind(onUpdate);
	}
}
init();