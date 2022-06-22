/* VARIABLES */
//Game variables
const gameBoardEl = document.querySelector('.game-board')
const finishGameEl = document.querySelector('.game-over')
const serifGameEl = document.querySelector('.serif-version')
const sansSerifGameEl = document.querySelector('.sans-serif-version')
const gameVersion = localStorage.getItem("gameversion")

//Question variables
const questionNumEl = document.querySelector('.current-question-num')
const totalNumOfQuestionsEl = document.querySelector('.total-num-questions')
const sentenceEl = document.querySelector('.sentence')
const deckOfQuestions = []

//Header variables
const resetEl = document.querySelector('.reset')
const finalScoreEl = document.querySelector('.final-score')
const scoreEl = document.querySelector('.score-num')
let score = 0

//Results and next question variables
const resultBoxEl = document.querySelector('.result-box')
const resultTextEl = document.querySelector('.result-text')
const nextQuestionEl = document.querySelector('.next-question')
let currentQuestion = 0

//Answer variables
const answersEl = document.querySelector('.answers')
const ans1El = document.querySelector('[data-answer-num^="1"]')
const ans2El = document.querySelector('[data-answer-num^="2"]')
const ans3El = document.querySelector('[data-answer-num^="3"]')
const ans4El = document.querySelector('[data-answer-num^="4"]')

class Question{
    constructor(qNum,font1,font2,font3,font4,answer,image){
        this.qNum = qNum
        this.font1 = font1
        this.font2 = font2
        this.font3 = font3
        this.font4 = font4
        this.answer = answer
        this.image = image
    }
}

/* BEGIN GAME */
startGame(gameVersion)

/* EVENT LISTENERS */
resetEl.addEventListener('click',function(evt){
    resetBoard()
})

answersEl.addEventListener('click', function(evt){
    if (evt.target.tagName === "A")
        checkAnswer(deckOfQuestions[currentQuestion],evt.target)
})

nextQuestionEl.addEventListener('click', goToNextQuestion)

sansSerifGameEl.addEventListener('click', startSansSerifGame)

serifGameEl.addEventListener('click', startSerifGame)

/* FUNCTIONS */
function startGame(version){
    if (version === 'Serif')
        buildSerifDeck()
    else if (version === 'Sans-Serif')
        buildSansSerifDeck()
    totalNumOfQuestionsEl.innerText = deckOfQuestions.length
    presentQuestion(deckOfQuestions[0])
}

function presentQuestion(deckQuestion){
    setStringFont(deckQuestion)
    setAnswers(deckQuestion)
}

function goToNextQuestion(){
    currentQuestion++
    if (deckOfQuestions[currentQuestion]){
        presentQuestion(deckOfQuestions[currentQuestion])
        resetAnswerGrid()
    }
}

function checkAnswer(question,userInput){
    const correctAnswer = document.querySelector(`[data-answer-num='${question.answer}']`)
    showCorrect(correctAnswer)
    if (correctAnswer !== userInput)
        showIncorrect(userInput)
    else   
        updateScore()
    disableClicks()
    checkIfDone(question)
}

function checkIfDone(question){
    if (!deckOfQuestions[question.qNum]){
        nextQuestionEl.innerText = "Finish game"
        nextQuestionEl.removeEventListener('click', goToNextQuestion)
        nextQuestionEl.addEventListener('click',showEndGameBoard)
    }
}

function showEndGameBoard(){
    gameBoardEl.style.display = "none"
    finishGameEl.style.display = "flex"
    finalScoreEl.innerText = "Final Score: " + score
}

function showCorrect(correctAnswer){
    correctAnswer.style.backgroundColor = "#D0F0C0"
    correctAnswer.style.borderColor = "#4F7942"
    correctAnswer.style.color = "#4F7942"
    resultTextEl.innerText = "Correct!"
}
function showIncorrect(userInput){
    userInput.style.backgroundColor = "#fa8072"
    userInput.style.borderColor = "#7c0a02"
    userInput.style.color = "#7c0a02"
    resultTextEl.innerHTML = "Sorry, but that's incorrect."
}

function disableClicks(){
    resultBoxEl.style.display = "block"
    answersEl.style.pointerEvents = "none"
}

function updateScore(){
    score+=10
    scoreEl.innerText = score
}
function setStringFont(question){
    sentenceEl.setAttribute("src",question.image)
}

function setAnswers(question){
    questionNumEl.innerHTML = question.qNum

    ans1El.innerText = question.font1
    ans2El.innerText = question.font2
    ans3El.innerText = question.font3
    ans4El.innerText = question.font4
}

function resetBoard(){
    gameBoardEl.style.display = "flex"
    finishGameEl.style.display = "none"
    resetScore()
    resetAnswerGrid()
    presentQuestion(deckOfQuestions[0])
    currentQuestion = 0
    nextQuestionEl.innerText = "Next question"
    nextQuestionEl.removeEventListener('click', showEndGameBoard)
    nextQuestionEl.addEventListener('click', goToNextQuestion)
}

function resetScore(){
    score = 0
    scoreEl.innerText = score
}

function resetAnswerGrid(){
    answersEl.style.pointerEvents = "auto"
    resultBoxEl.style.display = "none"
    for (let i = 0; i < answersEl.childElementCount; i++){
        answersEl.children[i].style.backgroundColor = "white"
        answersEl.children[i].style.borderColor = "gray"
        answersEl.children[i].style.color = "gray"
    }
}

function buildSerifDeck(){
    const q1 = new Question(1,'Garamond','Libre Baskerville','Droid Serif Pro','Sabon',2,"assets/seriffont1.png")
    const q2 = new Question(2,'Playfair Display','Bodini','Arno Pro','Georgia',1,"assets/seriffont2.png")
    const q3 = new Question(3,'Bookman Old Style','Palatino','Stempel Schneidler','Source Serif Pro',4,"assets/seriffont3.png")
    const q4 = new Question(4,'Courier New','Merriweather','Times New Roman','Garamond',2,"assets/seriffont4.png")
    const q5 = new Question(5,'Walbaum','Stone Serif','Forum','Lucida',3,"assets/seriffont5.png")
    const q6 = new Question(6,'Yesiva One','Didot','Yesiva Bold','Century',1,"assets/seriffont6.png")
    const q7 = new Question(7,'Mrs. Eaves','Bembo','Bookman Old Style','Luthier',4,"assets/seriffont7.png")
    const q8 = new Question(8,'Mermaid','Nouvelle Vague','Anaktoria','Apple Garamond',3,"assets/seriffont8.png")
    const q9 = new Question(9,'Kumar One','Kumar Two','Kumar Three','Kumar Wide',1,"assets/seriffont9.png")
    const q10 = new Question(10,'Noto Serif Displau Black','Noto Serif Display Bold','Noto Serif Display Medium','Noto Serif Display Light',3,"assets/seriffont10.png")
    deckOfQuestions.push(q1,q2,q3,q4,q5,q6,q7,q8,q9,q10)
    return deckOfQuestions   
}

function buildSansSerifDeck(){
    const q1 = new Question(1,'Arial','Verdana','Ubuntu','Comic Sans',3,"assets/sansfont1.png")
    const q2 = new Question(2,'Open Sans','Arial','Lato','Roboto',4,"assets/sansfont2.png")
    const q3 = new Question(3,'Simplifica','Cooper Hewitt','Modern Sans Light','Mohave',2,'assets/sansfont3.png')
    const q4 = new Question(4, 'Qanelas','Biko','Raleway','Verdana',3,'assets/sansfont4.png')
    const q5 = new Question(5, 'Antic','Nauman','Leto Text Sans','Quark',1,'assets/sansfont5.png')
    const q6 = new Question(6, 'Tahoma','Lato','Helvetica','Maven Pro',2,'assets/sansfont6.png')
    const q7 = new Question(7, 'Futura','Brandon Grotesque','Avenir','Gidole',4,'assets/sansfont7.png')
    const q8 = new Question(8, 'News Gothic','Helvetica','Helveticish','Gill Sans',3,'assets/sansfont8.png')
    const q9 = new Question(9, 'Monserrat','Gram','Tahoma','Simplifica',1,'assets/sansfont9.png')
    const q10 = new Question(10, 'Nunito Sans Regular','Nunito Light','Nunito','Nunito Sans Black',3,'assets/sansfont10.png')
    deckOfQuestions.push(q1,q2,q3,q4,q5,q6,q7,q8,q9,q10)
    return deckOfQuestions
}

function startSansSerifGame(){
    localStorage.setItem('gameversion','Sans-Serif')
    resetBoard()
    deckOfQuestions.length = 0
    startGame(localStorage.getItem('gameversion'))
}

function startSerifGame(){
    localStorage.setItem('gameversion','Serif')
    resetBoard()
    deckOfQuestions.length = 0
    startGame(localStorage.getItem('gameversion'))
}