jQuery(function () {
  const token = window.localStorage.getItem("adminToken");
  if (!token) {
    window.location.replace("/back-office/login");
  }
  const locationInfo = JSON.parse(window.localStorage.getItem("locationInfo"));
  const address = locationInfo.address;
  const city = locationInfo.city;
  const province = locationInfo.province;
  const postalCode = locationInfo.postalCode;
  const template = Handlebars.compile($("#template").html());
  const filled = template({
    address: address,
    city: city,
    province: province,
    postalCode: postalCode,
  });
  $("#output").html(filled);
});