const quizData = [
    { question: "商品100円を売り上げ、代金は掛けとした。この場合の仕訳の借方（左側）は『売掛金』である。", answer: true },
    { question: "消耗品費や給料は、貸借対照表（B/S）の『資産』の部に計上される。", answer: false },
    { question: "現金を受け取ったときの仕訳は、必ず借方（左側）に『現金』がくる。", answer: true }
];
let currentQuestionIndex = 0;
function loadQuestion() {
    const currentQuiz = quizData[currentQuestionIndex];
    document.getElementById('question-text').innerText = currentQuiz.question;
    document.getElementById('result-box').className = "result-box hidden";
}
function checkAnswer(userAnswer) {
    const currentQuiz = quizData[currentQuestionIndex];
    const resultBox = document.getElementById('result-box');
    const resultMessage = document.getElementById('result-message');
    if (userAnswer === currentQuiz.answer) {
        resultMessage.innerText = "🎯 正解！";
        resultBox.className = "result-box correct";
    } else {
        resultMessage.innerText = "❌ 不正解...";
        resultBox.className = "result-box incorrect";
    }
}
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= quizData.length) { currentQuestionIndex = 0; }
    loadQuestion();
}
loadQuestion();