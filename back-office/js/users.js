jQuery(function () {
  const token = window.localStorage.getItem("token");
  if (!token) {
    window.location.replace("/back-office/login");
  }
  const getUsers = async () => {
    const response = await fetch("http://localhost:8000/api/v1/users/");
    if(!response.ok){
        const err = await response.json();
    }
    const users = await response.json();
    const template = Handlebars.compile($("#template").html());
      const filled = template({ error_msg: err });
      $("#users").html(filled);

    const response = await fetch(`${process.env.SITE_URL}/api/v1/users/`);
    if (!response.ok) {
      const err = await response.json();
      res.render("admin_users.hbs", { error_msg: err });
      return;
    }
    const users = await response.json();
    res.render("admin_users.hbs", { users: users });
  

};
  };
  getUsers();
});
