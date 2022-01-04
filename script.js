//  sélecteurs DOM
const rule = document.querySelector('#rule');
const score1 = document.querySelector('#score1');
const score2 = document.querySelector('#score2');
const winnerLoser1 = document.querySelector('#winnerLoser1');
const winnerLoser2 = document.querySelector('#winnerLoser2');
const orderedReplay = document.querySelector('#replay');
const imgDice = document.querySelector('#imgDice');
const rollDice = document.querySelector('#rollDice');
const pointsValue = document.querySelector('#pointsValue');
const holdPoints = document.querySelector('holdPoints');

// Masque le message "Gagnant" ou "Perdant"
winnerLoser1.style.display = 'none';
winnerLoser2.style.display = 'none';

