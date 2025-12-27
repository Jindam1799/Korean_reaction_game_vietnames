import { level1Data, negativePool } from './data.js';

const uiText = {
  ko: {
    title: '반가워요, 친구들!',
    intro: '드디어 첫 한국 친구를 사귀었네요!',
    highlight:
      '당신은 한국어를 열심히 배웠습니다.<br>아직 서툴지만 친구의 말에 <strong>공감</strong>해주는 따뜻한 마음을 보여주세요!',
    rules:
      '<li>❤️ <strong>기회 3번:</strong> 틀리거나 늦으면 감소합니다.</li><li>⚡ <strong>속도 보너스:</strong> 빨리 누를수록 고득점!</li><li>💬 <strong>최종 목표:</strong> 베스트 프렌드가 되기</li>',
    startBtn: '친구 만나러 가기! 🤝',
    waiting: '친구의 말을 기다리는 중...',
    timeout: '대답이 너무 늦었어요! ⏰',
    wrong: '앗, 친구가 조금 당황했어요! 😅',
    correct: '친구가 아주 기뻐해요! 🥰',
    restart: '처음부터 다시 하기 🔄',
  },
  vn: {
    title: 'Xin chào các bạn!',
    intro: 'Chào mừng bạn đến với thử thách phản ứng!',
    highlight:
      'Bạn đã có một người bạn Hàn Quốc!<br>Hãy <strong>đồng cảm</strong> với những câu chuyện của bạn ấy nhé.<br>Mặc dù tiếng Hàn còn chút bối rối, nhưng trái tim ấm áp là đủ!',
    rules:
      '<li>❤️ <strong>3 cơ hội:</strong> Trả lời sai hoặc muộn sẽ mất tim.</li><li>⚡ <strong>Tốc độ:</strong> Trả lời càng nhanh, điểm càng cao!</li><li>💬 <strong>Mục tiêu:</strong> Trở thành bạn thân (Best Friend).</li>',
    startBtn: 'Gặp gỡ bạn bè! 🤝',
    waiting: 'Đang chờ bạn ấy nói...',
    timeout: 'Hết thời gian mất rồi! ⏰',
    wrong: 'Sai rồi! Bạn ấy hơi bối rối 😅',
    correct: 'Chính xác! Bạn ấy rất vui 🥰',
    restart: 'Chơi lại từ đầu 🔄',
  },
};

let currentLang = 'vn';
let currentIdx = 0,
  score = 0,
  lives = 3,
  timerId,
  timeLeft;
let shuffledStages = [];

window.switchLang = function (lang) {
  currentLang = lang;
  document.getElementById('btn-ko').classList.toggle('active', lang === 'ko');
  document.getElementById('btn-vn').classList.toggle('active', lang === 'vn');
  document.getElementById('modal-title').innerText = uiText[lang].title;
  document.getElementById('modal-intro').innerText = uiText[lang].intro;
  document.getElementById('modal-highlight').innerHTML = uiText[lang].highlight;
  document.getElementById('modal-rules').innerHTML = uiText[lang].rules;
  document.getElementById('start-btn-text').innerText = uiText[lang].startBtn;
  if (currentIdx === 0)
    document.getElementById('situation-display').innerText =
      uiText[lang].waiting;
};

window.onload = () => window.switchLang('vn');

window.startGame = function () {
  document.getElementById('rules-modal').classList.add('hidden');
  score = 0;
  lives = 3;
  currentIdx = 0;
  shuffledStages = [...level1Data.stages].sort(() => Math.random() - 0.5);
  updateUI();
  nextQuestion();
};

function nextQuestion() {
  if (currentIdx >= shuffledStages.length) {
    showFinalResult(true);
    return;
  }
  const stage = shuffledStages[currentIdx];
  document.getElementById('situation-display').innerText = stage.s;
  document.getElementById('translation-display').innerText = `"${stage.v}"`;
  document.getElementById('feedback').innerText = '';
  const displayCorrect = stage.a[Math.floor(Math.random() * stage.a.length)];
  createButtons(displayCorrect, stage.a);
  startTimer();
}

function createButtons(displayCorrect, allCorrectArray) {
  const grid = document.getElementById('button-grid');
  grid.classList.remove('result-mode'); // 게임 중에는 그리드 모드 유지
  grid.innerHTML = '';
  let distractors = [...negativePool]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  let choices = [displayCorrect, ...distractors].sort(
    () => Math.random() - 0.5
  );
  choices.forEach((text) => {
    const btn = document.createElement('button');
    btn.innerText = text;
    btn.className = 'reaction-btn';
    btn.onclick = () => checkAnswer(text, allCorrectArray);
    grid.appendChild(btn);
  });
}

function startTimer() {
  timeLeft = 3000;
  const bar = document.getElementById('timer-bar');
  clearInterval(timerId);
  timerId = setInterval(() => {
    timeLeft -= 100;
    bar.style.width = (timeLeft / 3000) * 100 + '%';
    if (timeLeft <= 0) {
      clearInterval(timerId);
      handlePenalty(uiText[currentLang].timeout);
    }
  }, 100);
}

function checkAnswer(userChoice, correctArray) {
  clearInterval(timerId);
  if (userChoice && correctArray.includes(userChoice)) {
    score += 100 + Math.floor(timeLeft / 10);
    document.getElementById('feedback').innerText = uiText[currentLang].correct;
    document.getElementById('feedback').style.color = '#4CAF50';
    currentIdx++;
    setTimeout(nextQuestion, 1200);
  } else {
    handlePenalty(uiText[currentLang].wrong);
  }
  updateUI();
}

function handlePenalty(msg) {
  lives--;
  updateUI();
  document.getElementById('feedback').innerText = msg;
  document.getElementById('feedback').style.color = '#eb4d4b';
  if (lives <= 0) {
    setTimeout(() => showFinalResult(false), 1000);
  } else {
    setTimeout(nextQuestion, 1500);
  }
}

function updateUI() {
  document.getElementById('score').innerText = score;
  document.getElementById('lives-display').innerText =
    '❤️'.repeat(lives) + '🖤'.repeat(3 - lives);
}

function showFinalResult(isSuccess) {
  clearInterval(timerId);
  let title = '',
    msg = '';
  if (currentLang === 'ko') {
    title =
      isSuccess && score >= shuffledStages.length * 70
        ? '👑 베스트 프렌드!'
        : '🧐 서먹서먹한 사이';
    msg =
      isSuccess && score >= shuffledStages.length * 70
        ? '축하합니다! 한국 친구와 단짝이 되었어요!'
        : '아직은 조금 서먹하네요. 다시 해볼까요?';
  } else {
    title =
      isSuccess && score >= shuffledStages.length * 70
        ? '👑 Bạn thân (Best Friend)'
        : '🧐 Quan hệ còn xa cách';
    msg =
      isSuccess && score >= shuffledStages.length * 70
        ? 'Chúc mừng! Bạn đã trở thành tri kỷ của người bạn Hàn Quốc!'
        : 'Mọi chuyện vẫn còn chút ngại ngùng. Hãy thử lại nhé!';
  }
  document.getElementById(
    'situation-display'
  ).innerHTML = `<div style="line-height:1.6;"><strong>${title}</strong><br><br>${msg}</div>`;
  document.getElementById('translation-display').innerText = '';

  // 버튼 그리드를 플렉스 모드로 변경하여 가운데 정렬
  const grid = document.getElementById('button-grid');
  grid.classList.add('result-mode');
  grid.innerHTML = `<button class="main-btn restart-btn" onclick="location.reload()">${uiText[currentLang].restart}</button>`;
}
