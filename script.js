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

// ---Début pour la modal ou il y a les règles du jeu---
let modal = null;

const openModal = (e) => {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'));
  target.style.display = null;
  target.removeAttribute('aria-hidden');
  target.setAttribute('aria-modal', 'true');
  modal = target;
  modal.addEventListener('click', closeModal);
  modal.querySelector('.exitModal').addEventListener('click', closeModal);
  modal
    .querySelector('.js-modal-stop')
    .addEventListener('click', stopPropagation);
};

const closeModal = (e) => {
  if (modal === null) return;
  e.preventDefault();
  window.setTimeout(() => { // retarde la fermeture de la modal de 500 ms, ce qui permet de mettre une animation
    modal.style.display = "none"
    modal = null;
  }, 500);
  modal.setAttribute('aria-hidden', 'true');
  modal.removeAttribute('aria-modal');
  modal.removeEventListener('click', closeModal);
  modal.querySelector('.exitModal').removeEventListener('click', closeModal);
  modal
    .querySelector('.js-modal-stop')
    .removeEventListener('click', stopPropagation);
};

// Fonction qui permet d'éviter de fermer la modal en cliquant ailleurs que sur le bouton "Fermer"
const stopPropagation = (e) => {
  e.stopPropagation();
};

document.querySelectorAll('.js-modal').forEach((a) => {
  a.addEventListener('click', openModal);
});

// Permet de se servir de la touche "Echap" du clavier pour fermer la modal
window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' || e.key === 'Esc') {
    closeModal(e);
  }
});
