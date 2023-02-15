$("#form").on("submit", function (event) {
  event.preventDefault();
  const email = $("#form-email").val();
  const password = $("#form-password").val();
  const localStorage = window.localStorage;
  const getToken = async () => {
    const response = await fetch(
      `http://localhost:8000/api/v1/auth/loginAdmin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        mode: "cors",
      }
    );
    if (!response.ok) {
      const err = await response.json();
      const template = Handlebars.compile($("#template").html());
      const filled = template({ error_msg: err });
      $("#errors").html(filled);
    } else {
      const admin = await response.json();
      const { token, locationInfo } = { ...admin };
      localStorage.setItem("token", token);
      localStorage.setItem("locationInfo", JSON.stringify(locationInfo));
      window.location.replace("/back-office");
    }
  };
  getToken();
});
