$("#logout").on("click", function (event) {
  const localStorage = window.localStorage;

  // Rimuovi il token dal localStorage
  localStorage.removeItem("token");

  // Rimuovi le informazioni dell'utente dal localStorage
  localStorage.removeItem("userInfo");

  // Reindirizza l'utente alla pagina di login
  window.location.href = "/back-office/login";
});
