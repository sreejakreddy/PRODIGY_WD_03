const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
let circleTurn;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = ''; // clear the cell's text
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? 'o' : 'x';
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    setTimeout(() => alert(`${circleTurn ? "O" : "X"} wins!`), 100);
  } else if (isDraw()) {
    setTimeout(() => alert("Draw!"), 100);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase(); // ✅ This shows X or O
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}
