jQuery(function () {
  const token = window.localStorage.getItem("token");
  if (!token) {
    window.location.replace("/back-office/login");
  }
  const locationInfo = JSON.parse(window.localStorage.getItem("locationInfo"));
  getProducts(locationInfo._id);
  const formLocation = document.querySelector("#formLocation");
  formLocation.value = locationInfo._id;
});

const getProducts = async (location) => {
  const query = {};
  query.location = location;
  const response = await fetch("http://localhost:8000/api/v1/products?" + new URLSearchParams(query));
  if (!response.ok) {
    const error = await response.json();
    const errorTemplate = Handlebars.compile($("#errorTemplate").html());
    const filled = errorTemplate({ error: error.msg });
    $("#error").html(filled);
  }
  const products = await response.json();
  const productsTemplate = Handlebars.compile($("#productsTemplate").html());
  const filled = productsTemplate({ products: products });
  $("#tableRows").append(filled);
};
