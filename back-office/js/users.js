jQuery(function () {
  const token = window.localStorage.getItem("adminToken");
  if (!token) {
    window.location.replace("/back-office/login");
  }
  const query = {};
  getUsers(query);
  const searchParam = document.querySelector("#searchParam");
  const search = document.querySelector("#search");
  search.addEventListener("keyup", () => {
    const param = searchParam.value;
    query[param] = search.value;
    getUsers(query);
    delete query[param];
  });
  /* modifica utente per avere più animali preferiti */
  const animali = document.querySelector("#animali");
  const aggiungiAnimali = document.querySelector("#aggiungiAnimali");
  aggiungiAnimali.addEventListener("click", () => {
    const animale = document.createElement("div");
    animale.classList.add("animale", "flex");
    animale.innerHTML = `
    <input class="border rounded-md p-2 w-full" name="tipi" type="text"
    placeholder="Animale" aria-placeholder="Tipo di animale pereferito">
<button type="button"
    class="rimuovi bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600">Rimuovi</button>
    `;
    animali.appendChild(animale);
  });
  animali.addEventListener("click", (event) => {
    if (event.target.classList.contains("rimuovi")) {
      event.target.parentElement.remove();
    }
  });
  /* modifica utente per avere più punteggi */
  const punteggi = document.querySelector("#punteggi");
  const aggiungiPunteggi = document.querySelector("#aggiungiPunteggi");
  aggiungiPunteggi.addEventListener("click", () => {
    const punteggio = document.createElement("div");
    punteggio.classList.add("punteggio", "flex");
    punteggio.innerHTML = `
      <input class="border rounded-md p-2 w-1/2" type="text" name="game" placeholder="Nome del gioco">
      <input class="border rounded-md p-2 w-1/3" type="number" name="score" placeholder="Punteggio">
      <button type="button" class="rimuovi bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600">Rimuovi</button>
    `;
    punteggi.appendChild(punteggio);
  });
  punteggi.addEventListener("click", (event) => {
    if (event.target.classList.contains("rimuovi")) {
      event.target.parentElement.remove();
    }
  });
});

const getUsers = async (query) => {
  const response = await fetch("https://site212222.tw.cs.unibo.it/api/v1/users?" + new URLSearchParams(query));
  if (!response.ok) {
    const error = await response.json();
    const errorTemplate = Handlebars.compile($("#errorTemplate").html());
    const filled = errorTemplate({ error: error.msg });
    $("#error").html(filled);
    return;
  }
  const users = await response.json();
  if (users.length > 0) {
    const usersTemplate = Handlebars.compile($("#usersTemplate").html());
    const filled = usersTemplate({ users: users });
    $("#tableRows").html(filled);
  } else {
    $("#tableRows").html("");
  }
};

const getUser = async (id) => {
  if (id) {
    const response = await fetch(`https://site212222.tw.cs.unibo.it/api/v1/users/${id}`);
    if (!response.ok) {
      const error = await response.json();
      const errorTemplate = Handlebars.compile($("#errorTemplate").html());
      const filled = errorTemplate({ error: error.msg });
      $("#error").html(filled);
    } else {
      const user = await response.json();
      return user;
    }
  }
};

const populateViewUser = async (id) => {
  const user = await getUser(id);
  document.getElementById("viewUserImg").src = `/img/${user.imgName}`;
  document.getElementById("viewUserName").textContent = user.name;
  document.getElementById("viewUserSurname").textContent = user.surname;
  document.getElementById("viewUserEmail").textContent = user.email;
  document.getElementById("viewUserAddress").textContent = `${user.address.via} ${user.address.city} ${user.address.postal_code}`;
  document.getElementById("viewUserBirth").textContent = user.birth?.slice(0, 10);
  document.getElementById("viewUserGender").textContent = user.gender;
  document.getElementById("viewUserVip").textContent = user.isVip ? "Si" : "No";
  let animals = [];
  if (user.animaliPreferiti) {
    for (let i = 0; i < user.animaliPreferiti.length; i += 1) {
      if (user.animaliPreferiti[i].animalType) animals.push(user.animaliPreferiti[i].animalType);
    }
  }
  document.getElementById("viewUserAnimals").textContent = animals.join(", ");
  let scores = [];
  if (user.punteggiDeiGiochi) {
    for (let i = 0; i < user.punteggiDeiGiochi.length; i += 1) {
      scores.push(`${user.punteggiDeiGiochi[i].game} - ${user.punteggiDeiGiochi[i].score}`);
    }
  }
  document.getElementById("viewUserGameScore").textContent = scores.join(", ");
};

const populateModifyUser = async (id) => {
  const user = await getUser(id);
  $("#modifyName").val(user.name);
  $("#modifySurname").val(user.surname);
  $("#modifyEmail").val(user.email);
  $("#modifyPassword").val("");
  $("#modifyCity").val(user.address?.city);
  $("#modifyVia").val(user.address?.via);
  $("#modifyPostal_code").val(user.address?.postal_code);
  $("#modifyBirth").val(user.birth?.slice(0, 10));
  if (user.animaliPreferiti) {
    const animali = document.querySelector("#animali");
    animali.innerHTML = "";
    for (let i = 0; i < user.animaliPreferiti.length; i += 1) {
      const animale = document.createElement("div");
      animale.classList.add("animale", "flex");
      animale.innerHTML = `
    <input class="border rounded-md p-2 w-full" name="tipi" type="text"
    placeholder="Animale" aria-placeholder="Tipo di animale pereferito" value="${user.animaliPreferiti[i].animalType}">
<button type="button"
    class="rimuovi bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600">Rimuovi</button>
    `;
      animali.appendChild(animale);
    }
  }
  if (user.punteggiDeiGiochi) {
    const punteggi = document.querySelector("#punteggi");
    punteggi.innerHTML = "";
    for (let i = 0; i < user.punteggiDeiGiochi.length; i += 1) {
      const punteggio = document.createElement("div");
      punteggio.classList.add("punteggio", "flex");
      punteggio.innerHTML = `
      <input class="border rounded-md p-2 w-1/2" type="text" name="game" placeholder="Nome del gioco" value="${user.punteggiDeiGiochi[i].game.toUpperCase()}">
      <input class="border rounded-md p-2 w-1/3" type="number" name="score" placeholder="Punteggio" value="${user.punteggiDeiGiochi[i].score}">
      <button type="button" class="rimuovi bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600">Rimuovi</button>
    `;
      punteggi.appendChild(punteggio);
    }
  }
  if (user.isVip) {
    $("#modifyRadioSi").prop("checked", true);
  } else {
    $("#modifyRadioNo").prop("checked", true);
  }
  document.getElementById("modifyForm").dataset.userId = id;
};

const modifyUser = async (id) => {
  const form = document.getElementById("modifyForm");
  const formData = new FormData(form);
  const response = await fetch(`https://site212222.tw.cs.unibo.it/api/v1/users/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("adminToken")}`,
    },
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json();
    const errorTemplate = Handlebars.compile($("#errorTemplate").html());
    const filled = errorTemplate({ error: error.msg });
    $("#error").html(filled);
    return;
  }
  getUsers({});
};

const deleteUser = async (id) => {
  if (id) {
    const response = await fetch(`https://site212222.tw.cs.unibo.it/api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("adminToken"),
        admin: true,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      const errorTemplate = Handlebars.compile($("#errorTemplate").html());
      const filled = errorTemplate({ error: error.msg });
      $("#error").html(filled);
    } else {
      getUsers({});
    }
  }
};

function confirmDelete(id) {
  // Disattivo tutti i bottoni dell'eliminazione
  document.getElementsByClassName("removeButton").disabled = true;

  // Crea un div che contiene la card di conferma
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "bg-gray-500", "bg-opacity-50", "w-full", "h-full");

  // Crea un div interno che contiene il contenuto della card
  const innerDiv = document.createElement("div");
  innerDiv.classList.add("bg-white", "p-8", "rounded-lg", "shadow-lg");

  // Crea il titolo della card
  const titolo = document.createElement("h2");
  titolo.textContent = "Eliminazione Utente";
  titolo.classList.add("text-lg", "font-medium", "mb-4");

  // Crea il testo di conferma della card
  const testoConferma = document.createElement("p");
  testoConferma.textContent = "Sei sicuro di voler eliminare questo utente?";
  testoConferma.classList.add("text-sm", "mb-6");

  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("flex", "justify-around");

  // Crea i pulsanti per confermare o annullare l'eliminazione del prodotto
  const pulsanteConferma = document.createElement("button");
  pulsanteConferma.textContent = "Conferma";
  pulsanteConferma.classList.add(
    "px-4",
    "py-2",
    "bg-yellow-500",
    "text-black",
    "rounded-lg",
    "mr-4",
    "hover:bg-yellow-600",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-yellow-400"
  );

  const pulsanteAnnulla = document.createElement("button");
  pulsanteAnnulla.textContent = "Annulla";
  pulsanteAnnulla.classList.add(
    "px-4",
    "py-2",
    "bg-yellow-500",
    "text-black",
    "rounded-lg",
    "hover:bg-yellow-600",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-offset-2",
    "focus:ring-yellow-400"
  );

  pulsanteConferma.addEventListener("click", () => {
    deleteUser(id);
    document.body.removeChild(cardDiv);
    document.getElementsByClassName("removeButton").disabled = false;
  });

  pulsanteAnnulla.addEventListener("click", () => {
    document.body.removeChild(cardDiv);
    document.getElementsByClassName("removeButton").disabled = false;
  });

  innerDiv.appendChild(titolo);
  innerDiv.appendChild(testoConferma);
  buttonDiv.appendChild(pulsanteConferma);
  buttonDiv.appendChild(pulsanteAnnulla);
  innerDiv.appendChild(buttonDiv);

  cardDiv.appendChild(innerDiv);
  document.body.appendChild(cardDiv);
}
