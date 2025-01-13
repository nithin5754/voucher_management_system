const { mssql } = require("../database/connection");





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


const settingsPage=async(req, res) => {

  const result = await mssql.query`
  SELECT * FROM Settings 
  WHERE user_id = ${req.session.user.id}
`;
console.log(result,"settings")
  res.render('settings',{settings:result.recordset[0]});
}

const dashboardPage=async(req, res) => {

  if (!req.session.user) {
    res.redirect('/login');
    return;
}

try {
    const result = await mssql.query`
        SELECT * FROM Vouchers 
        WHERE user_id = ${req.session.user.id}
        ORDER BY generated_date DESC
    `;


   return res.render('dashboard', { 
        vouchers: result.recordset,
        user: req.session.user,
       
    });
} catch (err) {
    console.error(err);
    res.render('dashboard', { 
        error: 'Failed to load vouchers',
        vouchers: [],
        user: req.session.user
    });
}
}






module.exports = {loginPage,home,registerPage,dashboardPage,settingsPage};

