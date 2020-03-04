const controller = {};
var devoluciones =
  "select a.id_rental,a.start_date,a.devolution_date,c.fathers_last_name,c.mothers_last_name,c.first_name,d.status_name " +
  "from rental a,client b, person c, rental_status d " +
  "where b.id_person = c.id_person " +
  "and b.id_client = a.id_client " +
  "and a.id_rental_status=d.id_rental_status " +
  "and (d.id_rental_status= 1 or d.id_rental_status=2) "+
  "order by(a.id_rental) asc";

var devolucionesSearch =
  "select a.id_rental,a.start_date,a.devolution_date,c.fathers_last_name,c.mothers_last_name,c.first_name,d.status_name " +
  "from rental a,client b, person c, rental_status d " +
  "where b.id_person = c.id_person " +
  "and b.id_client = a.id_client " +
  "and a.id_rental_status=d.id_rental_status and a.id_rental=?" +
  "order by(a.id_rental) asc";

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(devoluciones, (err, rental) => {
      if (err) {
        res.json(err);
      } else {
        //console.log(actor);
        res.render("devoluciones", {
          data: rental
        });
      }
    });
  });
};

controller.search = (req, res) => {
  var word = req.body.word;
  console.log(word);
  req.getConnection((err, conn) => {
    if (word) {
      conn.query(devolucionesSearch, [word], (err, video) => {
        if (err) {
          res.json(err);
        } else {
          res.render("devoluciones", {
            data: video
          });
        }
      });
    } else {
      if (word == "") {
        conn.query(devoluciones, (err, video) => {
          if (err) {
            res.json(err);
          } else {
            res.render("devoluciones", {
              data: video,
            });
          }
        });
      }
    }
  });
};

module.exports = controller;
