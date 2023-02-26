jQuery(function () {
  const token = window.localStorage.getItem("token");
  if (!token) {
    window.location.replace("/back-office/login");
  }
  const locationInfo = JSON.parse(window.localStorage.getItem("locationInfo"));
  const query = {};
  query.location = locationInfo._id;
  getServices(query);
  const formLocation = document.querySelector("#formLocation");
  formLocation.value = locationInfo._id;
  const searchParam = document.querySelector("#searchParam");
  const search = document.querySelector("#search");
  search.addEventListener("keyup", () => {
    const param = searchParam.value;
    query[param] = search.value;
    getServices(query);
    delete query[param];
  });
});

const getServices = async (query) => {
  const response = await fetch("http://localhost:8000/api/v1/services?" + new URLSearchParams(query));
  if (!response.ok) {
    const error = await response.json();
    const errorTemplate = Handlebars.compile($("#errorTemplate").html());
    const filled = errorTemplate({ error: error.msg });
    $("#error").html(filled);
    return;
  }
  const services = await response.json();
  if (services.length > 0) {
    const servicesTemplate = Handlebars.compile($("#servicesTemplate").html());
    const filled = servicesTemplate({ services: services });
    $("#tableRows").html(filled);
  } else {
    $("#tableRows").html("");
  }
};

const getService = async (id) => {
  if (id) {
    const response = await fetch(`http://localhost:8000/api/v1/services/${id}`);
    if (!response.ok) {
      const error = await response.json();
      const errorTemplate = Handlebars.compile($("#errorTemplate").html());
      const filled = errorTemplate({ error: error.msg });
      $("#error").html(filled);
    } else {
      const service = await response.json();
      return service;
    }
  }
};

const createService = async () => {
  const form = document.getElementById("createForm");
  const formData = new FormData(form);
  const response = await fetch(`http://localhost:8000/api/v1/services`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
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

const populateViewService = async (id) => {
  const service = await getService(id);
  document.getElementById("viewServiceImg").src = `/img/${service.imgName}`;
  document.getElementById("viewServiceName").textContent = service.serviceName;
  document.getElementById("viewServiceDescription").textContent = service.description;
  document.getElementById("viewServicePrice").textContent = service.price;
  document.getElementById("viewServiceVip").textContent = service.isVip ? "Si" : "No";
};

const populateModifyService = async (id) => {
  const service = await getService(id);
  document.getElementById("modifyName").value = service.serviceName;
  document.getElementById("modifyDescription").value = service.description;
  document.getElementById("modifyPrice").value = service.price;
  if (service.isVip) {
    document.getElementById("modifyRadioSi").checked = true;
  } else {
    document.getElementById("modifyRadioNo").checked = true;
  }
  document.getElementById("modifyForm").dataset.serviceId = id;
};

const modifyService = async (id) => {
  const form = document.getElementById("modifyForm");
  const formData = new FormData(form);
  const response = await fetch(`http://localhost:8000/api/v1/services/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
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

const deleteService = async (id) => {
  if (id) {
    const response = await fetch(`http://localhost:8000/api/v1/services/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${window.localStorage.getItem("token")}` },
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
  titolo.textContent = "Eliminazione Servizio";
  titolo.classList.add("text-lg", "font-medium", "mb-4");

  // Crea il testo di conferma della card
  const testoConferma = document.createElement("p");
  testoConferma.textContent = "Sei sicuro di voler eliminare questo servizio?";
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
    deleteService(id);
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
