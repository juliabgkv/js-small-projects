document.getElementById('signInBtn').addEventListener('click', () => {
    document.getElementById('formWrapper').dataset.activeFormType = 'sign-in';
    document.title = 'Sign In';
});
document.getElementById('signUpBtn').addEventListener('click', () => {
    document.getElementById('formWrapper').dataset.activeFormType = 'sign-up';
    document.title = 'Sign Up';
});