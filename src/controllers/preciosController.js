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
  controller.update=(req,res)=>{
    const {id} = req.params;
    const new_price = req.body;
    req.getConnection((err,conn)=>{
      conn.query('UPDATE customer set ? where id = ?',[new_price,id],(err,rows)=>{
        res.redirect('/');
    });
  })
  }

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