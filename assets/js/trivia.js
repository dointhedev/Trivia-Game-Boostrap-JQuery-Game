/*::::::DOM CACHE::::::*/
var gameCnt = $("#gameCont");
var audio = document.getElementById('bg_tr');

/*::::::Global Variable::::::*/
var counter = 30;
var questions = ["This hot spring can be found right outside of Mammoth Lakes CA?", "This National Park was brought to us by a melting glacier around 10 million years ago?", "As a result of the mountains to the east and the pacific ocean to the west. This forest has the tallest trees in the world?", "This part of CA is the lowest part of the world and was a treacherous place for settlers on their last part of their journey out west?",
    "The town of Graeagle CA, should have been called Grey Eagle Creek however, this happened?", "This part of CA has some of the best Scuba Diving in the world?", "What country was Venice CA, belong too before the US?", "Why is everything in CA start with Santa?"
];
var answer = [
    ["A. Wild Willy's Hot Spring", "B. Agua Caliente", "C. Orr Hot Springs", "D. Surprise Valley"],
    ["A. Sequoia National Park", "B. Yellow-Stone National", "C. Yosemite National Park", "D. Kings Canyon Nation Park"],
    ["A. Sequoia National Park", "B. Yosemite National Park", "C. Kings Canyon Nation Park", "D. Redwood National Park"],
    ["A. Big Sur", "B. Death Valley", "C. Great San Dunes N.P.", "D. Mt. Whitney"],
    ["A. On inauguration of this town everyone was so drunk they misspelled the name of their town.", "B. The U.S denied the name before it can get approved", "C. Another state was already names that name.", "D. The mayor did not like that name"],
    ["A. Ventura", "B. Bay Area", "C. San Diego", "D. Catalina Island"],
    ["A. France", "B. Mexico", "C. US", "D. Great Britain"],
    ["A. It looked better on the map", "B. The US is a very christian country", "C. That's what the entertainment industry wanted", "D. The spanish settled CA originally and created missions to spread to word of christ. They loved to name things after their saints"]
];

var imageArray = ["<img class='center-block img-right' src='img/australia.png'>", "<img class='center-block img-right' src='img/liberia.png'>", "<img class='center-block img-right' src='img/taiwan.png'>", "<img class='center-block img-right' src='img/japan.png'>", "<img class='center-block img-right' src='img/china.png'>", "<img class='center-block img-right' src='img/turkey.png'>", "<img class='center-block img-right' src='img/colombia.png'>", "<img class='center-block img-right' src='img/india.png'>"];
var correctAnswers = ["A. Wild Willy's Hot Spring", "C. Yosemite National Park", "D. Redwood National Park", "B. Death Valley", "A. On inauguration of this town everyone was so drunk they misspelled the name of their town.", "D. Catalina Island", "B. Mexico", "D. The spanish settled CA originally and created missions to spread to word of christ. They loved to name things after their saints"];
var questionCounter = 0;
var selectedAnswer;
var clock;
var totalCorrect = 0;
var totalIncorrect = 0;
var totalUnAnswered = 0;
var clickSound = new Audio("assets/audio/button-click.mp3");
var yaySound = new Audio("assets/audio/yay.mp3");
var noSound = new Audio("assets/audio/no.mp3");
console.log(clickSound);

/*
1. This hotSprings can be found right outside of Mammoth Lakes CA.  ~ Wild Willy's Hot Spring
2. This National Park was brought to us by a melting glacier around 10 million years ago. ~ Yosemte National Park
3. As a result of the mountains to the east and the pacific ocean to the west. This forest has the tallest trees in the world.  ~ Redwood National Park
4. This part of CA is the lowest part of the world and was a treacherous place for settlers on their last part of their journey out west. ~ Death Valley 
5. The town of Graeagle CA, should have been called Grey Eagle Creek however, this happened. ~ On inauguration of this town everyone was so drunk they misspelled the name of their town. 
6. This part of CA has some of the best Scuba Diving in the world ~ Catalina Island 
7. What country was Venice CA, belong too before the US. ~ Mexico 
8. Why is everything in CA start with Santa? ~ The spanish settled CA originally and created missions to spread to word of christ. They loved to name things after their saints. 
*/

// document load gameSetup();
$(document).ready(function() {
    // Create a function that creates the start button and initial screen
    function gameSetup() {
		gameCnt.empty();
        gameCnt.html("<h1 class='title-triv pt-3'>California Trivia Game</h1>" +
		" <button class='start btn btn-outline-light my-5'>Start Game</button>");
		audio.play();
    }

    gameSetup();
    
    // This function, generates HTML and Starts Counter 
    
    $("body").on("click", ".start", function(event){
        clickSound.play();
        generateHTML();
        timer();
    
    });

$("body").on("click", ".answer", function(event){
	//answeredQuestion = true;
	clickSound.play();
    selectedAnswer = $(this).text();
    console.log(selectedAnswer);
	if(selectedAnswer === correctAnswers[questionCounter]) {
		//alert("correct");
		console.log("Correct");
		
		clearInterval(clock);
		userCorrect();
	}
	else {
        //alert("wrong answer!");
        console.log("InCorrect");

		clearInterval(clock);
		userIncorrect();
	}
}); 

$("body").on("click", ".reset", function(event){
	clickSound.play();
	resetGame();
}); // Closes reset-button click


});
function resume() {
	audio.play();
}
function pause() {
	if (questionCounter < 7) {
	questionCounter++;
	generateHTML();
	counter = 30;
	timer();
	}
	else {
		finalScreen();
	}
}

function timer() {
	clock = setInterval(thirtySeconds, 1000);
	function thirtySeconds() {
		if (counter === 0) {
			clearInterval(clock);
			timeOut();
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html(counter);
	}
}
function userCorrect() {
	totalCorrect++;
	audio.pause();
	yaySound.play();
	setTimeout(resume, 5000);  
	$("#times").html(" ");
	$("#gameAnswer").html(" ");
	$("#gameAnswer").html("<div class='d-flex justify-content-center'> <iframe src='https://giphy.com/embed/l0MYFacIZsZTaYx9K' width='480' height='258' frameBorder='0' class='giphy-embed' allowFullScreen></iframe></div>");
	$("#text-area").text("You Guessed It Right :) " + correctAnswers[questionCounter]);
    console.log(totalCorrect);
	gameHTML = "<div class='py-3'><h4>Time Remaining: <small class='blueClr timer'>" + counter + "</small></h4>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$(".mainArea").html(gameHTML);
	setTimeout(pause, 5000);  
	
}

function userIncorrect() {
	totalIncorrect++;
	audio.pause();
	noSound.play();
	setTimeout(resume, 5000); 
	$("#times").html(" ");
	$("#gameAnswer").html(" ");
	$("#gameAnswer").html("<div class='d-flex justify-content-center'> <iframe src='https://giphy.com/embed/vPN3zK9dNL236' width='480' height='376' frameBorder='0' class='giphy-embed' allowFullScreen></iframe></div>");
	$("#text-area").html("<div>You Guessed It Wrong :(</div> " + "<div>The right answer was: " + correctAnswers[questionCounter] + "</div>");
    console.log(totalIncorrect);
	gameHTML = "<div class='py-3'><h4>Time Remaining: <small class='blueClr timer'>" + counter + "</small></h4>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='img/x.png'>";
	$(".mainArea").html(gameHTML);
	setTimeout(pause, 5000); 
}

function generateHTML(){
    gameHTML = "<h1 class='title-triv'>California Trivia Game</h1>" +
    "<div class='py-3'><h4 id='times'>Time Remaining: <small class='blueClr timer'>30</small></h4>" +
    "<p id='text-area' class='py-2'>" + questions[questionCounter] + "</p>" +
    " <div id='gameAnswer' class='pb-3 d-flex justify-content-left flex-column'>" +
    " <button type='button' class='btn btn-outline-secondary mt-1 mb-3 d-flex justify-content-left w-100 answer'>" + answer[questionCounter][0] + "</button>" +
    " <button type='button' class='btn btn-outline-secondary mt-1 mb-3 d-flex justify-content-left w-100 answer'>" + answer[questionCounter][1] + "</button>" +
    " <button type='button' class='btn btn-outline-secondary mt-1 mb-3 d-flex justify-content-left w-100 answer'>" + answer[questionCounter][2] + "</button>" +
    " <button type='button' class='btn btn-outline-secondary mt-1 mb-3 d-flex justify-content-left w-100 answer'>" + answer[questionCounter][3] + "</button>" ;
gameCnt.html(gameHTML);
}

function finalScreen() {
    gameHTML =  "<h3 class='py-4'>You Finished The Game:" + "</h3>" + "<p>Correct Answers: " + totalCorrect + "</p>" + "<p>Wrong Answers: " + totalIncorrect + "</p>" + "<p class='reset-container'><a class='reset btn btn-outline-light mt-4 mb-3' href='#' role='button'>Reset The Quiz!</a></p>";
	gameCnt.html(gameHTML);
}
function resetGame() {
	audio.currentTime = 0;
    audio.play();
	questionCounter = 0;
	totalCorrect = 0;
	totalIncorrect = 0;
	counter = 30;
	generateHTML();
	timer();
}

function timeOut() {
	audio.pause();
	noSound.play();
	gameHTML =  "<h3 class='py-4'>Your TIME RAN OUT :(((((" + "</h3>" + "<p class='reset-container'><a class='reset btn btn-outline-light mt-4 mb-3' href='#' role='button'>Reset The Quiz!</a></p>";
	gameCnt.html(gameHTML);
    console.log("Timeout");
    }