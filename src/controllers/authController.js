const controller = {};

controller.verify = (req, res) => {
  var { username } = req.body;
  var { password } = req.body;
  req.getConnection((err, conn) => {
    if (username && password) {
      conn.query(
        "SELECT * FROM administrator WHERE user = ? AND password = ?",
        [username, password],
        (err, adm) => {
          if (err) {
            res.json(err);
          } else {
            if (results.length > 0) {
              req.session.loggedin = true;
              req.session.username = username;
              res.send("correct!");
              res.render("prestamos");
            } else {
              res.send("Incorrect Username and/or Password!");
              res.redirect("/");
            }
            res.end();
          }
        }
      );
    } else {
      res.send("Please enter Username and Password!");
      res.end();
    }
  });
};

module.exports = controller;
