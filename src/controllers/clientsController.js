const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM client", (err, client) => {
      if (err) {
        res.json(err);
      } else {
        //console.log(actor);
        res.render("clients", {
          data: client
        });
      }
    });
  });
};

  module.exports = controller;