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
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query("INSERT INTO client SET ?", [data], (err, client) => {
      res.redirect("clients");
    });
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
