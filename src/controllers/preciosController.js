const controller={};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
      conn.query('select * from rate', (err, precios) => {
        if (err) {
          res.json(err);
        } else {
          console.log(precios);
          res.render("precios", {
            data: precios
          });
        }
      });
    });
  };
  controller.edit = (req, res) => {
      const {id} = req.params;
    req.getConnection((err, conn) => {
      conn.query('select * from rate where id_rate=?', [id],(err, precios) => {
        if (err) {
          res.json(err);
        } else {
          console.log(precios);
          res.render("precios", {
            data: precios[0]
          });
        }
      });
    });
  };

  module.exports=controller;