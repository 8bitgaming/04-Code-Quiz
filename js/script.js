let timerDisplay = document.querySelector("#timer");
let instructionsEl = document.querySelector("#start")
let mainContentEl = document.querySelector("#main-content")
let questionAnswers = document.querySelector("#question-answers")
let questionEl = document.querySelector("#questions")
let answersEl = document.querySelector("#answers")
let responseEl = document.querySelector("#response")
let endGameEl = document.querySelector("#end-game")
let currentQuestion = 0

//setup default time
let time = 15
timerDisplay.textContent = `Time: ${time}`



//array of questions
const questionList = [
{
    id: 0,
    question: "Commonly included data types do NOT include:",
    possibleAnswer: {
    a: "strings",
    b: "booleans",
    c: "alerts",
    d: "numbers", 
    },
    correctAnswer: "c"
},
{
    id: 1,
    question: "Question 2:",
    possibleAnswer: {
    a: "1: adsf",
    b: "asdfgggg",
    c: "asdghhhh",
    d: "lkjojpo9ijg", 
    },
    correctAnswer: "a"
},
]


// Start timer and remove initial instructions
const begin = () => {

    const timer = setInterval(() => {
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
    instructionButton.className = "button"
    instructionsEl.appendChild(instructionButton)
}


//instantiate questions and answer buttons from the next available question
const quiz = () => {
    
    //setup each question
    console.log("Display a question")
    if (currentQuestion < questionList.length) {
        questionEl.textContent = questionList[currentQuestion].question

        //clear any previous existing buttons
        while (answersEl.firstChild) {
            answersEl.removeChild(answersEl.firstChild)
            }

        for (const answer in questionList[currentQuestion].possibleAnswer) {

            console.log(questionList[answer])

            //create the answer buttons
            let buttonEl = document.createElement("button");
            buttonEl.textContent = answer;
            buttonEl.className = "button";
            answersEl.appendChild(buttonEl);
        }      
    } else {
        endGame()
    }
}

//check answer and display feedback
const checkAnswer = (event) => {
    let targetEl = event.target.value
    let correct = questionList[currentQuestion].correctAnswer
    console.log(targetEl)
    console.log(correct)

    if (targetEl === correct) {
        responseEl.textContent = "Correct!"
        console.log("correct")
        currentQuestion++
    } else {
        responseEl.textContent = "Wrong!"
        console.log("wrong")
        time = time - 10
        currentQuestion++
    }
    quiz()
}

const endGame = () => {

    clearInterval(timer)

    // clear questions and answers but leave last response for context
    while (questionEl.firstChild) {
        questionEl.removeChild(questionEl.firstChild)
    }
    while (answersEl.firstChild) {
        answersEl.removeChild(answersEl.firstChild)
    }
    //display end game message and score entry
    endGameEl.textContent = `All Done! Your final score was ${time}`  
}

const highScore = () => {
    // clear screen
    while (questionAnswers.firstChild) {
        questionAnswers.removeChild(questionAnswers.firstChild)
    }
    //display high-score table
    questionAnswers.textContent = `Below are the high-scores:`  

}

//clear high score function


//start program
setupQuiz()

// event listeners
document.querySelector("#start").addEventListener("click", e => {begin()})
document.querySelector("#question-answers").addEventListener("click", checkAnswer)
document.querySelector("#high-score").addEventListener("click", highScore)






//potential code for creating questions

    // for (i = 0; i < questions.length; i++) {
    //     let question = document.createElement("h2")
    //     question.textContent = questions[i].question
    //     answers.appendChild(question)

    //     // var size = Object.keys(questions[i].possibleAnswer).length;
      
    //     for (const answer in questions[i].possibleAnswer) {
    //         // let text = JSON.stringify(questions.answer)
    //         console.log(answer)
    //         createButton(answers, answer, "answer-button" )
    //     }

    //     // questions[i].possibleAnswer.forEach(element => {createButton(answers, element, "answer-button")
    //     // Object.keys(questions[i].possibleAnswer).forEach(key => {console.log(key, questions[key]) })

    // }


    //utility function to create a button
// const createButton = (appendTo, text, id, ) => {
//     var buttonEl = document.createElement("button");
//     buttonEl.textContent = text;
//     buttonEl.className = "button";
//     buttonEl.setAttribute("id", id);
//     appendTo.appendChild(buttonEl);
// }
