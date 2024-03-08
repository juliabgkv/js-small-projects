const themeOptions = document.querySelectorAll('.theme-option'),
      STORAGE_KEY = 'auth-form-theme';

init();

Array.prototype.map.call(themeOptions, option => option.addEventListener('click', themeClickHandler));

function themeClickHandler() {
    Array.prototype.map.call(themeOptions, option => option.classList.remove('active'));
    this.classList.add('active');

    activateTheme(this.id);

    localStorage.setItem(STORAGE_KEY, themeName);
}
function init() {
    const currTheme =  localStorage.getItem(STORAGE_KEY) || 'default';
    const currOption = document.getElementById(currTheme);

    currOption.classList.add('active');
    activateTheme(currTheme);
}
function activateTheme(themeName) {
    themeStylesheetLink.setAttribute('href', `./css/themes/${themeName}.css`);
}