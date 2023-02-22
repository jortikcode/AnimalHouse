// Utility per sapere se un utente e' loggato oppure no
export const isLogged = () => localStorage.getItem("user") !== null;

// Utility per leggere/scrivere sul localstorage
const getUserInfo = () => localStorage.getItem("user").userInfo;
const getUserToken = () => localStorage.getItem("token");
const updateUserLocalStorage = (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser))
}

// Utitily per aggiornare il punteggio di un utente
export const updateScore = async (scoreObject) => {
  const token = getUserToken();
  const userInfo = getUserInfo();
  const { _id: userID, punteggiDeiGiochi: oldScores } = userInfo;
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/${userID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      punteggiDeiGiochi: [...oldScores, scoreObject],
    }),
  });
  const json = await response.json()
  updateUserLocalStorage(json)
  return json
};
