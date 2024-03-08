const formWrapper = document.getElementById('formWrapper'),
      signupInputs = document.querySelectorAll('#signUpForm input'),
      signinInputs = document.querySelectorAll('#signInForm input'),
      showPassRegBtn = document.getElementById('showPassRegBtn'),
      showPassLogBtn = document.getElementById('showPassLogBtn'),
      signUpForm = document.getElementById('signUpForm'),
      signInForm = document.getElementById('signInForm'),
      pass = document.getElementById('password'),
      passConf = document.getElementById('passwordConfirm');


document.getElementById('signInBtn').addEventListener('click', () => formTypeToggleHandler('sign-in', 'Sign In'));
document.getElementById('signUpBtn').addEventListener('click', () => formTypeToggleHandler('sign-up', 'Sign Up'));
signUpForm.addEventListener('submit', submitFormHandler);
signInForm.addEventListener('submit', submitFormHandler);
showPassRegBtn.addEventListener('click', passVisibilityToggle);
showPassLogBtn.addEventListener('click', passVisibilityToggle);
Array.prototype.map.call(signupInputs, input => input.addEventListener('keyup', inputKeyupHandler));
Array.prototype.map.call(signinInputs, input => input.addEventListener('keyup', inputKeyupHandler));


// ------- events handlers -------

function formTypeToggleHandler(formType, pageTitle) {
    formWrapper.dataset.activeFormType = formType; // set data attribute to flip card
    document.title = pageTitle;
}
function submitFormHandler(e) {
    e.preventDefault();
    const isSigningUp = (this.closest('#signUpForm')) ? true : false;
    const inputs = isSigningUp ? signupInputs : signinInputs;
    let isValidForm = true;

    Array.prototype.map.call(inputs, (input) => {
        if(isEmptyInput(input)) {
            input.classList.add('invalid');
            isValidForm = false;
        }
    });

    if(isValidForm) {
        let formData, url;

        if(isSigningUp) {
            // formData = new FormData(signUpForm);
            // url = 'https://../sign-up';
            signUpForm.reset();

            alert('You`re signed up! 🎉');
        } else {
            // formData = new FormData(signInForm);
            // url = 'https://../sign-in';
            signInForm.reset();

            alert('You`re signed in! 🎉');
        }
        // sendData('https:/...signup-url', formData);
    }
}
function passVisibilityToggle() {
    this.classList.toggle('active'); // toggle button style (icon)
    toggleBtnTitle(this); // change btn tooltip

    // toggle value visibility
    if(this.closest('#signUpForm')) {
        toggleInputType(pass);
        toggleInputType(passConf);
    } else {
        toggleInputType(document.getElementById('loginPassword'));
    }
}
function inputKeyupHandler() {
    if(this.id === 'password' || this.id === 'passwordConfirm') {
        if(this.id === 'password') {
            if(pass.classList.contains('invalid')) 
                pass.classList.remove('invalid');

            if(!passConf.value) return; // skip password confirm if it`s empty
        }
        
        if(pass.value !== passConf.value) {
            passConf.classList.add('invalid');
            setAlertMessage(passConf, 'Passwords don`t match');
        } else {
            passConf.classList.remove('invalid');
            setAlertMessage(passConf, 'Please confirm password'); //reset message
        }
    } else if(this.classList.contains('invalid')) {
        this.classList.remove('invalid');
    }
}


// ------- additional functions -------

function toggleBtnTitle(btn) {
    btn.title = btn.classList.contains('active') ? 'Hide Password' : 'Show Password'; 
}
function toggleInputType(input) {
    const t = (input.type === 'password') ? 'text' : 'password';
    input.type = t;
}
function isEmptyInput(input) {
    return input.value.trim().length === 0;
}
function setAlertMessage(input, msg) {
    input.parentElement.querySelector('.alert-message').textContent = msg;
}
async function sendData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST', 
            body: data
        });

        const resData = await response.json();
        console.log(resData);
        // do another things
    } catch(e) {
        console.error(e);
    }
}