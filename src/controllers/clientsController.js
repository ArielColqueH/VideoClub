var cliente =
  "select a.id_client, b.fathers_last_name,b.mothers_last_name,b.first_name, a.cellphone_number,a.mail,a.date_of_birth,a.address,a.registation_date from client a, person b where a.id_person=b.id_person";
var clienteById =
  "select a.id_client, b.fathers_last_name,b.mothers_last_name,b.first_name, a.id_client_card,a.cellphone_number,a.mail,a.date_of_birth,a.address,a.longitude_address,a.latitude_address,a.registation_date,a.invoice_name,a.invoice_nit from client a, person b where a.id_person=b.id_person and a.id_client=?";
const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(cliente, (err, client) => {
      if (err) {
        res.json(err);
      } else {
        //console.log(client);
        res.render("clients", {
          data: client
        });
      }
    });
  });
};
controller.save = (req, res) => {
  var first_name = req.body.first_name;
  var fathers_last_name = req.body.fathers_last_name;
  var mothers_last_name = req.body.mothers_last_name;

  var id_client_card = req.body.id_client_card;
  var cellphone_number = req.body.cellphone_number;
  var mail = req.body.mail;
  var date_of_birth = req.body.date_of_birth;
  var address = req.body.address;
  var latitude_address = req.body.latitude_address;
  var longitude_address = req.body.longitude_address;
  var registation_date = req.body.registation_date;
  var invoice_name = req.body.invoice_name;
  var invoice_nit = req.body.invoice_nit;
  console.log("aqui");
  req.getConnection((err, conn) => {
    conn.query(
      "INSERT INTO person (first_name,fathers_last_name,mothers_last_name) values (?,?,?)",
      [first_name, fathers_last_name, mothers_last_name],
      (err, client) => {
        if (err) {
          res.json(err);
        } else {
          conn.query(
            "SELECT * from person where first_name=? and fathers_last_name=? and mothers_last_name=?",
            [first_name, fathers_last_name, mothers_last_name],
            (err, idPerson) => {
              if (err) {
                res.json(err);
              } else {
                console.log( idPerson[0].id_person);
                conn.query(
                  "INSERT INTO client (id_client_card,cellphone_number,mail,date_of_birth,address,latitude_address,longitude_address,registation_date,invoice_name,invoice_nit,id_person) values (?,?,?,?,?,?,?,?,?,?,?)",
                  [
                    id_client_card,
                    cellphone_number,
                    mail,
                    date_of_birth,
                    address,
                    latitude_address,
                    longitude_address,
                    registation_date,
                    invoice_name,
                    invoice_nit,
                    idPerson[0].id_person
                  ],
                  (err, client) => {
                    if (err) {
                      res.json(err);
                    } else {
                      res.redirect("clientes");
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });
};
controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query(clienteById, [id], (err, client) => {
      //console.log(customer);
      res.render("clients_edit", {
        data: client[0]
      });
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newCliente = req.body;
  req.getConnection((err, conn) => {
    conn.query(
      "UPDATE client set ? where id_client = ?",
      [newCliente, id],
      (err, rows) => {
        res.redirect("/clientes");
      }
    );
  });
};

module.exports = controller;
