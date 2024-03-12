const weapons = ['rock', 'scissors', 'paper'];
const weaponButtons = document.querySelectorAll('.weapon-btn');
const playerScoreElem = document.getElementById('playerScore');
const pcScoreElem = document.getElementById('pcScore');
const messageElem = document.getElementById('message');
const playerChoice = document.getElementById('playerChoice');
const pcChoice = document.getElementById('pcChoice');
const showRulesBtn = document.getElementById('showRulesBtn');
const modalWindow = document.getElementById('modalWindow');
const audioSetting = document.getElementById('audioSetting');
const iconOn = document.getElementById('iconOn');
const iconOff = document.getElementById('iconOff');
const score = {
    player: 0,
    pc: 0
};

weaponButtons.forEach(function(btn) {
    btn.addEventListener("click", function(e) {
        const playerWeapon = e.target.dataset.weapon;
        const pcWeaponIdx = Math.floor(Math.random() * 3);
        const pcWeapon = weapons[pcWeaponIdx];
    
        playerChoice.dataset.weapon = playerWeapon;
        pcChoice.dataset.weapon = pcWeapon;
    
        let isPlayerWin;
        if(playerWeapon == pcWeapon) {
            isPlayerWin = null;
        } else if(playerWeapon == 'rock' && pcWeapon == 'scissors') {
            isPlayerWin = true;
        } else if(playerWeapon == 'scissors' && pcWeapon == 'paper') {
            isPlayerWin = true;
        } else if(playerWeapon == 'paper' && pcWeapon == 'rock') {
            isPlayerWin = true;
        } else {
            isPlayerWin = false;
        }
    
        let message;
        if(isPlayerWin === null) {
            message = 'It`s a tie!';
            if(audioSetting.checked == true) 
                playAudio('./assets/stop-13692.mp3');
        } else if(!isPlayerWin) {
            message = 'You lose!';
            pcScoreElem.textContent = ++score.pc;
            if(audioSetting.checked == true) 
                playAudio('./assets/fail-144746.mp3');
        } else if(isPlayerWin) {
            message = 'You win!';
            playerScoreElem.textContent = ++score.player;
            if(audioSetting.checked == true) 
                playAudio('./assets/success-1-6297.mp3');
        }
    
        messageElem.textContent = message;
    });
});

showRulesBtn.addEventListener('click', function() {
    modalWindow.style.display = 'block';
});

modalWindow.addEventListener('click', function(e) {
    if(e.target.classList.contains('modal') || e.target.classList.contains('close-modal-btn')) {
        modalWindow.style.display = 'none';
    }
});

function playAudio(path) {
    const audio = new Audio(path);
    audio.play();
}

audioSetting.addEventListener('change', function(e) {
    iconOn.classList.toggle('active');
    iconOff.classList.toggle('active');

    if(e.target.checked == true) {
        weaponButtons.forEach(function(btn) {
            btn.addEventListener("mouseover", onMouseOverAudio);
        });
    } else {
        weaponButtons.forEach(function(btn) {
            btn.removeEventListener("mouseover", onMouseOverAudio);
        });
    }
});

function onMouseOverAudio() {
    playAudio('./assets/swing-whoosh-110410.mp3');
}