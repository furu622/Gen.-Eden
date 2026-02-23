/*
  Gen. Eden: Original Edition
  © 2026 ふる. This file is part of this project.
*/


/*=================================================================*/


/* =========================================
   Gen.Eden - History Quiz 目次
========================================
1. 問題データ管理（JSONロード）
2. 状態管理（state）
3. 画面制御（Screen切替）
4. カテゴリ選択（科学史 / 芸術史 / 一般史）
5. 難易度選択
6. クイズ開始処理
7. 問題表示処理
8. 回答判定処理
9. タイマー処理
10. プログレス表示（円形ゲージ）
11. 結果表示処理
12. セッション管理
13. 補助関数
14. Enterキー制御
======================================== */

/* 1. 問題データ管理 */

async function loadQuestions(category) {

  if (!window.questions) {
    try {
      const res = await fetch("questions.csv");
      const text = await res.text();

      const parsed = Papa.parse(text, {
        header: true,
        skipEmptyLines: true
      });

      window.questions = parsed.data.map(q => ({
        series: q.series,
        scientist: q.scientist,
        question: q.q,
        choices: [q.c1, q.c2, q.c3, q.c4],
        answer: Number(q.answer),
        explanation: q.explanation,
        difficulty: q.difficulty
      }));

    } catch (err) {
      console.error("CSV load error:", err);
      return [];
    }
  }

  switch (category) {
    case "science":
      return window.questions.filter(q => q.series === "mechanics");
    default:
      return [];
  }
}


  switch (category) {
    case "science":
      return window.questions.filter(q => q.series === "mechanics");
    default:
      return [];
  }


console.log(window.GenProblems);

async function selectCategory(categoryName) {
  state.category = categoryName;
  state.pool = await loadQuestions(categoryName);
  showScreen("levelMenu");
  startSession();
}



/* 2. 状態管理 */
let showQuestionText = true;
let showFormula = true;

let state = {
  category: null,
  difficulty: null,
  pool: [],
  currentQuestion: null,
  isAnswered: false,
  timerId: null,
  countdownId: null,
  timeLimit: 10000
};

/* 3. 画面制御 */
function showScreen(id) {
  ["gameMenu", "levelMenu", "quiz"].forEach(s =>
    document.getElementById(s).style.display = "none"
  );
  document.getElementById(id).style.display = "block";
}


function toggleQuestion() {
  showQuestionText = !showQuestionText;
  const q = document.getElementById("question");
  if (showQuestionText) q.textContent = q.dataset.original || q.textContent;
  else {
    q.dataset.original = q.textContent;
    q.textContent = "[English hidden]";
  }
}

/* 4. カテゴリ選択 */


function goMenu() { 
  stopTimer();
  document.getElementById("result").textContent = "";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("explanation").textContent = "";
  showScreen("gameMenu"); 
}

function goLevel() { 
  stopTimer(); 
  document.getElementById("result").textContent = "";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("explanation").textContent = "";
  showScreen("levelMenu"); 
}

/* 5. 難易度選択 */

function selectLevel(levelName) {
  state.difficulty = levelName;

  if (levelName === "easy") state.timeLimit = 15000;
  if (levelName === "normal") state.timeLimit = 10000;
  if (levelName === "hard") state.timeLimit = 5000;

  state.pool = state.pool.filter(q => q.difficulty === levelName);

  showScreen("quiz");
  nextQuestion();
}

/* 6. クイズ開始処理 */
function nextQuestion() {

    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("result").textContent = "";
    document.getElementById("explanation").textContent = "";

    if (state.pool.length === 0) {
      endSession();
      return;
    }
    
  state.isAnswered = false;

  const index = Math.floor(Math.random() * state.pool.length);
  const question = state.pool.splice(index, 1)[0];

  state.currentQuestion = question;

  renderQuestion(question);

  startTimer();
}

/* 7. 問題表示処理 */
function renderQuestion(question) {
  document.getElementById("question").textContent = question.question;

  speak(question.question);

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = ""; // 前の選択肢を消す

  question.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice;

    btn.onclick = () => {
      checkAnswerUI(index);
    };

    choicesDiv.appendChild(btn);
  });
}

document.getElementById("nextBtn").onclick = () => {
  nextQuestion();
};


/* 8. 回答処理 */
function checkAnswerUI(selectedIndex) {

  if (state.isAnswered) return;

  const isCorrect = selectedIndex === state.currentQuestion.answer;

  showResult(isCorrect);
  recordAnswer(isCorrect);
  updateSessionDisplay();

  state.isAnswered = true;
  stopTimer();

    document.getElementById("nextBtn").style.display = "block";
}

/* 9. タイマー処理 10. プログレス表示（円形ゲージ）*/
function startTimer() {
  stopTimer();

  const circle = document.getElementById("progress");
  const total = state.timeLimit;
  const start = Date.now();

  const radius = circle.r.baseVal.value;
  const length = 2 * Math.PI * radius;
  circle.setAttribute("stroke-dasharray", length);

  state.countdownId = setInterval(() => {
    const elapsed = Date.now() - start;
    const ratio = Math.max(0, 1 - elapsed / total);
    circle.setAttribute("stroke-dashoffset", length * (1 - ratio));
  }, 50);

  state.timerId = setTimeout(() => {
    if (!state.isAnswered) nextQuestion();
  }, total);
}

function stopTimer() {
  clearInterval(state.countdownId);
  clearTimeout(state.timerId);
}

/* 11. 結果表示処理 */
function showResult(isCorrect) {
  const result = document.getElementById("result");

  const correctText =
    state.currentQuestion.choices[state.currentQuestion.answer];

  result.textContent = isCorrect
    ? "Correct!"
    : `Wrong! Answer is ${correctText}`;
  const explanationDiv = document.getElementById("explanation");
  explanationDiv.textContent = state.currentQuestion.explanation || "";
}

/* 12. セッション管理 */
let elapsedTimerId = null;

function updateSessionDisplay() {
  document.getElementById("correctCount").textContent = sessionState.correct;
  document.getElementById("totalCount").textContent = sessionState.total;

  if (sessionState.startTime) {
    const elapsedSec = Math.floor((Date.now() - sessionState.startTime)/1000);
    const minutes = Math.floor(elapsedSec/60);
    const seconds = elapsedSec % 60;
    document.getElementById("elapsedTime").textContent = `${minutes}:${seconds.toString().padStart(2,'0')}`;
  }
}

function startElapsedTimer() {
  if (elapsedTimerId) clearInterval(elapsedTimerId);
  elapsedTimerId = setInterval(updateSessionDisplay, 500);
}

function stopElapsedTimer() {
  if (elapsedTimerId) clearInterval(elapsedTimerId);
}


let sessionState = { correct: 0, total: 0, startTime: null };

function startSession() {
  sessionState.correct = 0;
  sessionState.total = 0;
  sessionState.startTime = Date.now();
  updateSessionDisplay();
  startElapsedTimer();
}

function recordAnswer(isCorrect) {
  sessionState.total++;
  if (isCorrect) sessionState.correct++;
}

function endSession() {
  stopElapsedTimer();
  if (!sessionState.startTime) { alert("セッションが開始されていません"); return; }
  const elapsedSec = Math.floor((Date.now() - sessionState.startTime)/1000);
  const minutes = Math.floor(elapsedSec/60);
  const seconds = elapsedSec % 60;
  alert(`正解率: ${sessionState.correct}/${sessionState.total}\nプレイ時間: ${minutes}分 ${seconds}秒`);
}



/* 13. 補助関数 */
function randomPick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function speak(text) { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = "en-US"; speechSynthesis.speak(u); }

/* 14. Enter制御 */
document.addEventListener("keydown", e => {
  if (e.key === "Enter" && state.isAnswered) {
    nextQuestion();
  }
});


