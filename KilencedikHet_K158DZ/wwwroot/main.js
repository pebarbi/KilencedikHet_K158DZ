//fetch('/questions/1')
//    .then(response => response.json())
//    .then(data => kérdésMegjelenítés(data)
//    );

var  questionId = 1;

function kérdésMegjelenítés() {
    let kérdés = hotList[questionId].question
    if (!kérdés) return;
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.question1
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    jóVálasz = kérdés.correctAnswer;
    if (kérdés.image) {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
        document.getElementById("kép1").classList.remove("rejtett")
    }
    else {
        document.getElementById("kép1").classList.add("rejtett")
    }
    //Jó és rossz kérdések jelölésének levétele
    document.getElementById("válasz1").classList.remove("jó", "rossz");
    document.getElementById("válasz2").classList.remove("jó", "rossz");
    document.getElementById("válasz3").classList.remove("jó", "rossz");
    document.getElementById(`válasz1`).style.pointerEvents = "none"
}

////function kérdésBetöltés(id) {
////    fetch(`/questions/${id}`)
////        .then(response => {
////            if (!response.ok) {
////                console.error(`Hibás válasz: ${response.status}`)
////            }
////            else {
////                return response.json()
////            }
////        }).then(data => kérdésMegjelenítés(data));
////}

var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            response => {
                if (!response.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return response.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}

//function előre() {
//    questionId++;
//    kérdésBetöltés(questionId)
//}

function vissza() {
    questionId--;
    kérdésBetöltés(questionId)
}

//function előre() {
//    displayedQuestion++;
//    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
//    kérdésMegjelenítés()
//}


window.onload = function (e) {
    console.log("Oldal betöltve...");
    document.getElementById("előre_gomb").onclick = előre;
    document.getElementById("vissza_gomb").onclick = vissza;
    init();
}

function választás(n) {
    if (n != jóVálasz) {
        document.getElementById(`válasz${n}`).classList.add("rossz");
        document.getElementById(`válasz${jóVálasz}`).classList.add("jó");

    //////    for (var i = 0; i < questionsInHotList; i++) {
    //////        let q = {
    //////            question: {},
    //////            goodAnswers: 1
    //////        }
    //////        hotList[i] = q;
    //////    }
    }
    else {
        document.getElementById(`válasz${jóVálasz}`).classList.add("jó");
    }
}

var timeoutHandler;
timeoutHandler = setTimeout(előre, 3000);

function előre() {
    clearTimeout(timeoutHandler)
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés()
}