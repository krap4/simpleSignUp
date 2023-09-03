document.addEventListener("DOMContentLoaded", function() {
    // 페이지 로딩이 완료된 후 실행되어야 하는 초기화 코드
    checkPw1();
    checkNumber();
    joinDone();
});

// 유효성 검사
function isValidEmail(email) {
    return email.includes('@');
}

function isValidName(name) {
    return name.trim().length > 0; // 이름이 빈 문자열이 아니어야 함
}

function isValidPassword(pw) {
    return pw.length > 0;
}

function passwordsMatch(pw1, pw2) {
    return pw1 === pw2;
}

function isValidPhone(phone1, phone2, phone3) {
    return phone1.length === 3 && phone2.length === 4 && phone3.length === 4;
}

function checkAllFieldsValid() {
    let email = document.getElementById('email').value;
    let user = document.getElementById('user').value;
    let pw1 = document.getElementById('pw1').value;
    let pw2 = document.getElementById('pw2').value;
    let phone1 = document.getElementById('phone1').value;
    let phone2 = document.getElementById('phone2').value;
    let phone3 = document.getElementById('phone3').value;
    let sendButton = document.getElementById('sendButton');

    const isAllValid = 
        isValidEmail(email) && 
        isValidName(user) && 
        isValidPassword(pw1) && 
        passwordsMatch(pw1, pw2) &&
        isValidPhone(phone1, phone2, phone3);

        sendButton.disabled = !isAllValid;
    
    if (sendButton.disabled === true) {
        document.getElementById('token').innerHTML = '000000'
        document.getElementById('token').style.color = '#727272';
        checkNumber()
    }

    
}

// ####
const checkEmail = () => {
    let email = document.getElementById('email').value
    let emailWrong = document.getElementById('emailWrong');
    let emailInput = document.getElementById('email');

    if (email.includes('@') || !email) {
        emailInput.classList.remove('error');
        emailWrong.innerHTML = ''
        emailWrong.style.marginBottom = '0px';
    }

    else {
        emailInput.classList.add('error');
        emailWrong.innerHTML = '이메일 형식이 아닙니다. 다시 입력해 주세요.';
        emailWrong.style.marginBottom = '20px';
    }

    checkAllFieldsValid();

};

const checkPw1 = () => {
    let pw1 = document.getElementById('pw1').value; 
    let pw2Input = document.getElementById('pw2');
    let pw2 = document.getElementById('pw2').value;

    if (!pw1) {
        pw2Input.disabled = true;
        pw2Input.classList.remove('error');
        pw2Wrong.innerText= '';
        pw2Input.value = '';
        pw2Wrong.style.marginBottom = '0px';
        
    }

    else {
        pw2Input.disabled = false;
    }

    if (pw2.length > 0) {
        checkPw2();
    }
    
    checkAllFieldsValid();

};

const checkPw2 = () => {
    let pw1 = document.getElementById('pw1').value;
    let pw2 = document.getElementById('pw2').value;
    let pw2Wrong = document.getElementById('pw2Wrong');
    let pw2Input = document.getElementById('pw2');

    if (pw1 !== pw2) {
        pw2Input.classList.add('error');
        pw2Wrong.innerHTML = '비밀번호가 다릅니다. 다시 입력해 주세요.';
        pw2Wrong.style.marginBottom = '20px';
    }

    else {
        pw2Input.classList.remove('error');
        pw2Wrong.innerHTML = '';
        pw2Wrong.style.marginBottom = '0px';
    }

    checkAllFieldsValid();
 
};

const changeFocus1 = () => {

    let phone1 = document.getElementById('phone1').value
    if(phone1.length === 3){
        document.getElementById('phone2').focus()
    }

    checkAllFieldsValid();

};

const changeFocus2 = () => {    
    let phone2 = document.getElementById('phone2').value
    if(phone2.length === 4){
        document.getElementById('phone3').focus()
    }

    checkAllFieldsValid();

};

const changeFocus3 = () => {    
    let phone3 = document.getElementById('phone3');
    if(phone3.value.length === 4){
        phone3.blur();
    }

    checkAllFieldsValid();
};

const sendNumber = () => {
    
    const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
    document.getElementById('token').innerHTML = token
    document.getElementById('token').style.color = '#0068FF';
    isNumberDone = false;

};


const checkNumber = () => {
    let doneButton = document.getElementById('doneButton');
    let token = document.getElementById('token');
    let tokenColor = window.getComputedStyle(token).color;
    // 위의 코드에서 window.getComputedStyle를 사용하여 계산된 스타일 값을 가져옵니다. 
    // CSS의 hex 색상 값은 RGB 값으로 변환되므로, 해당 RGB 값과 비교를 합니다.

    if (tokenColor !== 'rgb(0, 104, 255)') {
        doneButton.disabled = true;
        clearInterval(timer);
        isNumberDone = false
        doneButton.classList.remove('done')
    }

    else {
        doneButton.disabled = false;
        isStarted = false;
}
    joinDone()
};

let isStarted = false;
let timer

let isNumberDone = false;
let isRegionDone = false;
let isGenderDone = false;

const checkTimer = () => {
    let doneButton = document.getElementById('doneButton');

    if(isStarted === false && doneButton.disabled === false){
        clearInterval(timer);  // 기존 타이머 중지
        isStarted = true;
        doneButton.classList.remove('done');
        isNumberDone = false;

        let time = 180;
        
        timer = setInterval(function(){
    
            if(time >= 0){
                let min = Math.floor(time / 60);
                let sec = String(time % 60).padStart(2, "0");
                document.getElementById('timer').innerHTML = `${min}:${sec}`;
                time = time - 1;
            }
            else{
                document.getElementById('doneButton').disabled = true;
                isStarted = false;
                clearInterval(timer);
            }
        },1000)
    }

};

const doneNumber = () => {
    let doneButton = document.getElementById('doneButton');

    doneButton.classList.add('done');
    isNumberDone = true;
    clearInterval(timer);

    joinDone();
};

const checkRegion = () => {
    let region = document.getElementById('region').value;

    isRegionDone = true
    
    joinDone();
};

const checkGender = () => {
    isGenderDone = true

    joinDone();
};

const joinDone = () => {
    let joinButton = document.getElementById('joinButton');

    console.log("isGenderDone:", isGenderDone); // 값 확인
    console.log("isNumberDone:", isNumberDone); // 값 확인
    console.log("isRegionDone:", isRegionDone); // 값 확인

    if(isGenderDone === true && isNumberDone === true && isRegionDone === true) {
        joinButton.disabled = false;
    }

    else {
        joinButton.disabled = true;
    }
};

const clickJoin = () => {
    alert("가입을 축하드립니다!! 🥳");
};