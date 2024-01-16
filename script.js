const word = document.getElementById('word');
const guessletter = document.getElementById('guessLetter');

const submitbutton = document.getElementById('submitButton');
const lettersubmitbutton = document.getElementById('letterSubmitButton');

const wordDisplay = document.getElementById('wordDisplay');
const guessesLeft = document.getElementById('guessesLeft');
const lettersCorrectlyGuessed = document.getElementById('lettersCorrectlyGuessed');
const lettersIncorrectlyGuessed = document.getElementById('lettersIncorrectlyGuessed');
const lettersLeft = document.getElementById('lettersLeft');

let guessword = [];
let wrongLetters = [];
let correctLetters = [];

let guessesLeftInt = 6;

function useword() {
    if (word.value === '') {
        alert('Please enter a word!');
        return;
    }
    guessword.length = 0;
    wrongLetters.length = 0;
    correctLetters.length = 0;
    for (let i = 0; i < word.value.length; i++) {
        guessword.push(word.value[i]);
    }
    console.log(guessword);
    word.style.display = 'none';
    submitbutton.style.display = 'none';

    guessletter.style.display = 'block';
    lettersubmitbutton.style.display = 'block';
    wordDisplay.style.display = 'block';
    guessesLeft.style.display = 'block';
    lettersCorrectlyGuessed.style.display = 'block';
    lettersIncorrectlyGuessed.style.display = 'block';
    lettersLeft.style.display = 'block';
    lettersLeft.innerHTML = "Letters left: " + guessword.length;
    wordDisplay.innerHTML = "The word: " + "_ ".repeat(guessword.length);

    word.value = '';
}

function guessletters() {
    if (guessword.length == 0) {
        alert('Please enter a word first!');
        return;
    } else {
        console.log(guessletter.value);

        if (guessword.includes(guessletter.value)) {
            if (correctLetters.includes(guessletter.value) || wrongLetters.includes(guessletter.value) || guessletter.value === '') {
                alert('You already guessed that letter!');
            } else {
                for (let i = 0; i < guessword.length; i++) {
                    if (guessword[i] == guessletter.value) {
                        correctLetters.push(guessletter.value);
                        lettersCorrectlyGuessed.innerHTML = "Correctly guessed letters: " + correctLetters;
                        lettersLeft.innerHTML = "Letters left: " + (guessword.length - correctLetters.length);
                        console.log(correctLetters);
                        wordDisplay.innerHTML = "The word: " + guessword.join('').replace(/[^" "]/g, function (letter) {
                            if (correctLetters.includes(letter)) {
                                return letter;
                            } else {
                                return "_ ";
                            }
                        });
                    }
                }
            }
        } else {
            if (correctLetters.includes(guessletter.value) || wrongLetters.includes(guessletter.value) || guessletter.value === '') {
                alert('You already guessed that letter!');
            } else {
                wrongLetters.push(guessletter.value);
                guessesLeft.innerHTML = "You have " + (guessesLeftInt - wrongLetters.length) + " guesses left.";
                lettersIncorrectlyGuessed.innerHTML = "Incorrectly guessed letters: " + wrongLetters;
                console.log(wrongLetters);
                if (wrongLetters.length == 1) {
                    animate(50, 350, 250, 350, 0.5);
                } else if (wrongLetters.length == 2) {
                    draw_line(50, 50, 50, 350);
                } else if (wrongLetters.length == 3) {
                    draw_line(50, 50, 150, 50);
                } else if (wrongLetters.length == 4) {
                    draw_line(150, 50, 150, 100);
                } else if (wrongLetters.length == 5) {
                    draw_line(50, 75, 75, 50);
                } else if (wrongLetters.length == 6) {
                    draw_line(150, 200, 200, 250);
                }
            }
        }

        if (correctLetters.length == guessword.length) {
            alert('You win!');
            word.style.display = 'block';
            submitbutton.style.display = 'block';

            guessletter.style.display = 'none';
            lettersubmitbutton.style.display = 'none';
            guessesLeft.style.display = 'none';
            lettersCorrectlyGuessed.style.display = 'none';
            lettersIncorrectlyGuessed.style.display = 'none';
            lettersLeft.style.display = 'none';
            wordDisplay.innerHTML = "The word: " + guessword.join('');
        }

        if (wrongLetters.length == 6) {
            alert('You lose!');
            word.style.display = 'block';
            submitbutton.style.display = 'block';

            guessletter.style.display = 'none';
            lettersubmitbutton.style.display = 'none';
            guessesLeft.style.display = 'none';
            lettersCorrectlyGuessed.style.display = 'none';
            lettersIncorrectlyGuessed.style.display = 'none';
            lettersLeft.style.display = 'none';
            wordDisplay.innerHTML = "The word: " + guessword.join('');
        }
    }
    guessletter.value = '';
}

function draw_line(value1, value2, value3, value4, ratio) {
    const canvas_var = document.querySelector('#canvas_data');
    if (!canvas_var.getContext) {
        return;
    }
    const ct_var = canvas_var.getContext('2d');
    // set line stroke, line color, and line width  
    ct_var.strokeStyle = 'black';
    ct_var.lineWidth = 5;
    ct_var.lineCap = 'round';
    // draw a black line horizontally  
    ct_var.beginPath();
    //set horizontal line and its movement  
    ct_var.moveTo(value1, value2);
    //set the line size on the canvas  
    ct_var.lineTo(value3, value4);
    ct_var.stroke();
}

function animate(x1, y1, x2, y2, ratio) {
    ratio = ratio || 0;
    draw_line(x1, y1, x2, y2, ratio);
    if (ratio < 1) {
        requestAnimationFrame(function () {
            animate(ratio + 0.01);
        });
    }
}