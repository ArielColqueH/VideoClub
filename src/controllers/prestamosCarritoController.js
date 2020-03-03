const controller = {};
var list = new Array();
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
controller.add_card = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM video WHERE id = ?",[id] ,(err, video) => {
      if (err) {
        res.json(err);
      } else {
        console.log(video);
        list.add(video);
        res.redirect("/prestamos");
      }
    });
  });
};
  module.exports = controller;