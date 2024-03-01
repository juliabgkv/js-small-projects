const colors = [
    '#dd966b',
    '#a1b0f7',
    '#ffd83d',
    '#8ac3a3',
    '#dec2cb'
];
const CELLS = 625;
const board = document.querySelector('#board');

for(let i = 0; i < CELLS; i++) {
    const div = document.createElement('div');
    div.classList.add('cell');
    board.appendChild(div);
}

board.addEventListener('mouseover', (e) => {
    if(e.target.classList.contains('cell'))
        setColor(e.target, getRandomColor());
});
board.addEventListener('mouseout', (e) => {
    if(e.target.classList.contains('cell'))
        setColor(e.target);
});

function setColor(cell, color) {
    cell.style.backgroundColor = color ? color : '';
    cell.style.boxShadow = color ? `0 0 5px ${color}` : 'none';
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}