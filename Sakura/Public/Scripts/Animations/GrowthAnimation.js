// Max van Leeuwen
// Controls the animation of the 'growth' parameter (0-1) in specified materials.



//@input bool animating

//@input bool showSettings
//@ui {"widget":"group_start", "label":"settings", "showIf":"showSettings"}

//@input float pauseDuration
//@input Asset.Material[] growthMat
//@input float[] growthDelay
//@input float[] growthDuration

//@ui {"widget":"group_end"}



function init(){
	if(script.animating){
		global.touchSystem.touchBlocking = true;
		startAnimations();
	}
}
init();



function startAnimations(){

	// 0-1 animation ratio for each growth material
	var animRatios = [];
	function resetAllAnimRatios(){
		animRatios = [];
		for(var i = 0; i < script.growthMat.length; i++){
			animRatios.push(-script.growthDelay[i])
		}
	}
	resetAllAnimRatios();



	function nextStep(i){
		// get next growth value for this material
		var anim = animRatios[i];
		var clamped =	anim > 1 ?
						1 : anim < 0 ?
						0 : anim;

		script.growthMat[i].mainPass.growth = clamped;

		// if not within 0-1 range (visible animation), count realtime instead of using growthDuration
		var reset = false;
		if(anim < 0 || anim > 1){
			anim += getDeltaTime();
			if(anim - 1 > script.pauseDuration){
				// reset all growth anims when first one is finished
				reset = true;
			}
		}else{
			anim += getDeltaTime()/script.growthDuration[i];
		}
		if(reset){
			resetAllAnimRatios();
			return true;
		}else{
			animRatios[i] = anim;
			return false;
		}
	}



	// every frame
	function animation(){
		// next step in growth parameter for each material
		for(var i = 0; i < script.growthMat.length; i++){
			// stop loop and wait for next frame if all animations are reset on this one
			if(nextStep(i)) break;
		}

	}
	var animationEvent = script.createEvent("UpdateEvent");
	animationEvent.bind(animation);
}