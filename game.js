import { level1Data, level2Data, negativePool, positivePool } from './data.js';

const uiText = {
  ko: {
    lv1_title: '반가워요, 친구들!',
    lv1_intro: '드디어 첫 한국 친구를 사귀었네요!',
    lv1_highlight:
      '당신은 한국어를 열심히 배웠습니다.<br>친구의 기쁜 소식에 <strong>공감</strong>하고 같이 기뻐해 주세요!',
    lv2_title: '잘 하셨어요! 두 번째 만남입니다.',
    lv2_intro: '친구와 즐겁게 대화하셨나요?',
    lv2_highlight:
      '오늘 친구를 만났는데 조금 안 좋은 일이 있는 것 같습니다.<br>친구로서 <strong>위로해주고 공감</strong>해 줍시다!',
    rules:
      '<li>❤️ <strong>기회 3번:</strong> 틀리거나 늦으면 감소합니다.</li><li>⚡ <strong>보너스:</strong> 빨리 누를수록 고득점!</li>',
    startBtn: '친구 만나러 가기! 🤝',
    waiting: '친구의 말을 기다리는 중...',
    timeout: '대답이 너무 늦었어요! ⏰',
    wrong: '앗, 친구가 조금 당황했어요! 😅',
    correct: '친구가 아주 기뻐해요! 🥰',
    correct_v2: '친구가 위로를 받았어요. 😌',
    nextBtn: '2단계 도전하기 🚀',
    restart: '처음부터 다시 하기 🔄',
  },
  vn: {
    lv1_title: 'Xin chào các bạn!',
    lv1_intro: 'Chào mừng bạn đã có người bạn Hàn Quốc đầu tiên!',
    lv1_highlight:
      'Bạn đã học tiếng Hàn rất chăm chỉ.<br>Hãy <strong>đồng cảm</strong> và cùng chung vui với những tin tốt của bạn ấy nhé!',
    lv2_title: 'Làm tốt lắm! Lần gặp thứ hai.',
    lv2_intro: 'Bạn đã trò chuyện vui vẻ với bạn ấy chứ?',
    lv2_highlight:
      'Hôm nay gặp lại, dường như bạn ấy đang có chuyện không vui.<br>Hãy <strong>an ủi và đồng cảm</strong> với tư cách là một người bạn nhé!',
    rules:
      '<li>❤️ <strong>3 cơ hội:</strong> Trả lời sai hoặc muộn sẽ mất tim.</li><li>⚡ <strong>Tốc độ:</strong> Trả lời càng nhanh, điểm càng cao!</li>',
    startBtn: 'Bắt đầu gặp bạn! 🤝',
    waiting: 'Đang chờ bạn ấy nói...',
    timeout: 'Hết thời gian mất rồi! ⏰',
    wrong: 'Sai rồi! Bạn ấy hơi bối rối 😅',
    correct: 'Chính xác! Bạn ấy rất vui 🥰',
    correct_v2: 'Bạn ấy đã được an ủi rồi. 😌',
    nextBtn: 'Thử thách Cấp độ 2 🚀',
    restart: 'Chơi lại từ đầu 🔄',
  },
};

let currentLang = 'vn';
let currentLevel = 1;
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

  const prefix = currentLevel === 1 ? 'lv1_' : 'lv2_';
  document.getElementById('modal-title').innerText =
    uiText[lang][prefix + 'title'];
  document.getElementById('modal-intro').innerText =
    uiText[lang][prefix + 'intro'];
  document.getElementById('modal-highlight').innerHTML =
    uiText[lang][prefix + 'highlight'];
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
  const data = currentLevel === 1 ? level1Data : level2Data;
  shuffledStages = [...data.stages]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  document
    .getElementById('game-container')
    .classList.toggle('level-2-theme', currentLevel === 2);
  document.querySelector('.level-badge').innerText = `Lv.${currentLevel}`;

  updateUI();
  nextQuestion();
};

window.startLevel2 = function () {
  currentLevel = 2;
  document.getElementById('rules-modal').classList.remove('hidden');
  window.switchLang(currentLang);
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
  grid.classList.remove('result-mode');
  grid.innerHTML = '';
  const wrongPool = currentLevel === 1 ? negativePool : positivePool;
  let distractors = [...wrongPool].sort(() => Math.random() - 0.5).slice(0, 3);
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
    document.getElementById('feedback').innerText =
      currentLevel === 1
        ? uiText[currentLang].correct
        : uiText[currentLang].correct_v2;
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
  const isBestFriend = isSuccess && score >= 800;
  if (currentLang === 'ko') {
    title = isBestFriend ? '👑 베스트 프렌드!' : '🧐 서먹서먹한 사이';
    msg = isBestFriend
      ? '축하합니다! 친구와 마음이 아주 잘 통해요!'
      : '아직은 조금 어색하네요. 다시 해볼까요?';
  } else {
    title = isBestFriend
      ? '👑 Bạn thân (Best Friend)'
      : '🧐 Quan hệ còn xa cách';
    msg = isBestFriend
      ? 'Chúc mừng! Bạn rất hiểu tâm ý của bạn ấy!'
      : 'Mọi chuyện vẫn còn chút ngại ngùng. Hãy thử lại nhé!';
  }
  document.getElementById(
    'situation-display'
  ).innerHTML = `<strong>${title}</strong><br><br>${msg}`;
  document.getElementById('translation-display').innerText = '';
  const grid = document.getElementById('button-grid');
  grid.classList.add('result-mode');
  let buttonsHTML = `<button class="main-btn restart-btn" onclick="location.reload()">${uiText[currentLang].restart}</button>`;
  if (currentLevel === 1 && isSuccess) {
    buttonsHTML += `<button class="main-btn next-btn" onclick="startLevel2()">${uiText[currentLang].nextBtn}</button>`;
  }
  grid.innerHTML = buttonsHTML;
}
