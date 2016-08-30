
function generateSequence() {
	var sequenceArr = [];
	for (var i = 0; i < 20; i++) {
		var num = Math.floor( ((Math.random()* 4) + 1) );	
		sequenceArr.push(num);
	}
	return sequenceArr;
}

function highlightButton(sequence, round) {
	console.log(sequence);
	var timesRun = 0;
	var interval = setInterval(function() {
		timesRun += 1;
		if (timesRun === round) {
			clearInterval(interval);
		}
		var nextId = sequence[timesRun - 1];
		changeColor(nextId);
	}, 1500)
}

function changeColor(id) {
	var button1 = document.getElementById("circle1");
	var button2 = document.getElementById("circle2");
	var button3 = document.getElementById("circle3");
	var button4 = document.getElementById("circle4");
	var color1 = '#02D15F';
	var color2 = '#FE0113';
	var color3 = '#F2C301';
	var color4 = '#0164CC';
	var sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
	var sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
	var sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
	var sound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

	var toEval1 = 'button' + id + '.style.backgroundColor = "#FFF";';
	eval(toEval1);
	var toEval4 = 'sound' + id + '.play();';
	eval(toEval4);

	setTimeout(function() {
		var toEval3 = 'var color = color' + id;
		eval(toEval3);
		var toEval2 = 'button' + id + '.style.backgroundColor = "' + color + '";';
		eval(toEval2);
	}, 1000);
}

function startGame() {

	var button1 = document.getElementById("circle1");
	var button2 = document.getElementById("circle2");
	var button3 = document.getElementById("circle3");
	var button4 = document.getElementById("circle4");
	var screenText = document.getElementById("screen-text");
	var strictButton = document.getElementById("strict-button");
	var strictLight = document.getElementById("strict-light");
	var strict = false;
	strictMode();

	var sequence = generateSequence();
	var userInput = [];
	var round = 1;
	screenText.innerHTML = round;
	var userAllowedToPlay = false; // so that users can't click initially

	function strictMode() {
		strictButton.addEventListener("click", function() {
			if (strict === false) {
				strict = true;
				strictLight.style.backgroundColor = 'red';
				console.log("strict mode: " + strict)
			} else if (strict === true) {
				strict = false;
				strictLight.style.backgroundColor = '#000';
				console.log("strict mode: " + strict)
			}
		});
	}

	function newRound() {
		
		highlightButton(sequence, round);
		
		userAllowedToPlay = true;
		recordUser();
	}

	// record user input

	function recordUser() {
		button1.addEventListener("click", btn1Event);
		button2.addEventListener("click", btn2Event);
		button3.addEventListener("click", btn3Event);
		button4.addEventListener("click", btn4Event);
	}

	function push(n) {
		userInput.push(n);
		console.log(userInput);
	}

	function btn1Event() {
		push(1);
		changeColor(1);
		muteUser();
	}
	function btn2Event() {
		push(2);
		changeColor(2);
		muteUser();
	}
	function btn3Event() {
		push(3);
		changeColor(3);
		muteUser();
	}
	function btn4Event() {
		push(4);
		changeColor(4);
		muteUser();
	}

	function muteUser() {
		if (userInput.length === round) {
			button1.removeEventListener("click", btn1Event);
			button2.removeEventListener("click", btn2Event);
			button3.removeEventListener("click", btn3Event);
			button4.removeEventListener("click", btn4Event);
			compare();
		}
	}

	// compare user input with computer sequence

	function compare() {
		var correct = [];
		for (var i = 0; i < userInput.length; i++) {
			var item = userInput[i];
			if (item === sequence[i]) {
				correct.push(true);
			} else {
				correct.push(false);
			}
		}
		console.log(correct);
		if (correct.indexOf(false) === -1 && round < 5) {
			setTimeout(function() {
				alert("Good job, keep'em coming!");
				userInput = [];
				round += 1;
				screenText.innerHTML = round;
				newRound();
			}, 1500);
				
		} else if (correct.indexOf(false) === -1 && round === 5) {
			setTimeout(function() {
				alert("YOU WIN!! SUCH AWESOME <3");	
			}, 1500);
			
		} else if (correct.indexOf(false) !== -1) {
			setTimeout(function() {
				alert("WRONG!! Try again");
				userInput = [];
				if (strict === true) {
					round = 1;
					screenText.innerHTML = round;
					userAllowedToPlay = false; // so that users can't click initially
					newRound();
				} else {
					newRound();
				}
			}, 1500);
		}
	}

	newRound();

}

function onOffSwitch() {
	var offButton = document.getElementById("off-button");
	var onButton = document.getElementById("on-button");
	var onOffContainer = document.getElementById("off-on-button-container");
	var switchedOn = ( window.getComputedStyle(offButton).getPropertyValue("display") === "none" )

	var startButton = document.getElementById("start-button");

	function switchOnOff() {
		
		if (switchedOn === false) {
			console.log("switching on....");
			offButton.style.display = "none";
			onButton.style.display = "block";
			document.getElementById("screen-text").innerHTML = "--";

			startButton.addEventListener("click", 
				startGame,
				false
			);

		} else if (switchedOn === true) {
			console.log("switching off...");
			offButton.style.display = "block";
			onButton.style.display = "none";
			document.getElementById("screen-text").innerHTML = "";

			startButton.removeEventListener("click", 
				startGame,
				false
			);
			window.location.reload(false);
		}
		switchedOn = !switchedOn;
	}

	document.getElementById("off-on-button-container").addEventListener("click", function() {
		switchOnOff();
	});
		
}

window.onload = function() {
	onOffSwitch();
}