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
let highScoreId
let highScores = []
let timer
let highScoreTableRow

//setup default time
let time = 90
timerDisplay.textContent = `Time: ${time}`



//array of questions
const questionList = [
{
    id: 0,
    question: "What was the name of the final meeting between Soviet Union, United Kingdom and the United State's leaders in 1945?",
    possibleAnswer: [
    "Yalta Conference",
    "Potsdam Conference",
    "Casablanca Conference",
    "Bretton Woods Conference" 
],
    correctAnswer: "Yalta Conference"
},
{
    id: 1,
    question: "During which years did World War II hostilities occur?",
    possibleAnswer: [
    "1914- 1918",
    "1938 - 1944",
    "1939 - 1945",
    "1941 - 1946" 
],
    correctAnswer: "1939 - 1945"
},

{
    id: 2,
    question: "Who was the president of the United States at the end of World War II?",
    possibleAnswer: [
    "Herbert Hoover",
    "Franklin D. Roosevelt",
    "Teddy Roosevelt",
    "Harry S. Truman" 
],
    correctAnswer: "Harry S. Truman"
},

{
    id: 3,
    question: "Who was the prime minister of Great Britain at the beginning of hostilities during World War II?",
    possibleAnswer: [
    "Winston Churchill",
    "Neville Chamberlain",
    "Stanley Baldwin",
    "Josef Stalin" 
],
    correctAnswer: "Neville Chamberlain"
},

{
    id: 4,
    question: "In which country did the D-Day invasion primarily take place?",
    possibleAnswer: [
    "Belgium",
    "Germany",
    "France",
    "Italy" 
],
    correctAnswer: "France"
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
    instructionsEl.textContent = "Answer the following World War 2 history questions before the time runs out. Each wrong answer will subtract ten seconds from the timer!"

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
    highScoreInputForm.placeholder = "Enter Your name"
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
    //load existing highscores if any exist
    let savedScores = localStorage.getItem("highScores")
    if (savedScores) {
        highScores = JSON.parse(savedScores);
    }  
    
    //create high score object and save to local storage
    console.log(highScores)
    let highScoreName = document.querySelector("input[name='high-score']").value
    
    if (highScores.length >0 ) {
        highScoreArray= highScores.at(-1)
        highScoreId = highScoreArray.id
    } else {
        highScoreId = 0
    }
   
    let highScoreValue = time

    if (!highScoreName) {
        alert("You need to put in your name!");
        return false;
      }

    let highScoreObj = {
        id: highScoreId + 1,
        name: highScoreName,
        score: highScoreValue
    }
    //add to array and increment id
    highScores.push(highScoreObj)
 
    //add to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
  
    //call high score table to display
    highScore()
}

const highScore = () => {
    // clear screen
    while (questionAnswers.firstChild) {
        questionAnswers.removeChild(questionAnswers.firstChild)
    }
    
    //convert tasks from string back into the original array
    let savedScores = localStorage.getItem("highScores")
    if (savedScores) {
        highScores = JSON.parse(savedScores);
    }  
      
    
    //display high-score table
    if (highScores.length > 0) {
    questionAnswers.textContent = `Below are the high-scores:`
    } else {
        questionAnswers.textContent = `There are no high scores! Take the quiz to add a high score!`
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
  }

    //create button to clear high scores
    let highScoreClearButton = document.createElement("button");
    highScoreClearButton.id = "clear-high-score"
    highScoreClearButton.textContent = "Clear High Scores"
    questionAnswers.appendChild(highScoreClearButton)
    document.querySelector("#clear-high-score").addEventListener("click", clearHighScore)

    //create try again button
    // let tryAgain = document.createElement("button");
    // tryAgain.id = "try-again"
    // tryAgain.textContent = "Try Again"
    // questionAnswers.appendChild(tryAgain)
    // document.querySelector("#try-again").addEventListener("click", setupQuiz)
}

//clear high score function
const clearHighScore = () => {
    localStorage.clear()
    highScores = []
    highScore()
}



//start program
setupQuiz()

// event listeners
document.querySelector(".start-button").addEventListener("click", begin)
document.querySelector("#answers").addEventListener("click", checkAnswer)
document.querySelector("#high-score").addEventListener("click", highScore)