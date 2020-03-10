var peliculasCarrito =
  "select a.id_video, b.video_title, c.genre, d.first_name,d.last_name, a.stock, a.unit_cost from video a, video_title b, genre c, actor d, video_genre e, video_actor f where a.id_video = b.id_video and a.id_video = e.id_video and e.id_genre = c.id_genre and a.id_video = f.id_video and f.id_actor = d.id_actor and status=1 and a.stock>0 group by (a.id_video);";
var peliculasCarritoEliminar = "UPDATE video set status=0 where id_video = ?";
var days = "select * from rate;";
const controller = {};
var listCarrito = new Array();
var idClient;
var id_administrador =1;
var loan;
var idCost;
var cantidadPeliculas;
var idRate;
var idDesc=0;
let date_ob = new Date();
let day = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
var current_date = year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;
controller.listCart = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(peliculasCarrito, (err, videoCarrito) => {
      if (err) {
        res.json(err);
      } else {
        conn.query(days, (err, dias) => {
          if (err) {
            res.json(err);
          } else {
            cantidadPeliculas=videoCarrito.length;
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
  var d = new Date();
  req.getConnection((err, conn) => {
    conn.query("select id_client from client where invoice_nit = ?", [nit_number], (err, result) => {
      if (err) {
        res.json(err);
      } else {
        console.log("Cliente id "+result[0].id_client);
        idClient=result[0].id_client;
        req.getConnection((err,conn)=>{
          conn.query(peliculasCarrito,(err,peliculas)=>{
            if(err){
              res.join(err);
            }
            else{
              console.log("Cantidad Películas: "+peliculas.length);
              var idDesc=obteneridDescuento(peliculas.length);
              var desc=obtenerDescuento(peliculas.length);
              console.log("Id descuento: "+idDesc);
              console.log("Descuento: "+desc);
              req.getConnection((err,conn)=>{
                conn.query("SELECT cost FROM rate WHERE time_rate = ?",[loan],(error,costos)=>{
                  if(err){
                    res.json(error);
                    console.log("Error costo tiempo "+ error)
                  }
                  else{
                   console.log("Costo: "+costos[0].cost);
                    var total =totalFinal(peliculas.length,costos[0].cost,desc);
                    console.log("Total: "+total);
                    console.log("Devolución "+formatDate(sumarDias(d,loan))+' '+hours+':'+minutes+':'+seconds);
                    console.log("Días de préstamo "+2);
                    req.getConnection((err,conn)=>{
                      conn.query("SELECT id_rate FROM rate WHERE time_rate = ?",[loan],(err,rates)=>{
                        if(err){
                          res.json(err);
                        }
                        else{
                           console.log("Rate function: "+rates[0].id_rate);
                           req.getConnection((err,conn)=>{
                            conn.query("insert into rental (id_rate, id_client, start_date, devolution_date, id_discount, total, id_rental_status, id_administrator) values ("+rates[0].id_rate+","+result[0].id_client+",'"+current_date+"','"+formatDate(sumarDias(d,loan))+' '+hours+':'+minutes+':'+seconds+"',"+idDesc+","+total+","+1+","+1+");",(err,rental)=>{
                              //console.log("Renta "+rental);
                              console.log(err);
                              //console.log("Devolución "+formatDate(sumarDias(d,3))+' '+hours+':'+minutes+':'+seconds);
                              res.redirect("/prestamos/carrito");
                            });
                             //res.redirect("/prestamos/carrito");
                        });
                           
                        }
                    });
                    });

                  }
              });
              });
            }
          });
      
          
        });
       // insertarRenta(req,res);
       // res.redirect("/prestamos/carrito");
      }
    });
  });
};

function insertarRenta(req,res){
  var d = new Date();
  
  req.getConnection((err,conn)=>{
    conn.query("insert into rental (id_rate, id_client, start_date, devolution_date, id_discount, total, id_rental_status, id_administrator) values ("+idRate+","+idClient+",'"+current_date+"','"+formatDate(sumarDias(d,3))+' '+hours+':'+minutes+':'+seconds+"',"+idDesc+","+total+","+1+","+1+");",(err,rental)=>{
      //console.log("Renta "+rental);
      console.log(err);
      //console.log("Devolución "+formatDate(sumarDias(d,3))+' '+hours+':'+minutes+':'+seconds);
      res.redirect("/prestamos/carrito");
    });
     //res.redirect("/prestamos/carrito");
});
}
function onbtenerCostoTiempo(req,res){
  res.getConnection((err,conn)=>{
    conn.query("SELECT cost FROM rate WHERE time_rate = ?",[loan],(error,costos)=>{
      if(err){
        res.json(error);
        console.log("Error costo tiempo "+ error)
      }
      else{
        
      }
  });
});
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
function obtenerDescuento(cantidad){
  if(cantidad<=5){
    return 0.05;
  }
  else{
    return 0.1;
  }
}
function obteneridDescuento(cantidad){
  if(cantidad<=5){
    return 1;
  }
  else{
    return 2;
  }
}
function obtenerCostoTiempo(req,res){
  req.getConnection((err,conn)=>{
    conn.query("SELECT cost FROM rate WHERE time_rate = ?",[loan],(error,costos)=>{
        if(err){
          res.json(error);
          console.log("Error costo tiempo "+ error)
        }
        else{
         // timeCost=costos[0].cost;
         
        }
    });
  });
}

function obtenerIdTiempo(req,res){
  req.getConnection((err,conn)=>{
    conn.query("SELECT id_rate FROM rate WHERE time_rate = ?",[loan],(err,rates)=>{
        if(err){
          res.json(err);
        }
        else{
           idRate=rates[0].id_rate;
           console.log("Rate function: "+idRate);
           
        }
    });
  });
}
function totalFinal(cantidadCarrito,costoTiempo,descuento){
  return (cantidadCarrito*costoTiempo)-(cantidadCarrito*costoTiempo*descuento);
}
module.exports = controller;
