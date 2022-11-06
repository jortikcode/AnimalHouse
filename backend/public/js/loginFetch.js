$(document).ready(

);
$("#form").submit(function (event) {
  event.preventDefault();
  checkLogin();
});

const checkLogin = async () => {
  const email = $("#form-email").val();
  const password = $("#form-password").val();
  const localStorage = window.localStorage;
  const res = await fetch("http://localhost:8000/api/auth/loginAdmin/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    mode: "cors",
  });
  if(!res.ok) {
    const err = await res.json();
    const template = Handlebars.compile($())
  }
};
