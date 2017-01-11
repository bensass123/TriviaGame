//TRIVIA GAME JAVASCRIPT - FUTUROLOGY EDITION


//the game variable

var g;  

var totalQuestions, $button;

var userAnswer = 'z';

var myVar, maxtimelimit = 10, timelimit = maxtimelimit;  // set seconds per question at maxtimelimit

var buttons =[];

var currentQIndex = 0;



function startTimer() {
  myVar = setInterval(function(){myTimer()},1000);
  console.log('one second ' + timelimit);
  timelimit = maxtimelimit;
}

function myTimer() {
	console.log('myTimer called');
	if (timelimit > 0) {
		curmin=Math.floor(timelimit/60);
		cursec=timelimit%60;
		
		if (curmin!=0) { 
			curtime=curmin+" minutes and "+cursec+" seconds left"; 
		}
		else{ 
			curtime=cursec+" seconds left";
		}
				
		$('#timeRemaining').text(curtime);
	} 
	else{
		$('#timeRemaining').text(timelimit+' You\'re out of time!');
		clearInterval(myVar);
		g.userIncorrect('nothing!');
	}
  timelimit--;
}



function Question(id, text, aAnswer, bAnswer, cAnswer, dAnswer, correct) {
	this.id;
	this.text = text;
	this.aAnswer = aAnswer;
	this.bAnswer = bAnswer;
	this.cAnswer = cAnswer;
	this.dAnswer = dAnswer;
	this.correct = correct;
	
	this.$buttonA = $('<button>').text(aAnswer).addClass('answer').click(function () {
		response('a');
	});
	this.$buttonB = $('<button>').text(bAnswer).addClass('answer').click(function () {
		response('b');
	});
	this.$buttonC = $('<button>').text(cAnswer).addClass('answer').click(function () {
		response('c');
	});
	this.$buttonD = $('<button>').text(dAnswer).addClass('answer').click(function () {
		response('d');
	});	
	
	//add buttons to array
	this.buttonArray = [this.$buttonA, this.$buttonB, this.$buttonC, this.$buttonD];
}

function response(r) {
	console.log("at response currentQIndex is " + currentQIndex);
	if (g.questions[currentQIndex].correct === r) {
		g.userCorrect(r);
	}
	
	else {
		g.userIncorrect(r);
	}
}

Game.prototype.userCorrect = function(r) {
	$('#result').addClass('result');
	$('#result').text('You guessed ' + r.toUpperCase() + '.' + ' That is Correct!');
	//stop timer
	clearInterval(myVar);
	//increment correctAnswers
	this.correctAnswers++;
	$('#timeRemaining').text('');
		//disables buttons and changes opacity
	for (i = 0; i < g.questions[currentQIndex].buttonArray.length; i++) {
		this.questions[currentQIndex].buttonArray[i].addClass('disabled').off("click");
		console.log('disabled');
	}
	
	setTimeout(function() {

		g.nextQuestion();
	}, 5000);
}

Game.prototype.userIncorrect = function(r) {
	$('#result').addClass('result');
	if (r === "nothing!"){
			$('#result').text('You ran out of time! The correct answer is ' + this.questions[currentQIndex].correct.toUpperCase());
	}
	else {
		$('#result').text('You guessed ' + r.toUpperCase() + '.' + ' That is Incorrect! The correct answer is ' + this.questions[currentQIndex].correct.toUpperCase());
	}
	//stop timer
	clearInterval(myVar);
		//increment correctAnswers
	$('#timeRemaining').text('');
		//disables buttons and changes opacity
	for (i = 0; i < g.questions[currentQIndex].buttonArray.length; i++) {
		this.questions[currentQIndex].buttonArray[i].addClass('disabled').off("click");
		console.log('disabled');
	}
	
	setTimeout(function() {
		
		g.nextQuestion();
	}, 5000);

}




function Game() {
	this.correctAnswers = 0;
	this.questions = [];
	console.log('New Game created');
}


Game.prototype.addQuestions = function(){
	var question1 = new Question(1, "What is Elon's last name?", "Squeelon", "Shmeelon", "Musk", "Ox", "c");
	var question2 = new Question(2, 'What type of power do the Netherlands electric passenger trains run on?', "Solar", "Wind", "Hydrogen", "The power of positive thinking", "b");
	var question3 = new Question(3, "What is the name of IBM's question answering computer system capable of answering questions posed in natural language?", "Holmes", "Krestchin", "Watson", "Solve", "c");
	var question4 = new Question(4, "What do scientists use to try to receive signals from extraterrestrial life?", "A Samsung Galaxy S3", "The Hubble Telescope's exhaust port", "An enhanced telegraph", "Radio telescopes", "d");
	this.questions.push(question1);
	this.questions.push(question2);
	this.questions.push(question3);
	this.questions.push(question4);

	//set number of total questions
	totalQuestions = this.questions.length;
}


Game.prototype.displayQuestion = function(q){
	$('#text').text(q.text);
	$('#aAnswer').append(q.$buttonA);
	$('#bAnswer').append(q.$buttonB);
	$('#cAnswer').append(q.$buttonC);
	$('#dAnswer').append(q.$buttonD);
	console.log('displayQuestion');
	timelimit = maxtimelimit;
	clearInterval(myVar);
	startTimer();
	console.log('timer started');
}


//displays questions and increments question counter
Game.prototype.runGame = function(){
	//display question, start timer, wait for answer
	this.displayQuestion(this.questions[currentQIndex]);
}


Game.prototype.nextQuestion = function(){
	$('.answer').text('');
	$('#text').text('');
	$('#result').text('');
	console.log("at nextQ before increment currentQIndex is " + currentQIndex);
	//display question, start timer, wait for answer
	if (currentQIndex < this.questions.length - 1) {
		console.log("CurrentQIndex: " + currentQIndex);
		currentQIndex++;
		console.log("at nextQ after increment currentQIndex is " + currentQIndex);
		console.log("CurrentQIndex: " + currentQIndex);
		this.displayQuestion(this.questions[currentQIndex]);
	}
	
	else {
		$('#result').text('You got ' + this.correctAnswers + ' questions out of ' + this.questions.length + '. That is ' + Math.floor((this.correctAnswers/this.questions.length) * 100) + '%');
		var $restart = $('<button>')
			.text('Restart')
			.click(function () {
				currentQIndex = 0;
				$('#result').html('');
				g = new Game();
				g.addQuestions();
				g.runGame();
				
			});
		$restart.addClass('restart');
		$('#result').append($restart);
	}
}
	

document.body.onload = function() {
	currentQIndex = 0;
	g = new Game();
	g.addQuestions();
	g.runGame();
	
}









