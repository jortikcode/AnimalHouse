jQuery(function () {
  const token = window.localStorage.getItem("token");
  if (!token) {
    window.location.replace("/back-office/login");
  }
  const locationInfo = JSON.parse(window.localStorage.getItem("locationInfo"));
  const query = {};
  query.location = locationInfo._id;
  getProducts(query);
  const formLocation = document.querySelector("#formLocation");
  formLocation.value = locationInfo._id;
  const searchParam = document.querySelector("#searchParam");
  const search = document.querySelector("#search");
  search.addEventListener("keyup", () => {
    const param = searchParam.value;
    query[param] = search.value;
    getProducts(query);
    delete query[param];
  });
});

const getProducts = async (query) => {
  const response = await fetch("http://localhost:8000/api/v1/products?" + new URLSearchParams(query));
  if (!response.ok) {
    const error = await response.json();
    const errorTemplate = Handlebars.compile($("#errorTemplate").html());
    const filled = errorTemplate({ error: error.msg });
    $("#error").html(filled);
  }
  const products = await response.json();
  if (products.length > 0) {
    const productsTemplate = Handlebars.compile($("#productsTemplate").html());
    const filled = productsTemplate({ products: products });
    $("#tableRows").html(filled);
  } else {
    $("#tableRows").html("");
  }
};

const getProduct = async (id) => {
  if (id) {
    const response = await fetch(`http://localhost:8000/api/v1/products/${id}`);
    if (!response.ok) {
      const error = await response.json();
      const errorTemplate = Handlebars.compile($("#errorTemplate").html());
      const filled = errorTemplate({ error: error.msg });
      $("#error").html(filled);
    } else {
      const productObj = await response.json();
      return productObj.product;
    }
  }
};

const createProduct = async () => {
  const form = document.getElementById("createForm");
  const formData = new FormData(form);
  const response = await fetch(`http://localhost:8000/api/v1/products`, {
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
    getProducts(query);
  }
};

const populateViewProduct = async (id) => {
  const product = await getProduct(id);
  document.getElementById("viewProductImg").src = `/img/${product.imgName}`;
  document.getElementById("viewProductName").textContent = product.name;
  document.getElementById("viewProductPrice").textContent = product.price;
  document.getElementById("viewProductDescription").textContent = product.description;
  document.getElementById("viewProductFeatured").textContent = product.featured ? "Si" : "No";
  document.getElementById("viewProductRating").textContent = product.rating;
  document.getElementById("viewProductQta").textContent = product.qta;
  document.getElementById("viewProductCategory").textContent = product.category;
  document.getElementById("viewProductSubcategory").textContent = product.subcategory.join(", ");
};

const populateModifyProduct = async (id) => {
  const product = await getProduct(id);
  document.getElementById("modifyName").value = product.name;
  document.getElementById("modifyPrice").value = product.price;
  document.getElementById("modifyDescription").value = product.description;
  document.getElementById("modifyQta").value = product.qta;
  document.getElementById("modifyFeatured").checked = product.featured;
  document.getElementById("modifyCategory").value = product.category;
  document.getElementById("modifySubcategory").value = product.subcategory.join(", ");
  document.getElementById("modifyForm").dataset.productId = id;
};

const modifyProduct = async (id) => {
  const form = document.getElementById("modifyForm");
  const formData = new FormData(form);
  const response = await fetch(`http://localhost:8000/api/v1/products/${id}`, {
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
    getProducts(query);
  }
};

const deleteProduct = async (id) => {
  if (id) {
    const response = await fetch(`http://localhost:8000/api/v1/products/${id}`, {
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
      getProducts(query);
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
  titolo.textContent = "Eliminazione Prodotto";
  titolo.classList.add("text-lg", "font-medium", "mb-4");

  // Crea il testo di conferma della card
  const testoConferma = document.createElement("p");
  testoConferma.textContent = "Sei sicuro di voler eliminare questo prodotto?";
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
    deleteProduct(id);
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
