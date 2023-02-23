const HANGMAN = "HANGMAN";
const MEMORY = "MEMORY";
const QUIZ = "QUIZ";

// Utility per sapere se un utente e' loggato oppure no
export const isLogged = () => JSON.parse(localStorage.getItem("user")) !== null;

// Utility per leggere/scrivere sul localstorage
const getUserInfo = () => JSON.parse(localStorage.getItem("user")).userInfo;
const getUserToken = () => JSON.parse(localStorage.getItem("user")).token;
const updateUserLocalStorage = (token, newUser) => {
  localStorage.setItem("user", JSON.stringify({
    token,
    userInfo: newUser
  }));
};

// Utility che, dati due score a e b, e un tipo di gioco, ritorna true se b > a
const isLessScore = (score1, score2, gameType) => {
  switch (gameType) {
    case HANGMAN:
      // Nel caso dell'impiccato, piu' e' basso lo score, meno mosse ci ha messo ad indovinare il giocatore
      return score1 > score2;
    default:
      return score2 > score1;
  }
};

// Utitily per aggiornare il punteggio di un utente, ritorna true sse scoreObject e' stato inserito nella lista dei punteggi
export const updateScore = async (scoreObject) => {
  const token = getUserToken();
  const userInfo = getUserInfo();
  // Indice dell'oggetto da aggiornare dentro punteggiDeiGiochi
  let toRemoveIndex = -1;
  let index = 0;
  // Se e' il primo punteggio di un determinato gioco, deve essere inserito
  let firstScore = true
  const { _id: userID, punteggiDeiGiochi: oldScores } = userInfo;
  // Nuovo oggetto da inserire nel localStorage
  let newScoreObject = [...oldScores];

  for (const score of oldScores) {
    if (score.game === scoreObject.game)
        // Esiste gia' uno score con il gioco game
        firstScore = false
    if (
      score.game === scoreObject.game &&
      isLessScore(score.score, scoreObject.score, scoreObject.game)
    ) {
      // Il punteggio precedente e' inferiore al punteggio attuale
      toRemoveIndex = index;
      break;
    }
    index++;
  }
  if (toRemoveIndex !== -1 || firstScore) {
    if (toRemoveIndex === -1)
        newScoreObject.push(scoreObject)
    else
        newScoreObject[toRemoveIndex] = scoreObject;
    // Aggiornamento dell'utente
    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/users/${userID}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          punteggiDeiGiochi: newScoreObject,
        }),
      }
    );
    const json = await response.json();
    updateUserLocalStorage(token, json);
    return true;
  }
  return false;
};
