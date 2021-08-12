const $timer = document.querySelector('#timer');
const $score = document.querySelector('#score');
const $game = document.querySelector('#game');
const $start = document.querySelector('#start');
const $$cells = document.querySelectorAll('.cell');

// [4] 시작 버튼을 누를 때, 모든 칸에서 두더지가 나오게 하기
const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 구멍에 대한 정보를 담당할 배열 선언 
let started = false;
let score = 0;
let time = 60;

$start.addEventListener('click', () => { // 시작 버튼을 누를 때 작동할 이벤트 리스너 연결
  if (started) return; // 이미 시작했으면 무시 
  started = true;
  console.log('시작');
//   const timerId = setInterval(() => {
//     time = (time * 10 - 1) / 10; // 소수점 계산 시 문제있음
//     $timer.textContent = time;
//     if (time === 0) {
//       clearInterval(timerId);
//       clearInterval(tickId);
//       setTimeout(() => {
//         alert(`게임 오버! 점수는${score}점`);
//       }, 50);
//     }
//   }, 100);
//   const tickId = setInterval(tick, 1000);
  tick();
});

let oguPercent = 0.3;
let bombPercent = 0.5;

function tick() {
  holes.forEach((hole, index) => {
    if (hole) return; // 무언가 일어나고 있으면 return
    const randomValue = Math.random();
    if (randomValue < oguPercent) {
      const $ogu = $$cells[index].querySelector('.ogu');
      holes[index] = setTimeout(() => { // 1초 뒤에 사라짐
        $ogu.classList.add('hidden');
        holes[index] = 0;
      }, 1000); 
      $ogu.classList.remove('hidden');
    } else if (randomValue < bombPercent) {
      const $bomb = $$cells[index].querySelector('.bomb');
      holes[index] = setTimeout(() => { // 1초 뒤에 사라짐
        $bomb.classList.add('hidden');
        holes[index] = 0;
      }, 1000); 
      $bomb.classList.remove('hidden');
    }
  });
}

$$cells.forEach(($cell, index) => {
  $cell.querySelector('.ogu').addEventListener('click', (event) => {
    if (!event.target.classList.contains('dead')) {
      score += 1;
      $score.textContent = score;
    }
    event.target.classList.add('dead');
    event.target.classList.add('hidden');
    clearTimeout(holes[index]); // 기존 내려가는 타이머 제거
    setTimeout(() => {
      holes[index] = 0;
      event.target.classList.remove('dead');
    }, 1000);
  });
  $cell.querySelector('.bomb').addEventListener('click', (event) => {
    event.target.classList.add('boom');
    event.target.classList.add('hidden');
    clearTimeout(holes[index]); // 기존 내려가는 타이머 제거
    setTimeout(() => {
      holes[index] = 0;
      event.target.classList.remove('boom');
    }, 1000);
  });
});