async function getQuestions() {
    const response = await fetch('./questions.json');
    return await response.json();
}


getQuestions().then(r => {
    const { numberOfQuestions, questions } = r;
    //console.log(questions[1].questionId);
    for (let i = 0; i < numberOfQuestions; i++) {
        createQuestions(questions, i);
    }
});


function createQuestions(question, numQuestion) {

    console.log("Bienvenue : ");
    console.log(question[numQuestion].questionId);


    // Div principale - htmlInputQuestion
    let htmlInputQuestion = document.createElement("div");
    htmlInputQuestion.setAttribute("id","inputQuestion");

    // Titre de la question
    let htmlInputQuestionTitle = document.createElement("p");
    htmlInputQuestionTitle.setAttribute("id", "inputQuestionTitle");
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

        htmlLabel.textContent = question[numQuestion].questionResponses[i].responseContent + '\n';

        htmlInputQuestion.appendChild(htmlLabel);
    }


    document.body.insertBefore(htmlInputQuestion, document.getElementById("enterButton"));

    console.log("Fin : ");
}




// Création du bloc de checkbox que l'on devra afficher 5 fois







