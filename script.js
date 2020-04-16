const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

const grid = () => Array.from(document.getElementsByClassName('q'));
const qNumId = (qEl) => Number.parseInt(qEl.id.replace('q', ''));
const emptyQs = () => grid().filter(_qEl => _qEl.innerText === '');
const allSame = (arr) => arr.every(_qEl => _qEl.innerText === arr[0].innerText && _qEl.innerText !== '');

const takeTurn = (index, letter) => grid()[index].innerText = letter;
const opponentChoice = () => qNumId(emptyQs()[Math.floor(Math.random() * emptyQs().length)]);

const endGame = (winningSequence) => { 
    winningSequence.forEach(_qEl => _qEl.classList.add('winner'));
    disableListerners();
}
const checkForVictory = () => {
    let victory = false;

    winningCombos.forEach(_c => {
        const _grid = grid();
        const sequence = [_grid[_c[0]], _grid[_c[1]], _grid[_c[2]]];
        if(allSame(sequence)){
            victory = true;
            endGame(sequence);
        }
    })

    return victory;
}


const opponentTurn = () => {
    disableListerners();
    setTimeout(() =>{
        takeTurn(opponentChoice(), '0');
     if(!checkForVictory())
        enableListerners();
    }, 1000);
}

const clickFn = ($event) => {
    takeTurn(qNumId($event.target), 'x');
    if(!checkForVictory())
    opponentTurn();
}

const enableListerners = () => grid().forEach(_qEl => _qEl.addEventListener('click', clickFn));
const disableListerners = () => grid().forEach(_qEl => _qEl.removeEventListener('click', clickFn));

enableListerners();
