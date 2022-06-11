
let level = 6; //initial value
let maxSquares = 6; //maxvalue
let colors = [];
let colorPicked;

let header = document.querySelector("h1");
let squares = document.querySelectorAll("#square");
let colorDisplayed = document.getElementById("colorDisplay");
let msg = document.querySelector("#message");
let reset = document.querySelector("#reset");
// let easy = document.querySelector("#easy");
// let hard = document.querySelector("#hard");
let mode = document.querySelectorAll(".mode");


init();

//mode
for(i=0;i<mode.length;i++) {
mode[i].addEventListener("click", function() {
	mode[0].classList.remove("selected");
	mode[1].classList.remove("selected");
	this.classList.add("selected");

	this.textContent === "Easy" ? level = 3 : level = 6;
	setColors(level);
});
}

//reset
reset.addEventListener("click", function() {
	//reset text on Button
	reset.textContent = "New Colors";

	setColors(level);

	//reset header color to match background
	header.style.backgroundColor = "Steelblue";
	//Empty string for span
	msg.textContent = "";
});

for(let i = 0; i<colors.length; i++) {
	//check square clicked
	squares[i].addEventListener("click", function () {
	var colorClicked = this.style.backgroundColor;

		//check if correct
		if (colorClicked === colorPicked) {
			msg.textContent = "Correct!";
			changeColors(colorClicked);
			reset.textContent = "Play again?";
		}
		//if wrong
		else {
			//same as background color to give disappearing effect
			this.style.backgroundColor = "#232323";
			msg.textContent = "Try again!";
		}
	});	
}

function changeColors(color) {
	for(i=0; i<level; i++) {
		squares[i].style.backgroundColor = color;
	}
	header.style.backgroundColor = color;
}

function ChooseRandomColor() {
	//Math.random gives numbers between 0 to 1 not including 1(multiply by max value required+1). 
	//Math.floor truncates the decimal part
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function getRandomColors(num) {
	//array to store color values
	let arr = [];

	//assigning colors
	for(i=0; i<num; i++) {
		arr.push(generateRandomColors());
	}

	//return color array
	return arr;
}

function generateRandomColors() {
	//generate random values between 0 to 255
	let r =Math.floor(Math.random() * 256);
	let g =Math.floor(Math.random() * 256);
	let b =Math.floor(Math.random() * 256);

	//return in correct rgb format with spaces
	return ("rgb(" +r+ ", " +g+ ", " +b+ ")");
}

function setColors(level) {
	colors = getRandomColors(level);
	//pick random color
	colorPicked = ChooseRandomColor();
	//Display picked value in header
	colorDisplayed.textContent = colorPicked;
	//assign new colors to squares
	for(let i = 0; i<colors.length; i++) {
		squares[i].style.display = "block";
		squares[i].style.backgroundColor = colors[i];
	}
	for(i=(maxSquares-level);i!=(maxSquares+1);i++) 	{
		if(i==0){
			break;
		}
		squares[i].style.display = "none";
	}
}

function init() {
	setColors(level);
}

// easy.addEventListener("click", function() {
// 	//selected button color
// 	easy.classList.add("selected");
// 	hard.classList.remove("selected");

// 	//setrandom colors
// 	level = 3;
// 	setColors(level);

// 	//hide remaining squares
// 	for(i=0; i<level; i++)
// 	easyLevelSquares[i].style.display = "none";
// });

// hard.addEventListener("click", function() {
// 	//selected button color
// 	easy.classList.remove("selected");
// 	hard.classList.add("selected");

// 	//display all squares
// 	for(i=0; i<level; i++)
// 	easyLevelSquares[i].style.display = "block";

// 	//set random colors
// 	level = 6;
// 	setColors(level);
// });