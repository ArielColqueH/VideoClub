const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM video", (err, video) => {
      if (err) {
        res.json(err);
      } else {
        //console.log(actor);
        res.render("prestamosCarrito", {
          data: video
        });
      }
    });
  });
};

  module.exports = controller;