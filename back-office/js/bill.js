const thead = document.querySelector("thead");
thead.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName === "TH") {
    sortTable(target.dataset.orderBy);
  }
});

function sortTable(orderBy) {
  // implementare qui la logica per ordinare i dati della tabella
  // ...
}

/* Aggiungi più prodotti al modale aggiungi nuova fattura */
const modale = document.querySelector("#createModal");
const addProductButton = document.querySelector("#addProductBtn");
const productsContainer = document.querySelector("#productsContainer");
const productTemplate = document
  .querySelector("#productTemplate")
  .cloneNode(true);
productTemplate.style.display = "block";

addProductButton.addEventListener("click", () => {
  const newProductsContainer = productsContainer.cloneNode(true);
  console.log(newProductsContainer);
  const removeButtonContainer = newProductsContainer.querySelector(
    "#removeProductButton"
  );
  const removeButton = document.createElement("button");
  removeButton.classList.add(
    "remove-button",
    "rounded-lg",
    "p-2",
    "text-black",
    "bg-yellow-500",
    "w-full"
  );
  removeButton.innerHTML = "Rimuovi";

  removeButton.addEventListener("click", () => {
    newProductsContainer.remove();
  });
  removeButtonContainer.appendChild(removeButton);
  productsContainer.parentNode.appendChild(newProductsContainer);
  modale.classList.remove("overflow-y-auto");
  modale.classList.add("overflow-y-auto");
});
