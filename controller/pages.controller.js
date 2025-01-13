




const home=(req, res) => {
  if (!req.session.user) {
      res.redirect('/login');
      return;
  }
  res.redirect('/dashboard');
}


const loginPage=(req, res) => {
  res.render('login');
}

const registerPage=(req, res) => {
  res.render('register');
}

const dashboardPage=(req, res) => {
  res.render('dashboard',{user: req.session.user,vouchers:[]});
}






module.exports = {loginPage,home,registerPage,dashboardPage};

