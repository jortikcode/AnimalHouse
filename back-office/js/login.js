$("#form").on("submit", function (event) {
  event.preventDefault();
  const email = $("#form-email").val();
  const password = $("#form-password").val();
  const localStorage = window.localStorage;
  getToken(email, password, localStorage);
});

const getToken = async (email, password, localStorage) => {
  const response = await fetch(`https://site212222.tw.cs.unibo.it/api/v1/auth/loginAdmin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    mode: "cors",
  });
  if (!response.ok) {
    const err = await response.json();
    const template = Handlebars.compile($("#template").html());
    const filled = template({ error_msg: err });
    $("#errors").html(filled);
  } else {
    const admin = await response.json();
    const { token, locationInfo } = { ...admin };
    localStorage.setItem("adminToken", JSON.stringify(token));
    localStorage.setItem("locationInfo", JSON.stringify(locationInfo));
    window.location.replace("/back-office");
  }
};
