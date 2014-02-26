function getGroupCallBackGenerator(timeOut, finalCallback) {
	var waitingStatus = {};
	var resultObject = {};
	var started = false;
	var timedOut = false;
	var timer = setTimeout(function() {
		timedOut = true;
		if (typeof(finalCallback) == "function") {
			finalCallback(resultObject);
		}
		timer = false;
	}, timeOut);

	function isAllDone() {
		for (var ins in waitingStatus) {
			if (waitingStatus.hasOwnProperty(ins)) {
				if (waitingStatus[ins]) {
					return false;;
				}
			}
		}
		return true;
	}

	function tryToTriggerFinalCallback() {
		if (!isAllDone()) {
			return;
		}
		if (timedOut) {
			return;
		}
		if (!started) {
			return;
		}
		if (typeof(finalCallback) == "function") {
			if (timer) {
				clearTimeout(timer);
				timer = false;
			}
			finalCallback(resultObject);
		}
	}
	return {
		'getCallback': function(instanceName) {
			if (waitingStatus[instanceName] !== undefined) {
				throw "Duplicate Instance Name, While Generating the Callback...";
			}
			waitingStatus[instanceName] = true;
			return function(r) {
				resultObject[instanceName] = r || {};
				waitingStatus[instanceName] = false;
				tryToTriggerFinalCallback();
			}
		},
		'start': function() {
			started = true;
			tryToTriggerFinalCallback();
		},
		'abort': function() {
			started = false;
		}
	}
}
/*
function finalCallback(alloutput) {
	//here is your final output
}
cbGenerator = getGroupCallBackGenerator(timeout, finalcallback);
asyncCall1(param1, cbGenerator.getCallback('asyncCall1'))
asyncCall2(param2, cbGenerator.getCallback('asyncCall2'))
asyncCall3(param3, cbGenerator.getCallback('asyncCall3'))
asyncCall4(param4, cbGenerator.getCallback('asyncCall4'))
cbGenerator.start();
*/