// Variables:
const allCards = document.querySelectorAll('.card');
let score=0;
let flippedCards=[];

// Local storage
let highScore = localStorage.getItem("memoryHighScore");

if (highScore === null) { // si pas de highScore
  highScore = Infinity; // on lui donne la valeur infinie (puisque le meilleur score possible est petit)
} else {
  highScore = Number(highScore); // on transforme le string en nombre
}



function generateCards() {
  const emojis = ["🍎", "🍌", "🍇", "🍓", "🍑", "🥝", "🍍", "🥭"];
  
  // créer les paires
  let cards = [];
  emojis.forEach(e => {
    cards.push(e); // on en met 2
    cards.push(e);
  });

  // mélanger le tableau
  cards = shuffle(cards); // nous allons créer cette fonction de mélange

  return cards;
}


// fonction de mélange 
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


// création des éléments
const grid = document.querySelector(".grid");
function startGame(){
let cardsArray = generateCards();

grid.innerHTML = ""; // vider la grille

cardsArray.forEach(value => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = value;
  grid.appendChild(card);

  // ajout ici de la logique click
   card.addEventListener('click', () => {
// empêcher de cliquer sur déjà retournée
    if(card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    // card.innerText ="retournée";
    card.innerText = card.dataset.value;

      // ajouter au tableau des cartes retournées
    flippedCards.push(card);

     // si deux cartes retournées, vérifier
    if(flippedCards.length === 2){
      checkPair(); // mériterait d'être en asynchrone pour empecher de retourner plus de 2 cartes
    }
  });
});

}


function checkPair() { // remarque: bug possible si on click trop vite, il faudrait mettre cette 
                        // fonction en asynchrone, mais ce n'est pas le sujet
  const [card1, card2] = flippedCards; // déstructuration du tableau

  if(card1.dataset.value === card2.dataset.value){
    // paire correcte → laisser retournée
    flippedCards = []; // réinitialiser le tableau
  } else {
    // paire incorrecte → retourner après 1 sec
    setTimeout(() => {
      card1.classList.remove('flipped');
      card1.innerHTML = '';

      card2.classList.remove('flipped');
      card2.innerHTML = '';

      flippedCards = []; // réinitialiser
    }, 1000);
  }

  // incrémenter le score à chaque essai
  score++;
  document.getElementById('score').textContent = `Coups : ${score}`;

  // Bonus fin de partir
let victory = document.getElementById("victory");
let score2=document.getElementById("score2");
if(document.querySelectorAll('.card.flipped').length === allCards.length){
  setTimeout(() => {
    victory.style.display="flex";
    score2.textContent=`Bravo ! Vous avez terminé en ${score} coups.`}, 100);
 const highScoreStored = localStorage.getItem("memoryHighScore");

  if (
    highScoreStored === null ||
    score < Number(highScoreStored)
  ) { console.log( score, highScore);
    localStorage.setItem("memoryHighScore", score);
    document.getElementById("pHS").style.display ="flex";
    document.getElementById("newHighScore").textContent = `Nouveau Highscore: ${score}`;
    document.getElementById("highScore").textContent = score;
  }


}
}


// Ajout du click sur le boutton play again
document.getElementById("playAgain").addEventListener('click',playAgain);

function playAgain() {
  console.log("click");
flippedCards=[];
score=0;
  document.getElementById('score').textContent = `Coups : ${score}`;

startGame();
victory.style.display="none";
document.getElementById("pHS").style.display = "none";
};


// reset HighScore
document.getElementById("reset").addEventListener("click", ()=> {
  localStorage.removeItem("memoryHighScore");
      document.getElementById("highScore").textContent = score;


})


startGame();