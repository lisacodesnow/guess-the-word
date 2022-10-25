//Global Variables

const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector("button");
const inputLetter = document.querySelector("input");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanRemainingGuesses = document.querySelector("span");
const guessLetterMessages= document.querySelector(".message");
const playAgainButton = document.querySelector(".hide");

const word = "magnolia";

//Function to add placeholders for each letter

const symbolsAsWords = function(word){
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
	const guessInput = inputLetter.value;
	console.log(guessInput);
	inputLetter.value = "";
	
})