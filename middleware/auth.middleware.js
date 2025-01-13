const { mssql } = require("../database/connection");


module.exports = async function userAuth(req, res, next) {
    if (req.session.user) {
        const username = req.session.user.username
         const result = await mssql.query`
             SELECT * FROM Users 
             WHERE username = ${username}
         `;

         const isExist = result.recordset[0];
        if (isExist.isBlocked) {
            req.session.user = null
            res.redirect('/login');
        } else {
            next(); 
        }
    } else {
        res.redirect('/login');
    }
}

