//Global Variables

const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector("button");
const inputLetter = document.querySelector("input");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesSpan = document.querySelector(".remaining");
const spanRemainingGuesses = document.querySelector("span"); // remaining guesses message span
const guessLetterMessages= document.querySelector(".message");
const playAgainButton = document.querySelector(".hide");

let word = "magnolia";

//Guessed letters will be stored in this array
let guessedLetters = [];

// Number of guesses left

let remainingGuesses = 8;

const getWord = async function(){
	const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
	const words = await res.text()
	//console.log(data);
	
	const wordArray = words.split("\n");
	//console.log(wordArray);
	const randomIndex = Math.floor(Math.random()* wordArray.length);
	word = wordArray[randomIndex].trim();
	placeholder(word);
	
};


getWord();

//Function to add placeholders for each letter

const placeholder = function(word){
	const symbolsForLetters = [];
	for (let letters of word){
		symbolsForLetters.push("●");
	};
	
wordInProgress.innerText = symbolsForLetters.join("");

};

// Add event listener for button and inputing letters into the guess space

guessButton.addEventListener("click", function(e){
	e.preventDefault(); 
	const guess = inputLetter.value;
	//console.log(guessInput);
	inputLetter.value = "";
	guessLetterMessages.innerText = "";
	const goodGuess = validateInput(guess);
	//console.log(goodGuess);
	
	if(goodGuess){
		makeGuess(goodGuess);
	};
});

//Function to check Player's Input is a letter. Its not checking if its the right letter thats the makeGuess function
const validateInput = function(guess){
	const acceptedLetter = /[a-zA-Z]/;	
	if(guess.length === 0){
		guessLetterMessages.innerText ="Guess a letter.";
	} else if (guess.length > 1){
		guessLetterMessages.innerText = "Too many letters";
	} 
	else if (!guess.match(acceptedLetter)){
		guessLetterMessages.innerText ="Guess a letter from A to Z";
	}
	//return input if the correct letter is guessed
	else{
		return guess;
	}
}

//Function to Capture Input so it can be compared against the letters in the array. If its the same letter then a message will appear

const makeGuess = function(guess){
	guess = guess.toUpperCase();
	if (guessedLetters.includes(guess)){
		guessLetterMessages.innerText = "Already guessed this letter. Try Again"
	}
	else {
		guessedLetters.push(guess);
		//console.log(guessedLetters);
		showGuessedLetters();
		countGuessesRemaining(guess);
		updateWordInProgress(guessedLetters);
		
		
	}
}

// Function to show guessed letters


const showGuessedLetters = function(){
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
	wordInProgress.innerText = revealWord.join("");
	
	playerWon();
		
	}


// function to count guesses remaining

const countGuessesRemaining = function(guess){
	const upperWord = word.toUpperCase();
	if (!upperWord.includes(guess)){
		guessLetterMessages.innerText = `${guess} is incorrect`;
		remainingGuesses -= 1;
	} else{
		guessLetterMessages.innerText = `${guess} is correct`;
	}
	
	if(remainingGuesses === 0){
		guessLetterMessages.innerHTML = `Game over and the word is <span class = "highlight">${upperWord}</span>.`
		remainingGuessesSpan.innerText= "";
		startOver();
	} else if (remainingGuesses === 1){
		remainingGuessesSpan.innerText = `${remainingGuesses} guesses remaining`;
	}
	else{
		remainingGuessesSpan.innerText = `${remainingGuesses} guesses remaining`;
	}
}; 

//Function to check if the player won

const playerWon = function(){
	if (word.toUpperCase()===wordInProgress.innerText){
		guessLetterMessages.classList.add("win");
		guessLetterMessages.innerHTML = `<p class = "highlight">${word.toUpperCase()} is the correct word, Congrats!</p>`;
		startOver();
	}
}

const startOver = function(){
	guessButton.classList.add("hide");
	remainingGuessesSpan.classList.add("hide");
	guessedLettersElement.classList.add("hide");
	playAgainButton.classList.remove("hide");
	
}

playAgainButton.addEventListener("click", function(){
	guessLetterMessages.classList.remove("win");
	guessLetterMessages.innerText= "";
	guessedLettersElement.innerText="";
	remainingGuesses = 8; 
	guessedLetters = [];
	remainingGuessesSpan.innerText= `You have ${remainingGuesses} guesses remaining`;
	
	guessButton.classList.remove("hide");
	remainingGuessesSpan.classList.remove("hide");
	guessedLettersElement.classList.remove("hide");
	playAgainButton.classList.add("hide");
	

	getWord();
})