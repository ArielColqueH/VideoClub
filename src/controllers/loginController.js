const controller = {};

controller.signin = (req, res) => {
    const { user } = req.params;
    const { password } = req.params;
    const data =req.body;
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM administrator where user = ? and password = ?", [user,password],(err, adm) => {
        if (err) {
          res.json(err);
        } else {
          //console.log(actor);
          res.render("/login", {
            data: adm
          });
        }
      });
    });
  };

module.exports = controller;