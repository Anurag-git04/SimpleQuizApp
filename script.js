const questions = [
    {
        question:"Which is largest animal in the World ?",
        answers : [
            {text:"Shark" , correct:false},
            {text:"BlueWhale" , correct:true},
            {text:"Elephant" , correct:false},
            {text:"Giraffe" , correct:false}
        ]
    },
    {
        question:"Which is smallest Country in the World ?",
        answers : [
            {text:"Vantican City", correct:false},
            {text:"Bhutan" , correct:true},
            {text:"Nepal" , correct:false},
            {text:"Sri Lanka" , correct:false}
        ]
    },
    {
        question:"Which is the smallest continent in the World ?",
        answers : [
            {text:"Asia" , correct:true},
            {text:"Austalia" , correct:false},
            {text:"Artic" , correct:false},
            {text:"Africa" , correct:false}
        ]
    },
    {
        question:"Which is largest desert in the World ?",
        answers : [
            {text:"Kalahari" , correct:false},
            {text:"Gobi" , correct:false},
            {text:"Sahara" , correct:true},
            {text:"Antarctica" , correct:false}
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0
let score = 0 

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.clasList.add("incorrect");
    } 
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === 'true'){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display= "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML =  "play Again";
    nextButton.style.display="block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();