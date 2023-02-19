jQuery(function () {
  const token = window.localStorage.getItem("token");
  if (!token) {
    window.location.replace("/back-office/login");
  }
  const locationInfo = JSON.parse(window.localStorage.getItem("locationInfo"));
  const query = {};
  query.location = locationInfo._id;
  getBookings(query);
  const formLocation = document.querySelector("#formLocation");
  formLocation.value = locationInfo._id;
  const searchParam = document.querySelector("#searchParam");
  const search = document.querySelector("#search");
  search.addEventListener("keyup", () => {
    const param = searchParam.value;
    query[param] = search.value;
    getBookings(query);
    delete query[param];
  });
});

const getDateTime = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().slice(0, 10);
  const formattedTime = date.toTimeString().slice(0, 5);
  return `${formattedDate} ${formattedTime}`;
};

const getBookings = async (query) => {
  const response = await fetch("http://localhost:8000/api/v1/booking?" + new URLSearchParams(query));
  if (!response.ok) {
    const error = await response.json();
    const errorTemplate = Handlebars.compile($("#errorTemplate").html());
    const filled = errorTemplate({ error: error.msg });
    $("#error").html(filled);
  } else {
    const bookings = await response.json();
    if (bookings.length > 0) {
      const bookingsTemplate = Handlebars.compile($("#bookingsTemplate").html());
      for (const booking of bookings) {
        booking.date = getDateTime(booking.date);
      }
      const filled = bookingsTemplate({ bookings: bookings });
      $("#tableRows").html(filled);
    } else {
      $("#tableRows").html("");
    }
  }
};

const getBooking = async (id) => {
  if (id) {
    const response = await fetch(`http://localhost:8000/api/v1/booking/${id}`);
    if (!response.ok) {
      const error = await response.json();
      const errorTemplate = Handlebars.compile($("#errorTemplate").html());
      const filled = errorTemplate({ error: error.msg });
      $("#error").html(filled);
    } else {
      const booking = await response.json();
      return booking;
    }
  }
};

const createService = async () => {
  const form = document.getElementById("createForm");
  const formData = new FormData(form);
  const response = await fetch(`http://localhost:8000/api/v1/services`, {
    method: "POST",
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

const populateViewBooking = async (id) => {
  const booking = await getBooking(id);
  document.getElementById("viewBookingUser").textContent = booking.user.email;
  document.getElementById("viewBookingService").textContent = booking.service.serviceName;
  document.getElementById("viewBookingDate").textContent = getDateTime(booking.date);
};

const populateServices = async (selectField, booking) => {
  const locationInfo = JSON.parse(window.localStorage.getItem("locationInfo"));
  const query = {};
  query.location = locationInfo._id;
  query.getServices = true;
  const response = await fetch(`http://localhost:8000/api/v1/services?` + new URLSearchParams(query));
  if (!response.ok) {
    const error = await response.json();
    const errorTemplate = Handlebars.compile($("#errorTemplate").html());
    const filled = errorTemplate({ error: error.msg });
    $("#error").html(filled);
  } else {
    const services = await response.json();
    for (let i = 0; i < services.length; i += 1) {
      const option = document.createElement("option");
      option.value = services[i];
      option.text = services[i];
      if (services[i] == booking.service.serviceName) option.selected = true;
      selectField.appendChild(option);
    }
  }
};

const populateModifyHour = async (selectField, date) => {
  const locationInfo = JSON.parse(window.localStorage.getItem("locationInfo"));
  const query = {};
  query.location = locationInfo._id;
  query.getServices = true;
  const response = await fetch(`http://localhost:8000/api/v1/services?` + new URLSearchParams(query));
  if (!response.ok) {
    const error = await response.json();
    const errorTemplate = Handlebars.compile($("#errorTemplate").html());
    const filled = errorTemplate({ error: error.msg });
    $("#error").html(filled);
  } else {
    /* mi prendo tutte le prenotazioni di quel giorno */
    const bookedHours = [];
    if (bookedHours.indexOf(date) != -1) {
      bookedHours.splice(indexOf(date), 1);
    }
    for (let i = 9; i <= 17; i += 1) {
      if (!bookedHours.includes(i)) {
        const option = document.createElement("option");
        option.value = services[i];
        option.text = services[i];
        selectField.appendChild(option);
      }
    }
  }
};

const populateModifyBooking = async (id) => {
  const booking = await getBooking(id);
  const date = new Date(booking.date).toISOString().slice(0, 10);
  document.getElementById("modifyUser").textContent = booking.user.email;
  await populateServices(document.getElementById("modifyService"), booking);
  document.getElementById("modifyDate").value = date;
  await populateModifyHour(document.getElementById("modifyHour"), date);
  document.getElementById("modifyForm").dataset.bookingId = id;
};

const modifyService = async (id) => {
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

const deleteService = async (id) => {
  if (id) {
    const response = await fetch(`http://localhost:8000/api/v1/services/${id}`, {
      method: "DELETE",
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
