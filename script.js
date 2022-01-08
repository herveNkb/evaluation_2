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
const holdPoints = document.querySelector('#holdPoints');
const joueur1 = document.querySelector('.cardPlayer1');
const joueur2 = document.querySelector('.cardPlayer2');
// Sons
const audioStartOfGame = new Audio('media/sound/startOfGame.mp3');
const audioWinner = new Audio('media/sound/winner.mp3');
const audioDiceRoll = new Audio('media/sound/diceRoll.mp3');
const audioFaceDice1 = new Audio('media/sound/faceDice1.mp3');
const audioCollectPoints = new Audio('media/sound/collectPoints.mp3');
// Masque le message "Gagnant" ou "Perdant"
winnerLoser1.style.display = 'none';
winnerLoser2.style.display = 'none';

let nombreGenere;
let resultatJoueur1 = true;
let scoreTotalJoueur1 = 0;
let scoreTotalJoueur2 = 0;
let additionScoreDuDe1 = 0;
let additionScoreDuDe2 = 0;
let resultatJoueur2 = 0;

// Bouton "Recommencer une partie", actualise la page
orderedReplay.addEventListener('click', () => {
  audioStartOfGame.play();
  setTimeout(() => { // Laisse le temps à la musique de se jouer avnt le "refresh" de la page
    location.reload();
  }, 2600);
});

// Bouton "Lancer le dé"
rollDice.addEventListener('click', () => {
  if (resultatJoueur1) {
    nombreGenere = genererNombreEntier();
    if (nombreGenere == 1) {
      // Si chiffre 1 est généré, le tour passe au joueur 2
      audioFaceDice1.play();
      audioFaceDice1.volume = 0.3;
      imagesDuDe(nombreGenere);
      score1.textContent = scoreTotalJoueur1;
      pointsValue.textContent = '0';
      additionScoreDuDe1 = 0;
      resultatJoueur1 = false;
    } else {
      audioDiceRoll.play();
      setTimeout(() => {
        // Tant que le chiffre 1 ne sort pas, le tour continue
        imagesDuDe(nombreGenere);
        joueur1.style.backgroundColor = 'rgba(167, 211, 228, 0.9)';
        joueur2.style.backgroundColor = 'rgba(176, 198, 206, 0.45)';
        additionScoreDuDe1 += nombreGenere;
        pointsValue.textContent = additionScoreDuDe1;
      }, 1000);
    }
  } else {
    nombreGenere = genererNombreEntier();
    if (nombreGenere == 1) {
      // Si chiffre 1 est généré, le tour passe au joueur 1
      imagesDuDe(nombreGenere);
      audioFaceDice1.play();
      audioFaceDice1.volume = 0.3;
      score2.textContent = scoreTotalJoueur2;
      pointsValue.textContent = '0';
      additionScoreDuDe2 = 0;
      resultatJoueur1 = true;
    } else {
      audioDiceRoll.play();
      setTimeout(() => {
        // Tant que le chiffre 1 ne sort pas, le tour continue
        imagesDuDe(nombreGenere);
        joueur2.style.backgroundColor = 'rgba(167, 211, 228, 0.9)';
        joueur1.style.backgroundColor = 'rgba(176, 198, 206, 0.45)';
        additionScoreDuDe2 += nombreGenere;
        pointsValue.textContent = additionScoreDuDe2;
      }, 1000);
    }
  }
});

// Bouton "Récupérer les points"
holdPoints.addEventListener('click', (a) => {
  if (resultatJoueur1) {
    audioCollectPoints.play();
    audioCollectPoints.volume = 0.3;
    scoreTotalJoueur1 += additionScoreDuDe1;
    score1.textContent = scoreTotalJoueur1;
    additionScoreDuDe1 = 0;
    pointsValue.textContent = '0';
    if (scoreTotalJoueur1 >= 100) {
        audioWinner.play();
        audioWinner.volume = 0.5;
        winnerLoser1.style.display = 'block';
     
    } else {
      resultatJoueur1 = false;
    }
  } else {
    audioCollectPoints.play();
    audioCollectPoints.volume = 0.3;
    scoreTotalJoueur2 += additionScoreDuDe2;
    score2.textContent = scoreTotalJoueur2;
    additionScoreDuDe2 = 0;
    pointsValue.textContent = '0';
    if (scoreTotalJoueur2 >= 100) {
        audioWinner.play();
        audioWinner.volume = 0.5;
        winnerLoser2.style.display = 'block';
    
    } else {
      resultatJoueur1 = true;
    }
  }
});

// Fonction pour générer un nombre entier de 1 à 6
function genererNombreEntier() {
  return Math.floor(Math.random() * 6 + 1);
}
// Afficher l'image du dé correspondant au résultat de la fonction "genererNombreEntier()"
function imagesDuDe(nombreAleatoire) {
  if (nombreAleatoire == 1) {
    nombreAleatoire = imgDice.innerHTML = '<img src="media/img/de-1.png">';
  } else if (nombreAleatoire == 2) {
    nombreAleatoire = imgDice.innerHTML = '<img src="media/img/de-2.png">';
  } else if (nombreAleatoire == 3) {
    nombreAleatoire = imgDice.innerHTML = '<img src="media/img/de-3.png">';
  } else if (nombreAleatoire == 4) {
    nombreAleatoire = imgDice.innerHTML = '<img src="media/img/de-4.png">';
  } else if (nombreAleatoire == 5) {
    nombreAleatoire = imgDice.innerHTML = '<img src="media/img/de-5.png">';
  } else if (nombreAleatoire == 6) {
    nombreAleatoire = imgDice.innerHTML = '<img src="media/img/de-6.png">';
  }
}

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
  window.setTimeout(() => {
    // retarde la fermeture de la modal de 500 ms, ce qui permet de mettre une animation
    modal.style.display = 'none';
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
