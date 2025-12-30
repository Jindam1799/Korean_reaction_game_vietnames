export const level1Data = [
  {
    a: '친구: 우리 조카 사진이에요. 귀엽죠?',
    av: 'Bạn: Đây là ảnh cháu tôi. Đáng yêu đúng không?',
    b: '__, 아기가 너무 귀여워요! 인형인 줄 알았네.',
    bv: '__, Em bé đáng yêu quá đi! Tớ cứ tưởng là búp bê cơ đấy.',
    ans: ['아이구!/아이고!'],
  },
  {
    a: '친구: 오늘 날씨 진짜 좋다. 그치?',
    av: 'Bạn: Hôm nay thời tiết đẹp thật đấy. Đúng không?',
    b: '__, 나들이 가기 딱이다!',
    bv: '__, rất hợp để đi chơi!',
    ans: ['와', '진짜', '정말', '그러게'],
  },
  {
    a: '친구: 이번에 산 옷인데 나랑 잘 어울려?',
    av: 'Bạn: Đây là áo mình mới mua, hợp với mình chứ?',
    b: '__, 모델인 줄 알았어!',
    bv: '__, mình cứ tưởng là người mẫu đấy!',
    ans: ['올', '오', '우와', '역시'],
  },
  {
    a: '친구: 시험 드디어 끝났어! 해방이다!',
    av: 'Bạn: Cuối cùng cũng thi xong rồi! Giải thoát rồi!',
    b: '__, 우리 맛있는 거 먹으러 가자!',
    bv: '__, chúng mình đi ăn cái gì ngon đi!',
    ans: ['아싸', '나이스', '와', '대박'],
  },
  {
    a: '친구: 나 어제 유튜브 시작했는데 구독자 100명 됐어!',
    av: 'Bạn: Hôm qua mình mới bắt đầu làm Youtube mà được 100 sub rồi!',
    b: '__, 너 금방 유명해지겠다!',
    bv: '__, bạn sắp nổi tiếng rồi đấy!',
    ans: ['대단해', '최고', '우와', '진짜'],
  },
  {
    a: '친구: 길 가다가 5천원을 주웠어! 기분 좋아.',
    av: 'Bạn: Đang đi trên đường thì nhặt được 5 nghìn won! Vui quá.',
    b: '__, 오늘 운수 대통인데?',
    bv: '__, hôm nay may mắn thế!',
    ans: ['대박', '오', '우와', '럭키'],
  },
  {
    a: '친구: 내가 직접 만든 쿠키야. 한번 먹어봐!',
    av: 'Bạn: Đây là bánh quy mình tự làm. Ăn thử đi!',
    b: '__, 파는 것보다 훨씬 맛있다!',
    bv: '__, ngon hơn cả ngoài tiệm luôn!',
    ans: ['와', '세상에', '정말', '대박'],
  },
  {
    a: '친구: 내일 드디어 한국으로 여행 가!',
    av: 'Bạn: Ngày mai cuối cùng mình cũng được đi du lịch Hàn Quốc rồi!',
    b: '__, 너무 설레겠다! 조심히 다녀와.',
    bv: '__, chắc là hồi hộp lắm! Đi cẩn thận nhé.',
    ans: ['아싸', '축하해', '와', '우와'],
  },
  {
    a: '친구: 우리 팀이 축구 경기에서 이겼어!',
    av: 'Bạn: Đội của mình thắng trận bóng đá rồi!',
    b: '__, 역시 너희 팀이 젤 잘해!',
    bv: '__, quả nhiên đội bạn là giỏi nhất!',
    ans: ['나이스', '최고', '우와', '와'],
  },
  {
    a: '친구: 생일 선물로 갖고 싶던 게임기 받았어!',
    av: 'Bạn: Mình nhận được máy chơi game hằng mong ước làm quà sinh nhật!',
    b: '__, 진짜 부럽다! 축하해!',
    bv: '__, ghen tị quá đi! Chúc mừng nhé!',
    ans: ['우와', '대박', '와', '최고'],
  },
];

export const storyData = {
  ko: {
    story:
      '당신은 한국어 공부를 열심히 했습니다.<br>대학교에서 새로운 한국 친구를 만났어요.<br>친구가 기분이 좋아 보이네요!<br>긍정적인 반응으로 공감해 줍시다.',
    start: '친구에게 다가가기',
    correct: '정답입니다! 잘했어요.',
    wrong: '틀렸습니다! 다시 풀어보세요.',
    gameOverTitle: '게임 오버',
    gameOverDesc: '친구와 사이가 서먹서먹해졌습니다... 😢',
    restart: '다시 도전하기',
  },
  vn: {
    story:
      'Bạn đã chăm chỉ học tiếng Hàn.<br>Bạn gặp một người bạn Hàn Quốc mới tại trường đại học.<br>Bạn của bạn trông có vẻ đang rất vui!<br>Hãy đồng cảm bằng những phản ứng tích cực nhé.',
    start: 'Đến gần bạn của bạn',
    correct: 'Chính xác! Làm tốt lắm.',
    wrong: 'Sai rồi! Hãy thử lại nhé.',
    gameOverTitle: 'Trò chơi kết thúc',
    gameOverDesc: 'Mối quan hệ với bạn bè đã trở nên ngại ngùng... 😢',
    restart: 'Thử lại lần nữa',
  },
};

export const fillerPool = [
  '에이',
  '설마',
  '하아',
  '망했다',
  '젠장',
  '휴',
  '뭐야',
  '아니',
  '무슨',
  '뭘?',
  '어쩌라고?',
];
