var peliculasCarrito =
  "select a.id_video, b.video_title, c.genre, d.first_name,d.last_name, a.stock, a.unit_cost from video a, video_title b, genre c, actor d, video_genre e, video_actor f where a.id_video = b.id_video and a.id_video = e.id_video and e.id_genre = c.id_genre and a.id_video = f.id_video and f.id_actor = d.id_actor and status=1 and a.stock>0 group by (a.id_video);";
var peliculasCarritoEliminar = "UPDATE video set status=0 where id_video = ?";
var dias = "select * from rate;";
const controller = {};
var list = new Array();
var idClient;
var id_administrador =1;
var fecha_inicio;
var fecha_final;
var loan;
 let date_ob = new Date();
let day = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
var current_date = year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;
var devolution_date = year+'-'+month+'-'+(day+3)+' '+hours+':'+minutes+':'+seconds;
// controller.list = (req, res) => {
//   req.getConnection((err, conn) => {
//     conn.query("SELECT * FROM video", (err, video) => {
//       if (err) {
//         res.json(err);
//       } else {
//         //console.log(actor);
//         res.render("prestamosCarrito", {
//           data: video
//         });
//       }
//     });
//   });
// };
// controller.add_card = (req, res) => {
//   const { id } = req.params;
//   req.getConnection((err, conn) => {
//     conn.query("SELECT * FROM video WHERE id = ?", [id], (err, video) => {
//       if (err) {
//         res.json(err);
//       } else {
//         console.log(video);
//         list.add(video);
//         res.redirect("/prestamos");
//       }
//     });
//   });
// };
controller.listCart = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(peliculasCarrito, (err, videoCarrito) => {
      if (err) {
        res.json(err);
      } else {
        conn.query(dias, (err, dias) => {
          if (err) {
            res.json(err);
          } else {
            res.render("prestamosCarrito", {
              data: videoCarrito,
              data2: dias
            });
          }
        });
      }
    });
  });
};
/*controller.listCart = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(peliculasCarrito, (err, video) => {
      if (err) {
        res.json(err);
      } else {
        //console.log(video);
        res.render("prestamosCarrito", {
          data: video
        });
      }
    });
  });
};*/

controller.eliminar = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query(peliculasCarritoEliminar, [id], (err, video) => {
      if (err) {
        res.json(err);
      } else {
        res.redirect("/prestamos/carrito");
      }
    });
  });
};

controller.factura = (req, res) => {
  loan = req.body.d_loan;
  const nit_number = req.body.nit;
  req.getConnection((err, conn) => {
    conn.query("select id_client from client where invoice_nit = ?", [nit_number], (err, result,fields) => {
      if (err) {
        res.json(err);
      } else {
        console.log("Cliente id "+fields[0]);
        idClient=8;
        insertarRenta(req,res);
       // res.redirect("/prestamos/carrito");
      }
    });
  });
};

function insertarRenta(req,res){
  var d = new Date();
  req.getConnection((errn,conn)=>{
    conn.query("insert into rental (id_rate, id_client, start_date, devolution_date, id_discount, total, id_rental_status, id_administrator) values ("+2+","+idClient+",'"+current_date+"','"+formatDate(sumarDias(d,3))+' '+hours+':'+minutes+':'+seconds+"',"+1+","+15.6+","+1+","+1+");",(err,rental)=>{
      console.log("Renta "+rental);
      console.log("Error "+err);
      console.log("Devolución "+formatDate(sumarDias(d,3))+' '+hours+':'+minutes+':'+seconds);
      res.redirect("/prestamos/carrito");
    });
  });
  //res.redirect("/prestamos/carrito");

}
function sumarDias(fecha, dias){
  fecha.setDate(fecha.getDate() + dias);
  return fecha;
}
function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
module.exports = controller;
