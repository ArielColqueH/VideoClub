const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('select a.id_client, b.fathers_last_name,b.mothers_last_name,b.first_name, a.cellphone_number,a.mail,a.date_of_birth,a.address,a.registation_date from client a, person b where a.id_person=b.id_person', (err, client) => {
      if (err) {
        res.json(err);
      } else {
        console.log(client);
        res.render("clients", {
          data: client
        });
      }
    });
  });
};
controller.save=(req,res)=>{
  const data = req.body;
  req.getConnection((err,conn)=>{
    conn.query('INSERT INTO client SET ?',[data],(err,client)=>{
      res.redirect("/");
    });
  })
};
controller.edit=(req,res)=>{
  const { id }=req.params;
 req.getConnection((err,conn)=>{
  conn.query('SELECT * FROM client wWHERE id =?',[id],(err,client)=>{
    res.render('',{
      data: client[0]
    });
  });
 });
}

controller.update=(req,res)=>{
  const {id} = req.params;
  const new_client = req.body;
  req.getConnection((err,conn)=>{
    conn.query('UPDATE customer set ? where id = ?',[newCustomer,id],(err,rows)=>{
      res.redirect('/');
  });
})
}


  module.exports = controller;