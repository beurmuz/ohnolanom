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
    //     [32, 2, 8, 2],
    //     [64, 1024, 2048, 4],
    //     [0, 2, 1024, 4],
    //     [16, 128, 256, 512],
    // ];
    // draw();