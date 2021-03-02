let NUMBER_GOOD_QUESTIONS = 0;
let NUMBER_BAD_QUESTIONS = 0;

async function getQuestions() {
    const response = await fetch('./questions.json');
    return await response.json();
}

function createQuestions(question, numQuestion) {


    // Div principale - htmlInputQuestion
    let htmlInputQuestion = document.createElement("div");
    htmlInputQuestion.setAttribute("class","inputQuestion");
    htmlInputQuestion.setAttribute("id",question[numQuestion].questionId);

    // Titre de la question
    let htmlInputQuestionTitle = document.createElement("p");
    htmlInputQuestionTitle.setAttribute("class", "inputQuestionTitle");
    htmlInputQuestionTitle.textContent = question[numQuestion].questionTitle;
    htmlInputQuestion.appendChild(htmlInputQuestionTitle);

    // Réponses potentielles de la question
    for (let i = 0; i < question[numQuestion].questionResponses.length; i++) {
        let htmlRep = document.createElement("input");
        htmlRep.setAttribute("type", "radio");
        htmlRep.setAttribute("id", question[numQuestion].questionResponses[i].responseId);
        htmlRep.setAttribute("name", question[numQuestion].questionId);
        htmlInputQuestion.appendChild(htmlRep);

        let htmlLabel = document.createElement("label");
        htmlLabel.setAttribute("for", question[numQuestion].questionResponses[i].responseId);
        htmlLabel.setAttribute("class", "labelResponse");

        htmlLabel.textContent = "    " + question[numQuestion].questionResponses[i].responseContent + '\n';

        htmlInputQuestion.appendChild(htmlLabel);
    }


    document.body.insertBefore(htmlInputQuestion, document.getElementById("enterButton"));
}


function goodResponse(idElement) {
    NUMBER_GOOD_QUESTIONS++;
    let currentElement = document.getElementById(idElement);

    console.log(currentElement);

    currentElement.setAttribute("class", "goodResponse");


}

function badQuestion(idElement) {
    NUMBER_BAD_QUESTIONS++;
    console.log(idElement);

    let currentElement = document.getElementById(idElement);
    currentElement.setAttribute("class", "badResponse");
}






getQuestions().then(r => {
    const { numberOfQuestions, questions } = r;
    //console.log(questions[1].questionId);
    for (let i = 0; i < numberOfQuestions; i++) {
        createQuestions(questions, i);
    }
});


document.getElementById("enterButton").addEventListener("click", function() {

    // Récupérer les résultats de réponses
    getQuestions().then(r => {
        const { numberOfQuestions, questions } = r;

        for (let i = 0; i < questions.length; i++) {

            let questionResponses = questions[i].questionResponses;


            for (let j = 0; j < questionResponses.length; j++) {
                //console.log(questionResponses[j]);

                if (questionResponses[j].goodResponse === true) {

                    if (document.getElementById(questionResponses[j].responseId).checked) {
                        console.log("Bonne réponse");
                        goodResponse(questions[i].questionId);
                    } else {
                        badQuestion(questions[i].questionId);
                    }

                }
            }

        }

    })
})


// Valider les questions.







