//Global Variables

const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector("button");
const inputLetter = document.querySelector("input");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanRemainingGuesses = document.querySelector("span");
const guessLetterMessages= document.querySelector(".message");
const playAgainButton = document.querySelector(".hide");

const word = "magnolia";
//Guessed letters will be stored in this array
const guessedLetters = [];




//Function to add placeholders for each letter

const symbolsAsWords = function(word){
	//use an empty array to store the word
	const symbolsForLetters = [];
	for (let letters of word){
		console.log(letters);
		symbolsForLetters.push("●");
	};
	
wordInProgress.innerText = symbolsForLetters.join("");

};

// Add event listener for button and inputing letters into the guess space

guessButton.addEventListener("click", function(e){
	e.preventDefault(); // prevents browser from submitting the form
	// the letter entered
	const guessInput = inputLetter.value;
	//console.log(guessInput);
	//empty the letter guessed
	inputLetter.value = "";
	//empty the message
	guessLetterMessages.innerText = "";
	// save the function call to a variable, so the variable is going to store the value of the guessinput
	const goodGuess = checkInput(guessInput);
	console.log(goodGuess);
	
	makeGuess(guessInput);
})


//Function to check Player's Input
const checkInput = function(input){
	const acceptedLetter = /[a-zA-Z]/;
	//using length to determine if the input is empty instead of an empty string ""
	if(input.length === 0){
		guessLetterMessages.innerText ="Guess a letter.";
	} else if (input.length > 1){
		guessLetterMessages.innerText = "Too many letters";
	} 
	//match is used to make sure an alphabet is being used and not some other symbol. USE ! to show something is NOT adding up
	else if (!input.match(acceptedLetter)){
		guessLetterMessages.innerText ="Guess a letter from A to Z";
	}
	//return input if the correct letter is guessed
	else{
		return input;
	}
}

//Function to Capture Input so it can be compared against the letters in the array. If its the same letter then a message will appear

const makeGuess = function(guessInput){
	// Java is case sensitive so convert text to uppercase
	guess = guessInput.toUpperCase();
	if (guessInput.includes(guess)){
		guessLetterMessages.innerText = "Already guessed this letter. Try Again"
	}
	else {
		guessedLetters.push(guess);
		console.log(guessedLetters);
		//call showGuessedLetters here so it displays a letter that hasn't been guessed before
		showGuessedLetters();
		updateWordInProgress(guessedLetters);
	};
}

// Function to show guessed letters


const showGuessedLetters = function(){
	//Clear the list first
	guessedLettersElement.innerHTML = "";
	for (const letter of guessedLetters) {
		let li = document.createElement("li");
		li.innerText = letter;
		guessedLettersElement.append(li);
		
		
	}
}; 
 // Function to update word in progress and to reveal the correct letters in place of the dot

const updateWordInProgress = function(guessedLetters){
	const wordUpper = word.toUpperCase();
	// I see splitting the wordupper's string as splitting the word into letters
	const wordArray = wordUpper.split("");
	//console.log(wordArray);
	const revealWord = [];
	for (let letter of wordArray){
		if(guessedLetters.includes(letter)){
			revealWord.push(letter.toUpperCase());
		} else{
			revealWord.push("●");
		}
	}
	//join is joining array elements into a string
	wordInProgress.innerText = revealWord.join("");
	
	playerWon();
		
	}

//Function to check if the player won

const playerWon = function(){
	if (word.toUpperCase()===wordInProgress.innerText){
		guessLetterMessages.classList.add("win");
		guessLetterMessages.innerHTML = `<p class = "highlight"> You guessed the correct word! Congrats!</p>`;
	}
}

