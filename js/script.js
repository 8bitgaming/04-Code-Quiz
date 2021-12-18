let timerDisplay = document.querySelector("#timer");
let time = 5
let totalScore = 0

//array of questions
const questions = [
{
    id: 1,
    points: 10,
    question: "Commonly included data types do NOT include:",
    possibleAnswer: {
    a: "1: strings",
    b: "2: booleans",
    c: "3: alerts",
    d: "4: numbers", 
    },
    correctAnswer: "c"
},

{
    id: 2,
    points: 10,
    question: "Question 2:",
    possibleAnswer: {
    a: "asdfasdf",
    b: "asdfgggg",
    c: "asdghhhh",
    d: "lkjojpo9ijg", 
    },
    correctAnswer: "a"
},

{
    id: 3,
    points: 10,
    question: "Question 3:",
    possibleAnswer: {
    a: "1: adsf",
    b: "asdfgggg",
    c: "asdghhhh",
    d: "lkjojpo9ijg", 
    },
    correctAnswer: "a"
},
]



//utility function to create a button
const createButton = (attachTo, id, text) => {
attachTo.innerHTML = "<button class='answerButton'>" + text + "</button>"
//use setattribue to set ID
}

//attach id
var createTaskActions = function(taskId) {

};


// Timer

const timer = setInterval(() => {
    if (time > 0){ 
        time--
        timerDisplay.textContent = `Time: ${time}`
    } else {endGame()}
}, 1000)


// const timerCount = () => {
//     time--
    
//     console.log(time)
// } 
// let timer = setTimeout(timerCount, 1000)

//instructions, set time to zero and start timer on start button click

let startButton = document.querySelector("#start-timer")
// createButton(thing, 1, "Start the Quiz")
// startButton.addEventListener("click", taskFormHandler);



//while time > zero - use timer since it is asycronous!

// for loop through questions - at end of questions stop timer

//create question on screen

//check answer and display feedback
//if wrong - subtract 10 sec from timer

//end game
const endGame = () => {
    clearInterval(timer)
    console.log("end game")
}

//high score table screen

//clear high score function
