jQuery(function () {
  const token = window.localStorage.getItem("token");
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
});

const getUsers = async (query) => {
  const response = await fetch("http://localhost:8000/api/v1/users?" + new URLSearchParams(query));
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
    const response = await fetch(`http://localhost:8000/api/v1/users/${id}`);
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
  document.getElementById("viewUserAddress").textContent = user.address;
  document.getElementById("viewUserBirth").textContent = user.birth?.slice(0, 10);
  document.getElementById("viewUserGender").textContent = user.gender;
  document.getElementById("viewUserVip").textContent = user.isVip ? "Si" : "No";
  let animals = "";
  if (user.animaliPreferiti) {
    for (let i = 0; i < user.animaliPreferiti.length; i += 1) {
      animals += user.animaliPreferiti[i].type | "";
    }
  }
  document.getElementById("viewUserAnimals").textContent = animals;
  let scores = "";
  if (user.punteggiDeiGiochi) {
    for (let i = 0; i < user.punteggiDeiGiochi.length; i += 1) {
      scores += user.punteggiDeiGiochi[i].punteggio | "";
    }
  }
  document.getElementById("viewUserGameScore").textContent = scores;
};

const populateModifyUser = async (id) => {
  const service = await getUser(id);
  document.getElementById("modifyName").value = service.serviceName;
  document.getElementById("modifyDescription").value = service.description;
  document.getElementById("modifyPrice").value = service.price;
  if (service.isVip) {
    document.getElementById("modifyRadioSi").checked = true;
  } else {
    document.getElementById("modifyRadioNo").checked = true;
  }
  document.getElementById("modifyForm").dataset.userId = id;
};

const modifyUser = async (id) => {
  const form = document.getElementById("modifyForm");
  const formData = new FormData(form);
  const response = await fetch(`http://localhost:8000/api/v1/services/${id}`, {
    method: "PATCH",
    body: formData,
  });
  if (!response.ok) {
    const error = await response.json();
    const errorTemplate = Handlebars.compile($("#errorTemplate").html());
    const filled = errorTemplate({ error: error.msg });
    $("#error").html(filled);
  } else {
    const locationInfo = JSON.parse(window.localStorage.getItem("locationInfo"));
    const query = {};
    query.location = locationInfo._id;
    getServices(query);
  }
};

const deleteUser = async (id) => {
  if (id) {
    const response = await fetch(`http://localhost:8000/api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
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
