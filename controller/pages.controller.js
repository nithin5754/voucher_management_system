const { mssql } = require("../database/connection");



   /**
 * 
 * @param {null } req.body
 * @param {user:{id,username,email}} req.session
 * @returns {'login','dashboard'}
 * @description "home page index Controller"
 */

const home=(req, res) => {
  if (!req.session.user) {
      res.redirect('/login');
      return;
  }
  res.redirect('/dashboard');
}

   /**
 * 
 * @param {null } req.body
 * @returns {'login'}
 * @description "login page Controller"
 */
const loginPage=(req, res) => {
  res.render('login');
}
   /**
 * 
 * @param {null } req.body

 * @returns {'register'}
 * @description "register page Controller"
 */
const registerPage=(req, res) => {
  res.render('register');
}
   /**
 * 
 * @param {null } req.body
 * @param {user:{id,username,email}} req.session
 * @returns {'setting'}
 * @description "setting page Controller"
 */

const settingsPage=async(req, res) => {

  const result = await mssql.query`
  SELECT * FROM Settings 
  WHERE user_id = ${req.session.user.id}
`;
console.log(result,"settings")
  res.render('settings',{settings:result.recordset[0]});
}

   /**
 * 
 * @param {null } req.body
 * @param {user:{id,username,email}} req.session
 * @returns {'register'}
 * @description "dashboard page Controller"
 */

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

