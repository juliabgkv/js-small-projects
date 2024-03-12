const API_URL = 'https://thesimpsonsquoteapi.glitch.me/quotes';
const quoteDisplay = document.getElementById('quote');
const nameDisplay = document.getElementById('name');
const img = document.getElementById('characterImg');
const loading = document.getElementById('loading');
const content = document.getElementById('content');
const messageDisplay = document.getElementById('message');
const tweetBtn = document.getElementById('tweetBtn');

displayNewQuote();

document.getElementById('copyBtn').addEventListener('click', copyBtnClickHandler);
document.getElementById('soundBtn').addEventListener('click', soundBtnClickHandler);
document.getElementById('newQuoteBtn').addEventListener('click', newQuoteBtnClickHandler);

async function displayNewQuote() {
    const quote = await getNewQuote();
    
    // render data
    quoteDisplay.textContent = quote.quote;
    img.src = quote.image;
    img.alt = quote.character;
    nameDisplay.textContent = quote.character;

    let link = `https://twitter.com/intent/tweet?text=${quote.quote}  -  ${quote.character}`;
    tweetBtn.setAttribute('href', link);

    loading.classList.remove('display'); // hide loading spinner
    content.classList.add('display'); // show content
}

async function getNewQuote() {
    const response = await fetch(API_URL);
    const data = await response.json();

    return data[0];
}

function copyBtnClickHandler() {
    navigator.clipboard.writeText(`${quoteDisplay.textContent} - ${nameDisplay.textContent}`);
    displayCopySuccessMsg();
}

function soundBtnClickHandler() {
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance();
        utterance.lang = 'en-GB';
        utterance.text = `${quoteDisplay.textContent} by ${nameDisplay.textContent}`;
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Sorry, your browser doesn't support text to speech!");
    }
}

function newQuoteBtnClickHandler() {
    loading.classList.add('display'); // show loading spinner
    content.classList.remove('display'); // hide main content
    displayNewQuote();
}

function displayCopySuccessMsg() {
    messageDisplay.classList.add('display');
    setTimeout(() => { messageDisplay.classList.remove('display'); }, 700);
}