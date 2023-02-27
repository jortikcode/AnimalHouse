$("#logout").on("click", function (event) {
  const localStorage = window.localStorage;

  // Rimuovi il token dal localStorage
  localStorage.removeItem("adminToken");

  // Rimuovi le informazioni dell'utente dal localStorage
  localStorage.removeItem("locationInfo");

  // Reindirizza l'utente alla pagina di login
  window.location.href = "/back-office/login";
});
