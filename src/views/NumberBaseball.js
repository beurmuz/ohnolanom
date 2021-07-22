const form_tag = document.querySelector('#form');
const input_tag = document.querySelector('#input');
const logs_tag = document.querySelector('#logs');

// ------- 숫자 뽑기
const numbers_arr = [1,2,3,4,5,6,7,8,9];
const answer = [];
for(var n = 0; n < 4; n+=1) { 
    const i = Math.floor(Math.random()*numbers_arr.length);
    answer.push(numbers_arr[i]);
    numbers_arr.splice(i,1);
   }
console.log(answer);

// --------- 입력 값을 검사하는 함수 
const tries = [];  
function check_input(value) {
    if(value.length!==4) {
        return alert('4자리를 입력해주세요.');
    }

    if(new Set(value).size !== 4) { 
        return alert('중복은 불가능합니다.');
    }

    if(tries.includes(value)) {
        return alert('이미 입력된 값입니다.');
    }
    return true;
}
   
// --------- form에 입력값을 입력하고, 검사하는 부분
form_tag.addEventListener('submit', (event) => {
    event.preventDefault();  
   const value = input_tag.value;
   input_tag.value = '';  

    if(!check_input(value)){ 
        return;
    }
    
    if(answer.join('') === value) {
       alert('홈런입니다!');
       location.reload();
       return;
    }
       
    if(tries.length>=9) { 
        const message = document.createTextNode(`패배입니다! 정답은 ${answer.join('')} 입니다.`);  
        logs_tag.appendChild(message);
        location.reload();
        return;
    }

    var strike = 0;
    var ball = 0;
    for (let i = 0; i < answer.length; i++) {
        const index = value.indexOf(answer[i]);
        if (index > -1) { 
            if(index === i) {  
                strike += 1;
                console.log("strike: " + strike);
            } else { 
                ball += 1;
                console.log("ball: " + ball);
            }
        }
    } 
    logs_tag.append(`${value}: ${strike} 스트라이크 ${ball} 볼`, document.createElement('br'));
    tries.push(value);
});