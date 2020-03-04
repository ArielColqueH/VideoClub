const controller = {};

controller.signin = (req, res) => {
  req.getConnection((err, conn) => {
    res.render("login");
  });
};
controller.verify = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  //console.log(username);
  //console.log(password);
  req.getConnection((err, conn) => {
    if (username && password) {
      conn.query(
        "SELECT * FROM administrator WHERE user = ? AND password = ?",
        [username, password],
        function(err, results, fields) {
          if (results.length > 0) {
            console.log("here");
            //req.session.loggedin = true;
            //req.session.username = username;
            res.redirect("/prestamos");
          } else {
            res.send("Incorrect Username and/or Password!");
            res.redirect("/");
          }
          res.end();
        }
      );
    } else {
      res.send("Please enter Username and Password!");
      res.end();
    }
  });
};

module.exports = controller;
