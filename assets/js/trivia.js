/*::::::DOM CACHE::::::*/
const gameCnt = $("#gameCont");
const audio = document.getElementById('bg_tr');

/*::::::DATA::::::*/
const questions = ["This hot spring can be found right outside of Mammoth Lakes CA?", "This National Park was brought to us by a melting glacier around 10 million years ago?", "As a result of the mountains to the east and the pacific ocean to the west. This forest has the tallest trees in the world?", "This part of CA is the lowest part of the world and was a treacherous place for settlers on their last part of their journey out west?",
	"The town of Graeagle CA, should have been called Grey Eagle Creek however, this happened?", "This part of CA has some of the best Scuba Diving in the world?", "What country was Venice CA, belong too before the US?", "Why is everything in CA start with Santa?"
];

const answer = [
	["A. Wild Willy's Hot Spring", "B. Agua Caliente", "C. Orr Hot Springs", "D. Surprise Valley"],
	["A. Sequoia National Park", "B. Yellow-Stone National", "C. Yosemite National Park", "D. Kings Canyon Nation Park"],
	["A. Sequoia National Park", "B. Yosemite National Park", "C. Kings Canyon Nation Park", "D. Redwood National Park"],
	["A. Big Sur", "B. Death Valley", "C. Great San Dunes N.P.", "D. Mt. Whitney"],
	["A. On inauguration of this town everyone was so drunk they misspelled the name of their town.", "B. The U.S denied the name before it can get approved", "C. Another state was already names that name.", "D. The mayor did not like that name"],
	["A. Ventura", "B. Bay Area", "C. San Diego", "D. Catalina Island"],
	["A. France", "B. Mexico", "C. US", "D. Great Britain"],
	["A. It looked better on the map", "B. The US is a very christian country", "C. That's what the entertainment industry wanted", "D. The spanish settled CA originally and created missions to spread to word of christ. They loved to name things after their saints"]
];

const correctAnswers = ["A. Wild Willy's Hot Spring", "C. Yosemite National Park", "D. Redwood National Park", "B. Death Valley", "A. On inauguration of this town everyone was so drunk they misspelled the name of their town.", "D. Catalina Island", "B. Mexico", "D. The spanish settled CA originally and created missions to spread to word of christ. They loved to name things after their saints"];

/*::::::COUNTERS::::::*/
let counter = 30;
let questionCounter = 0;
let selectedAnswer;
let clock;
let totalCorrect = 0;
let totalIncorrect = 0;

/*::::::GLOBAL VARIABLES::::::*/
const clickSound = new Audio("assets/audio/button-click.mp3");
const yaySound = new Audio("assets/audio/yay.mp3");
const noSound = new Audio("assets/audio/no.mp3");

// Document load gameSetup function.
$(document).ready(gameSetup);

/*::::::EVENT LISTENERS::::::*/
// This event, generates the HTML and starts counter.
$("body").on("click", ".start", generateHTML);
// This event, generates the logic after the user clicks an answer. 
$("body").on("click", ".answer", clickAnswer);
// This even, restarts the game.
$("body").on("click", ".reset", resetGame);
// This event, generates the click.
$("body").on("click", ".click", click);


/*::::::GAME FUNCTIONS::::::*/
// Create a function that creates the start button and initial screen.
function gameSetup() {
	gameCnt.empty();
	audio.play();
	const h1 = genElement("<h1>", null, "title-triv pt-3", "California Trivia Game");
	const btn = genElement("<button>", null, "start click btn btn-outline-light my-5", "Start Game");
	gameCnt.append(h1, btn);
}

// This function generates the HTML each round.
function generateHTML() {
	$("#gameCont").empty();
	timer();
	const h1 = genElement("<h1>", null, "title-triv", "California Trivia Game");
	const statBoard = genTimer();
	const question = genElement("<p>", "text-area", "py-2", questions[questionCounter]);
	const btns = genBtns(answer[questionCounter]);
	gameCnt.append(h1, statBoard, question, btns);
}

// This function generates the logic after the user clicks an answer. 
function clickAnswer() {
	counter = 0;
	selectedAnswer = $(this).text();
	if (selectedAnswer === correctAnswers[questionCounter]) {
		clearInterval(clock);
		userCorrect();
	} else {
		clearInterval(clock);
		userIncorrect();
	}
}

// Logic for when the user answers correctly. 
function userCorrect() {
	totalCorrect++;
	audio.pause();
	yaySound.play();
	setTimeout(resume, 5000);
	$("#times").empty();
	$("#text-area").html(`You Guessed It Right! <br> ${correctAnswers[questionCounter]}`);
	const gif = genGiph("https://giphy.com/embed/l0MYFacIZsZTaYx9K", "258");
	$("#gameAnswer").html(gif);
	setTimeout(pause, 5000);
}

// Logic for when the user answers incorrectly. 
function userIncorrect() {
	totalIncorrect++;
	audio.pause();
	noSound.play();
	setTimeout(resume, 5000);
	$("#times").empty();
	$("#text-area").html(`You Guessed It Wrong! <br> ${correctAnswers[questionCounter]}`);
	const gif = genGiph("https://giphy.com/embed/vPN3zK9dNL236", "376");
	$("#gameAnswer").html(gif);
	setTimeout(pause, 5000);
}

// Once user wins this is the final state of the game. 
function finalScreen() {
	gameCnt.empty();
	const h3 = genElement("<h3>", null, "py-4", "You Finished The Game!");
	const p = genElement("<p>", null, "py-1", `Correct Answers: ${totalCorrect}`);
	const p2 = genElement("<p>", null, null, `Wrong Answers:  ${totalIncorrect}`);
	const btn = genElement("<button>", null, "reset btn click btn-outline-light mt-4 mb-3", "Reset The Quiz!");
	gameCnt.append(h3, p, p2, btn);
}

// The game's counter function. 
function timer() {
	counter = 30;
	clock = setInterval(countdown, 1000);

	function countdown() {
		if (counter === 0) {
			clearTimeout(clock);
			timeOut();
		} else {
			counter--;
		}
		$(".timer").html(counter);
	}
}

// Running out of time will load this function. 
function timeOut() {
	gameCnt.empty();
	audio.pause();
	noSound.play();
	const h3 = genElement("<h3>", null, "py-4", "YOUR TIME RAN OUT!");
	const btn = genElement("<button>", null, "reset click btn btn-outline-light mt-4 mb-3", "Reset The Quiz!");
	gameCnt.append(h3, btn);
}

// Resets Game.
function resetGame() {
	document.location.reload();
}

/*::::::HELPER FUNCTIONS::::::*/
// Resumes the game's audio
function resume() {
	audio.play();
}

// Function to play click sound on events.
function click() {
	clickSound.play();
}

// Function that has a condition once an answer is made to traverse through the data until all answers have been asked.
function pause() {
	if (questionCounter < 7) {
		questionCounter++;
		generateHTML();
	} else {
		finalScreen();
	}
}

// Function to generate all HTML elements in this trivia game. 
function genElement(type, id, className, text) {
	const element = $(type).addClass(className).text(text);
	if (id !== null) {
		element.attr("id", id);
	}
	return element;
}

// Function to generate the counter element. 
function genTimer() {
	const statBoard = genElement("<div>", null, null, null);
	const timeCont = genElement("<h4>", "times", null, "Time Remaining:");
	const time = genElement("<small>", null, "blueClr px-1 timer", "30");
	timeCont.append(time);
	return statBoard.append(timeCont);
}

// Function to generate the game's Giphs. 
function genGiph(path, height) {
	const gifCont = genElement("<div>", null, "d-flex justify-content-center", null);
	const iFrame = genElement("<iframe>", null, "d-flex justify-content-center", null);
	iFrame.attr({
		src: path,
		width: "480",
		height: height,
		frameBorder: "0"
	});
	return gifCont.append(iFrame);
}

// Function that generates the answers each round. 
function genBtns(ans) {
	const gameAnswer = genElement("<div>", "gameAnswer", "pb-3 d-flex justify-content-left flex-column", null);
	for (let i = 0; i <= 3; i++) {
		gameAnswer.append(genElement("<button>", null, "answer click btn btn-outline-secondary mt-1 mb-3 d-flex justify-content-left w-100", ans[i]));
	}
	return gameAnswer;
}