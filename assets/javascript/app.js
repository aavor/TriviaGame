$(document).ready(function(){

    $(".myQuestions").hide();

});

$("button").click(function(){
        $("#start").hide();
        $(".myQuestions").show();
    });

var questions = [{
    question: "Which team did Chelsea defeat in 2012 to win their 1st Champtions League Title? ",
    choices: ["Arsenal", "Paris Saint-Germain", "Barcelona", "Bayern Munich", ],
    correctAnswer: 3
}, {
    question: "Who is Chelsea's All-Time Goal Scorer?",
    choices: ["Didier Drogba", "Frank Lampard", "Peter Osgood", "Jimmy Floyd Hasselbaink"],
    correctAnswer: 1
}, {
    question: "Who was the 2016 Chelsea Player of the Year?",
    choices: ["Eden Hazard", "Cesar Azpilicueta", "Willian", "Diego Costa"],
    correctAnswer: 2
}, {
    question: "Who is the owner of Chelsea Football Club?",
    choices: ["Roman Abramovich", "Dmitri Rybolovlev", "George Soros", "Joseph Lewis"],
    correctAnswer: 0
}, {
    question: "Which National Team does Eden Hazard play for?",
    choices: ["Waterloo", "Italy", "France", "Belgium"],
    correctAnswer: 3
}];

var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

$(document).ready(function () {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {
        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Choose An Answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// This displays the current question AND the choices
function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".myQuestions > .question");
    var choiceList = $(document).find(".myQuestions > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
}

function displayScore() {
    $(document).find(".myQuestions > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
    $(document).find(".myQuestions > .result").show();
}

function hideScore() {
    $(document).find(".result").hide();
}