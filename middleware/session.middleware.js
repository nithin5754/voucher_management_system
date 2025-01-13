

module.exports = function sessionMangement(req, res, next) {
  if (req.session.user) {
      res.redirect('/');
  } else {
      next(); 
  }
}