const $table = document.getElementById('table');
const $score = document.getElementById('score');
let data = []; //4

// $table -> $fragment -> $tr -> $td
function startGame() {
    const $fragment = document.createDocumentFragment(); 
    [1,2,3,4].forEach(function() { // [1,2,3,4]배열은 4
        const rowData = []; // 
        data.push(rowData);
        const $tr = document.createElement('tr');
        [1,2,3,4].forEach(() => {
             rowData.push(0); // 처음에는 모든 칸에 0을 넣어준다 
             const $td = document.createElement('td'); 
             $tr.appendChild($td);
        });
        $fragment.appendChild($tr);
    });
    $table.appendChild($fragment);

    put2Cell();
    draw();
}

function put2Cell() {
    const emptyCells = []; 
    data.forEach(function (rowData, i){
        rowData.forEach(function(cellData, j) {
            if(!cellData) {
                emptyCells.push([i,j]); // 빈칸이 각각 몇번째 줄 몇번 째 칸인지를 여기에 모아놓고 
            }
        });
    });
    const randomCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
    data[randomCell[0]][randomCell[1]] = 2; // data[i][j]
}

function draw() {
    data.forEach((rowData, i) => { // 몇 번째 줄
        rowData.forEach((cellData, j) => { // 몇 번째 칸
            const $target = $table.children[i].children[j]; 
            if (cellData > 0) { // celldata가 있을때 (숫자가 들어있을때)
                $target.textContent = cellData;
                $target.className = 'color-'+cellData; //Css 적용
            } else { // celldata = 0일때
                $target.textContent = '';
                 $target.className = '';
            }
         });
    });
}

startGame();

// data = [
//     [0, 2, 8, 2],
//     [0, 0, 8, 0],
//     [2, 2, 2, 2],
//     [0, 16, 0, 4],
// ];
// draw();

// [#3 숫자를 합쳐 2배로 만들기] ------------------------------------------------
/* 각 칸을 해당 case 속 방향으로 정렬하고, 숫자가 겹치는 칸이 있는지 확인해서 합쳐야 함  */
function moveCells(direction) {
    switch (direction) {

      // 왼쪽 정렬 
      case 'left': {
        const newData = [[], [], [], []]; // 1) 임시로 데이터를 저장할 newData 변수 선언하기 
        data.forEach((rowData, i) => { 
          rowData.forEach((cellData, j) => { // 2) 반복문을 돌면서 각 줄에 있는 숫자를 newData 배열의 각 줄 안에 넣기 
            if (cellData) { // newData = [2, 2, 4, 8]
              const currentRow = newData[i] 
              const prevData = currentRow[currentRow.length - 1];
              if (prevData === cellData) { // 이전 값과 지금 값이 같으면
                const score = parseInt($score.textContent);
                $score.textContent = score + currentRow[currentRow.length - 1] * 2; // 점수 계산 
                currentRow[currentRow.length - 1] *= -2; // 5) 두 값이 합쳐진 값에 -1을 곱해 4, 4, 8을 -4, 4, 8이 될 수 있도록 함 
              } else {
                newData[i].push(cellData); 
              }
            }
          });
        });
        console.log(newData);
        [1, 2, 3, 4].forEach((rowData, i) => {
          [1, 2, 3, 4].forEach((cellData, j) => { // 왼쪽에서부터 칸의 값을 검사함 
            data[i][j] = Math.abs(newData[i][j]) || 0; // 3) data 배열에 있던 값을 newData 배열에 옮겨 왼쪽으로 정렬함
            // 4) 데이터를 newData로 옮길 때 cellData가 0이 아닌 것들만 옮기기에 왼쪽 정렬이 된 것처럼 보임 
          });
        });
        break;
      }

      // 오른쪽 정렬
      case 'right': {
        const newData = [[], [], [], []];
        data.forEach((rowData, i) => {
          rowData.forEach((cellData, j) => {
            if (rowData[3 - j]) { // 6) cellData를 rowData[3-j]로 변경.
                /* 7) cellData는 rowData[j]와 같으므로 j가 3-j로 바뀐 셈 
                      0,1,2,3번째 칸이라 할 때, 3-j를 하면 3,2,1,0번째 칸을 검사하게 됨 (오른쪽부터 검사하는 셈)  */
              const currentRow = newData[i]
              const prevData = currentRow[currentRow.length - 1];
              if (prevData === rowData[3 - j]) {
                const score = parseInt($score.textContent);
                $score.textContent = score + currentRow[currentRow.length - 1] * 2;
                currentRow[currentRow.length - 1] *= -2;
              } else {
                newData[i].push(rowData[3 - j]);
              }
            }
          });
        });
        console.log(newData);
        [1, 2, 3, 4].forEach((rowData, i) => {
          [1, 2, 3, 4].forEach((cellData, j) => {
            data[i][3 - j] = Math.abs(newData[i][j]) || 0;
          });
        });
        break;
      }

      // 위로 정렬 
      case 'up': {
        const newData = [[], [], [], []];
        data.forEach((rowData, i) => {
          rowData.forEach((cellData, j) => {
            if (cellData) {
              const currentRow = newData[j]
              const prevData = currentRow[currentRow.length - 1];
              if (prevData === cellData) {
                const score = parseInt($score.textContent);
                $score.textContent = score + currentRow[currentRow.length - 1] * 2;
                currentRow[currentRow.length - 1] *= -2;
              } else {
                newData[j].push(cellData);
              }
            }
          });
        });
        console.log(newData);
        [1, 2, 3, 4].forEach((cellData, i) => { 
          [1, 2, 3, 4].forEach((rowData, j) => {
            data[j][i] = Math.abs(newData[i][j]) || 0; // 8) 위로 정렬하는 방법은 왼쪽 정렬과 달리 행과 열이 바뀜.(j와 j가 바뀜)
          });
        });
        break;
      }

      // 아래로 정렬
      case 'down': {
        const newData = [[], [], [], []];
        data.forEach((rowData, i) => {
          rowData.forEach((cellData, j) => {
            if (data[3 - i][j]) {
              const currentRow = newData[j];
              const prevData = currentRow[currentRow.length - 1];
              if (prevData === data[3 - i][j]) {
                const score = parseInt($score.textContent);
                $score.textContent = score + currentRow[currentRow.length - 1] * 2; // 점수 계산
                currentRow[currentRow.length - 1] *= -2;
              } else {
                newData[j].push(data[3 - i][j]); // 9) 아래로 정렬하는 방법은 j와 i가 바뀐 후, 3-i를 하면 됨
              }
            }
          });
        });
        console.log(newData);
        [1, 2, 3, 4].forEach((cellData, i) => {
          [1, 2, 3, 4].forEach((rowData, j) => {
            data[3 - j][i] = Math.abs(newData[i][j]) || 0;
          });
        });
        break;
      }
    }
    
    // [#4 승패 구현] ------------------------------------------------
    if (data.flat().includes(2048)) { // 승리 // falt()으로 배열을 평탄화하고, 2048을 포함하는지 판별함
      draw();
      setTimeout(() => {
        alert('축하합니다. 2048을 만들었습니다!');  
      }, 0);
    } else if (!data.flat().includes(0)) { // 빈 칸이 없으면 패배
      alert(`패배했습니다... ${$score.textContent}점`);
    } else {
      put2Cell(); // 10) 정렬 후 put2Cell함수를 넣어 무작위 위치에 2를 생성하게 함
      draw(); // 11) 새로 생성한 2가 그려짐 
    }
  }

  // [#1 키보드 이벤트] ------------------------------------------------
  window.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') { // event.key의 속성이 ArrowUp이면
      moveCells('up'); // moveCells는 case가 up인 코드를 실행 
    } else if (event.key === 'ArrowDown') {
      moveCells('down');
    } else if (event.key === 'ArrowLeft') {
      moveCells('left');
    } else if (event.key === 'ArrowRight') {
      moveCells('right');
    }
  });

   // [#2 마우스 이벤트] ------------------------------------------------
  let startCoord; // 시작 좌표를 저장할 변수 선언
  window.addEventListener('mousedown', (event) => {
    startCoord = [event.clientX, event.clientY];
  });

  window.addEventListener('mouseup', (event) => {
    const endCoord = [event.clientX, event.clientY]; // 끝 좌표를 저장할 변수 선언 
    const diffX = endCoord[0] - startCoord[0]; // x좌표의 변화율
    const diffY = endCoord[1] - startCoord[1]; // y좌표의 변화율 
    // 왼쪽과 오른쪽 영역은 diffx의 절댓값이 diffy의 절댓값보다 작음 (이러한 속성을 이용하고자 절댓값을 구하는 Math.abs()를 이용)
    if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) { // 왼쪽 영역은 diffx가 0보다 작음
      moveCells('left');
    } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) { // 오른쪽 영역은 diffy가 0보다 큼
      moveCells('right'); 
    } else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) { // 아래쪽의 경우
      moveCells('down'); 
    } else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) { // 위쪽의 경우 
      moveCells('up');
    } 
  });