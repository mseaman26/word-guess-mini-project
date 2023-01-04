var words = ['boolean', 'doccument', 'variable', 'function']
var currentWord
var wordDisplay = document.querySelector('#word_display')
var timerDisplay = document.querySelector('#timer')
var lettersGuessed = []
var wins =0
var losses =0
var timeInterval

if(localStorage.getItem('wins')){
    wins = JSON.parse(localStorage.getItem('wins'))
}
if(localStorage.getItem('losses')){
    losses = JSON.parse(localStorage.getItem('losses'))
}
function displayScore(){
    document.querySelector('#wins').innerHTML = wins
    document.querySelector('#losses').innerHTML = losses   
}


function handleKeyDown(e){
    lettersGuessed.push(e.key)
    wordDisplay.innerHTML=''
    renderWord(currentWord)
}

function renderWord(word){
    var gameWon = false
    var wrongLetters = 0
    for(var i = 0; i < word.length; i++){
        if(lettersGuessed.includes(word[i])){
            wordDisplay.innerHTML+=word[i]+' '
        }
        else{
            wrongLetters++
            wordDisplay.innerHTML += '_ '
        }
    }
    if(wrongLetters ===0){
        wordDisplay.textContent += '   you won!!!'
        wins++
        localStorage.setItem('wins', wins)
        displayScore()
        clearTimeout(timeInterval)
    }
}

function startTimer(){
    var timerValue = 1
    timerDisplay.innerHTML = timerValue
    timeInterval = setInterval(() => {
        if(timerValue > 0){
            timerValue--
            timerDisplay.innerHTML = timerValue
        }
        if(timerValue ===0){
            wordDisplay.innerHTML += 'you lost!'
            losses++
            localStorage.setItem('losses', losses)
            displayScore()
            clearInterval(timeInterval)
        }
    },1000)
}

function playGame(){
    currentWord = words[Math.floor(Math.random()*words.length)]
    startTimer()
    lettersGuessed = []
    wordDisplay.innerHTML = ''
    renderWord(currentWord)
}
function handleReset(){
    console.log('reset')
    wins = 0
    losses = 0
    displayScore()
    localStorage.setItem('losses', losses)
    localStorage.setItem('wins', wins)
}
displayScore()

document.querySelector('#start_button').addEventListener('click', playGame)
document.querySelector('#reset_button').addEventListener('click', handleReset)
document.addEventListener('keydown', handleKeyDown)