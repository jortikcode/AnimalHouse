$("#form").on("submit", function (event) {
  event.preventDefault();
  const password = $("#form-password").val();
  const currentURL = window.location.pathname;
  const parts = currentURL.split("/");
  const token = parts[parts.length - 1];
  resetPassword(password, token);
});

const resetPassword = async (password, token) => {
  const response = await fetch(`https://site212222.tw.cs.unibo.it/api/v1/auth/resetPassword/${token}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
    mode: "cors",
  });
  if (!response.ok) {
    const err = await response.json();
    const errorTemplate = Handlebars.compile($("#errorTemplate").html());
    const filled = errorTemplate({ error: err.msg });
    $("#errors").html(filled);
  } else {
    window.location.replace("/frontoffice");
  }
};
