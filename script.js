// ⭐【ここに注意！】さっきコピーしたスプレッドシートのURLを、下のダブルクォーテーションの中に貼り付けてください！
const SPREADSHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRns5yqIMKL4YED3LwRCNqK6ESGtbKnvYZXYcK2A1js5LY_S0JYZ6ROvksoEFuOVta1FMm-SqsP1WQS/pub?output=csvhttps://docs.google.com/spreadsheets/d/〜〜〜/pub?output=csv";

let quizData = [];
let currentQuestionIndex = 0;

// スプレッドシート（CSV）からデータを読み込む魔法の関数
async function fetchQuizData() {
    try {
        const response = await fetch(SPREADSHEET_CSV_URL);
        const csvText = await response.text();
        
        // CSVの文字を1行ずつバラバラにして、クイズの形に整える処理
        const lines = csvText.split("\n");
        quizData = [];
        
        // 1行目は「question,answer」なので、2行目（i=1）から読み込む
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue; // 空白行はスキップ
            
            // カンマで問題を分割する
            const parts = lines[i].split(",");
            const questionText = parts[0].replace(/"/g, "").trim(); // 前後の余計な文字を消す
            const answerText = parts[1].replace(/"/g, "").trim().toUpperCase();
            
            quizData.push({
                question: questionText,
                answer: answerText === "TRUE" // TRUEなら◯、FALSEなら×
            });
        }
        
        // データの読み込みが終わったら最初の問題を表示する
        if (quizData.length > 0) {
            loadQuestion();
        } else {
            document.getElementById('question-text').innerText = "問題が登録されていません。";
        }
        
    } catch (error) {
        console.error("データの読み込みに失敗しました:", error);
        document.getElementById('question-text').innerText = "問題の読み込みに失敗しました。";
    }
}

// 問題を画面に表示する
function loadQuestion() {
    const currentQuiz = quizData[currentQuestionIndex];
    document.getElementById('question-text').innerText = currentQuiz.question;
    document.getElementById('result-box').className = "result-box hidden";
}

// ユーザーが◯か×を押したときの判定
function checkAnswer(userAnswer) {
    if (quizData.length === 0) return;
    
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

// 次の問題へ進む
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= quizData.length) {
        currentQuestionIndex = 0; // 最後までいったら最初に戻る
    }
    loadQuestion();
}

// アプリ起動時にまずスプレッドシートを読みに行く
fetchQuizData();