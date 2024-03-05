const formWrapper = document.getElementById('formWrapper');

document.getElementById('signInBtn').addEventListener('click', () => {
    formWrapper.dataset.activeFormType = 'sign-in';
    document.title = 'Sign In';
});
document.getElementById('signUpBtn').addEventListener('click', () => {
    formWrapper.dataset.activeFormType = 'sign-up';
    document.title = 'Sign Up';
});
document.getElementById('signUp').addEventListener('submit', (e) => {
    e.preventDefault();
    formWrapper.innerHTML = document.getElementById('success-signup').innerHTML;
});
document.getElementById('signIn').addEventListener('submit', () => {
    e.preventDefault();
    formWrapper.innerHTML = document.getElementById('success-signin').innerHTML;
});