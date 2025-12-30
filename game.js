import { level1Data, storyData, fillerPool } from './data.js';

let currentIdx = 0;
let lives = 3;
let timeLeft = 60;
let timerInterval;
let currentLang = 'vn';

window.switchLang = (lang) => {
  currentLang = lang;
  document.getElementById('btn-ko').classList.toggle('active', lang === 'ko');
  document.getElementById('btn-vn').classList.toggle('active', lang === 'vn');
  updateUI();
};

function updateUI() {
  const data = storyData[currentLang];
  document.getElementById('story-text').innerHTML = data.story;
  document.getElementById('start-btn-text').innerText = data.start;
}

window.startGame = () => {
  document.getElementById('rules-modal').classList.add('hidden');
  loadQuestion();
  startTimer();
};

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timeLeft = 60;
  document.getElementById('time-left').innerText = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('time-left').innerText = timeLeft;
    if (timeLeft <= 0) handleWrong();
  }, 1000);
}

function loadQuestion() {
  if (currentIdx >= 10) return endGame();
  const data = level1Data[currentIdx];
  document.getElementById('text-a').innerText = data.a;
  document.getElementById('tran-a').innerText = data.av;
  document.getElementById('text-b').innerText = data.b;
  document.getElementById('tran-b').innerText = data.bv;
  document.getElementById('lives-display').innerText = '❤️'.repeat(lives);

  let choices = [data.ans[0]];
  while (choices.length < 4) {
    let rand = fillerPool[Math.floor(Math.random() * fillerPool.length)];
    if (!choices.includes(rand)) choices.push(rand);
  }
  choices.sort(() => Math.random() - 0.5);

  const btnGrid = document.getElementById('button-grid');
  btnGrid.innerHTML = '';
  choices.forEach((choice) => {
    const btn = document.createElement('button');
    btn.className = 'main-btn';
    btn.innerText = choice;
    btn.style =
      'padding:18px; border-radius:15px; border:2.5px solid #fff0f0; background:white; font-weight:800; color:#FF6B6B; font-size:1.1rem;';
    btn.onclick = () => checkAnswer(choice, data.ans);
    btnGrid.appendChild(btn);
  });
}

function checkAnswer(choice, correctList) {
  if (correctList.includes(choice)) {
    showFeedback('correct');
    currentIdx++;
    setTimeout(() => {
      loadQuestion();
      startTimer();
    }, 1000);
  } else {
    handleWrong();
  }
}

function showFeedback(type) {
  const msg = document.getElementById('feedback-msg');
  msg.innerText =
    type === 'correct'
      ? storyData[currentLang].correct
      : storyData[currentLang].wrong;
  msg.className = type;
  setTimeout(() => {
    msg.className = '';
  }, 1000);
}

function handleWrong() {
  lives--;
  document.getElementById('lives-display').innerText = '❤️'.repeat(lives);
  showFeedback('wrong');
  if (lives <= 0) setTimeout(showGameOverScreen, 1000);
  else startTimer();
}

function showGameOverScreen() {
  clearInterval(timerInterval);
  const data = storyData[currentLang];
  document.getElementById('game-over-title').innerText = data.gameOverTitle;
  document.getElementById('game-over-desc').innerText = data.gameOverDesc;
  document.getElementById('restart-btn-text').innerText = data.restart;
  document.getElementById('game-over-modal').classList.remove('hidden');
}

function endGame() {
  clearInterval(timerInterval);
  document.getElementById('game-play-area').classList.add('hidden');
  document.getElementById('button-grid').classList.add('hidden');
  document.getElementById('quiz-header').classList.add('hidden');
  document.getElementById('lives-display').classList.add('hidden');
  const res = document.getElementById('result-display');
  res.classList.remove('hidden');
  res.innerHTML = `<h2 style="color:var(--primary); text-align:center;">LEARNING REPORT</h2>`;
  level1Data.forEach((d) => {
    const card = document.createElement('div');
    card.style =
      'background:#fff9f9; padding:18px; border-radius:20px; margin-bottom:12px; border-left:6px solid var(--primary); text-align:left; position:relative; z-index:100;';
    card.innerHTML = `<small style="color:#aaa;">${
      d.a
    }</small><br><strong>${d.b.replace('__', d.ans[0])}</strong>`;
    res.appendChild(card);
  });
  res.innerHTML += `<button class="main-btn" style="width:100%; padding:20px; margin-top:15px;" onclick="location.reload()">RESTART</button>`;
}
updateUI();
