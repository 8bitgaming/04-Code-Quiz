let timerDisplay = document.querySelector("#timer");
let instructionsEl = document.querySelector("#start")
let mainContentEl = document.querySelector("#main-content")
let questionAnswers = document.querySelector("#question-answers")
let questionEl = document.querySelector("#questions")
let answersEl = document.querySelector("#answers")
let responseEl = document.querySelector("#response")
let endGameEl = document.querySelector("#end-game")
let currentQuestion = 0
let scoreIdCounter = 0
let highScores = []
let timer
let highScoreTableRow

//setup default time
let time = 15
timerDisplay.textContent = `Time: ${time}`



//array of questions
const questionList = [
{
    id: 0,
    question: "Commonly included data types do NOT include:",
    possibleAnswer: [
    "strings",
    "booleans",
    "alerts",
    "numbers" 
],
    correctAnswer: "alerts"
},
{
    id: 1,
    question: "question 2:",
    possibleAnswer: [
    "answer1",
    "answer2",
    "answer3",
    "answer4" 
],
    correctAnswer: "answer1"
},

{
    id: 2,
    question: "question 3:",
    possibleAnswer: [
    "apple",
    "orange",
    "banana",
    "apricot" 
],
    correctAnswer: "apricot"
},

{
    id: 3,
    question: "question 4:",
    possibleAnswer: [
    "apple",
    "orange",
    "banana",
    "apricot" 
],
    correctAnswer: "apricot"
},

{
    id: 4,
    question: "question 5:",
    possibleAnswer: [
    "apple",
    "orange",
    "banana",
    "apricot" 
],
    correctAnswer: "apricot"
},

]

// Start timer and remove initial instructions
const begin = () => {

    timer = setInterval(() => {
        if (time > 0){ 
            time--
            timerDisplay.textContent = `Time: ${time}`
        } else {
            clearInterval(timer)
            endGame()};
    }, 1000)

    let elem = document.querySelector("#start")
    elem.parentNode.removeChild(elem)
 
    quiz()
    
}


//instructions and create button
const setupQuiz = () => {

    //create the instructions
    instructionsEl.textContent = "Answer the questions before the time runs out. Each wrong answer will subtract ten seconds from the timer!"

    //create the start button
    let instructionButton = document.createElement("button")
    instructionButton.textContent = "Start the Quiz"
    instructionButton.className = "start-button"
    instructionsEl.appendChild(instructionButton)
}

//instantiate questions and answer buttons from the next available question
const quiz = () => {

    if (currentQuestion < questionList.length){

        questionEl.textContent = questionList[currentQuestion].question

            // clear any previous existing buttons
                while (answersEl.firstChild) {
                    answersEl.removeChild(answersEl.firstChild)
                    }
            //create answer list
            const possibleAnswers = questionList[currentQuestion].possibleAnswer
            for(var j = 0; j< possibleAnswers.length; j++){
                let buttonEl = document.createElement("button");
                buttonEl.textContent = possibleAnswers[j];
                buttonEl.value = possibleAnswers[j];
                buttonEl.className = "button";
                answersEl.appendChild(buttonEl);
            }
    }else {
        endGame()
    }
}

//check answer and display feedback
const checkAnswer = (event) => {
    let targetEl = event.target.value
    let correct = questionList[currentQuestion].correctAnswer

    if (targetEl === correct) {
        responseEl.textContent = "Correct!"
        currentQuestion++
    } else {
        responseEl.textContent = "Wrong!"
        // console.log("wrong")
        if (time > 10) {
            time = time - 10
        } else {
            time = 0
            timerDisplay.textContent = `Time: ${time}`  
            }
        currentQuestion++
    }
    quiz()
}

const endGame = () => {

    clearInterval(timer)
    currentQuestion = 0

    // clear questions and answers but leave last response for context
    
    while (questionEl.firstChild) {
        questionEl.removeChild(questionEl.firstChild)
    }
    while (answersEl.firstChild) {
        answersEl.removeChild(answersEl.firstChild)
    }
    //display end game message and score entry
    endGameEl.textContent = `All Done! Your final score was ${time}`

    //create high score entry form
    let highScoreInputForm = document.createElement("input");
    highScoreInputForm.type = "input"
    highScoreInputForm.placeholder = "Enter Your Initials"
    highScoreInputForm.name = "high-score"
    highScoreInputForm.className = "form";
    highScoreInputForm.id = "high-score-form";
    endGameEl.appendChild(highScoreInputForm);

    //high score entry button
    let highScoreInputButton = document.createElement("button");
    highScoreInputButton.className = "button";
    highScoreInputButton.textContent = "Submit"
    highScoreInputButton.id = "high-score-button"
    endGameEl.appendChild(highScoreInputButton);

    //listener for input
    document.querySelector("#high-score-button").addEventListener("click", setHighScore )
   
 
}

const setHighScore = (event) => {
    //create high score object and save to local storage
    let highScoreName = document.querySelector("input[name='high-score']").value
    let highScoreId = scoreIdCounter
    let highScoreValue = time

    if (!highScoreName) {
        alert("You need to put in your initials!");
        return false;
      }

    let highScoreObj = {
        id: highScoreId,
        name: highScoreName,
        score: highScoreValue
    }
    //add to array and increment id
    highScores.push(highScoreObj)
    highScoreObj.id++

    //add to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
  
    //call high score table to display
}

const highScore = () => {
    // clear screen
    while (questionAnswers.firstChild) {
        questionAnswers.removeChild(questionAnswers.firstChild)
    }
    
    let savedScores = localStorage.getItem("highScores")
    if (savedScores) {
        highScores = JSON.parse(savedScores);
    }  
    //convert tasks from string back into the original array
   
    
    //display high-score table
    if (highScores.length > 0) {
    questionAnswers.textContent = `Below are the high-scores:`
    } else {
        questionAnswers.textContent = `There are no high scores!`
        return
    }
  
    let highScoreTable = document.createElement("table");
    questionAnswers.appendChild(highScoreTable)
    highScoreTableRow = document.createElement("tr")
    highScoreTable.appendChild(highScoreTableRow)

      // loop through savedHighScore array to display in the table
  for (var i = 0; i < highScores.length; i++) {
    let scoreData = document.createElement("td")
    scoreData.textContent = `${highScores[i].id}: ${highScores[i].name} - ${highScores[i].score}`
    highScoreTableRow.appendChild(scoreData)

    

    // let highScoreTableRowID = document.createElement("tr")
    // highScoreTableRowID.textContent = "ID"
    // highScoreTable.appendChild(highScoreTableRowID)
    // let scoreID = document.createElement("td")
    // scoreID.id = highScores[i].id
    // scoreID.textContent = highScores[i].id
    // highScoreTableRowID.appendChild(scoreID)

    // let highScoreTableRowName = document.createElement("tr")
    // highScoreTableRowID.textContent = "Name"
    // highScoreTable.appendChild(highScoreTableRowName)
    // let scoreName = document.createElement("td")
    // scoreID.id = highScores[i].id
    // scoreID.textContent = highScores[i].name
    // highScoreTableRowName.appendChild(scoreName)


    // let highScoreTableRowScore = document.createElement("tr")
    // highScoreTableRowID.textContent = "Score"
    // highScoreTable.appendChild(highScoreTableRowScore)
    // let score = document.createElement("td")
    // scoreID.id = highScores[i].id
    // scoreID.textContent = highScores[i].score
    // highScoreTableRowScore.appendChild(score)

    console.log(highScoreTable)

  }

}

//clear high score function
// let highScoreClearButton = document.createElement("button");


//start program
setupQuiz()

// event listeners
document.querySelector(".start-button").addEventListener("click", e => {begin()})
document.querySelector("#answers").addEventListener("click", checkAnswer)
document.querySelector("#high-score").addEventListener("click", highScore)