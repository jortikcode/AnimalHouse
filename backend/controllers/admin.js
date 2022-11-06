const fetch = require("node-fetch");

const mainPage = (req, res) => {
  if (!req.session.user) {
    res.redirect("/admin/login");
    return;
  }
  res.render("admin.hbs");
};

const loginPage = (req, res) => {
  if (req.session.user) {
    res.redirect("/admin");
    return;
  }
  res.render("login.hbs");
};

const loginFetch = async (req, res) => {
  const { email, password } = req.body;
  const response = await fetch(
    `${process.env.SITE_URL}/api/v1/auth/loginAdmin`,
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    }
  );
  if (!response.ok) {
    const err = await response.json();
    res.render("login.hbs", { error_msg: err });
    return;
  }
  const { userInfo } = await response.json();
  req.session.user = userInfo;
  res.redirect("/admin");
};

const usersPage = async (req, res) => {
  const response = await fetch(`${process.env.SITE_URL}/api/v1/users/`);
  if (!response.ok) {
    const err = await response.json();
    res.render("admin_users.hbs", { error_msg: err });
    return;
  }
  const users = await response.json();
  res.render("admin_users.hbs", { users: users });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/admin/login')
}

module.exports = { logout, mainPage, loginPage, loginFetch, usersPage };
