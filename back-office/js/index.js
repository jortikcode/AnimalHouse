jQuery(function () {
  const token = window.localStorage.getItem("token");
  if(!token){
    window.location.replace("/back-office/login");
  }
  const template = Handlebars.compile($("#template").html());
  const filled = template({ name: "ALEX" });
  $("#output").html(filled);
});

const checkToken = () => {
  if(!window.localStorage.getItem("token")){
    return false;
  }
}