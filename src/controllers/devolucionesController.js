const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('select a.id_rental,a.start_date,a.devolution_date,c.fathers_last_name,c.mothers_last_name,c.first_name,d.status_name '
    +'from rental a,client b, person c, rental_status d '+
    'where b.id_person = c.id_person '+
    'and b.id_client = a.id_client '+
    'and a.id_rental_status=d.id_rental_status '+
    'order by(a.id_rental) asc', (err, rental) => {
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

  module.exports = controller;