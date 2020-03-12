var peliculasCarrito =
  "select a.id_video, b.video_title, c.genre, d.first_name,d.last_name, a.stock, a.unit_cost from video a, video_title b, genre c, actor d, video_genre e, video_actor f where a.id_video = b.id_video and a.id_video = e.id_video and e.id_genre = c.id_genre and a.id_video = f.id_video and f.id_actor = d.id_actor and status=1 and a.stock>0 group by (a.id_video);";
var peliculasCarritoEliminar = "UPDATE video set status=0 where id_video = ?";
var days = "select * from rate;";
const controller = {};
var idClient;
var loan;
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

controller.calculosFactura = (req, res) => {
  //loan = req.body.d_loan;
  //const nit_number = req.body.nit;
  loan = 3;
  const nit_number = 11212312;
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
                            conn.query("insert into rental (id_rate, id_client, start_date, devolution_date, id_discount, total, id_rental_status, id_administrator) values ("+rates[0].id_rate+","+result[0].id_client+",'"+current_date+"','"+formatDate(sumaFecha(loan,day+'-'+month+'-'+year))+' '+hours+':'+minutes+':'+seconds+"',"+idDesc+","+total+","+1+","+1+");",(err,rental)=>{
                              console.log(err);
                              req.getConnection((err,conn)=>{
                                conn.query("SELECT id_rental FROM rental",(err,ids)=>{
                                  var index  = ids.length;
                                 
                                  req.getConnection((err,con)=>{
                                    conn.query("select id_video from video where status =1" ,(err,results)=>{
                                      if(err){
                                        console.log(err);
                                      }else{
                                        if(results.length>0){
                                                  for (var i =0;i<results.length;i++){
                                                  
                                                  req.getConnection((err,conn)=>{
                                                    console.log("Identificadores" +results[i].id_video);
                                                    conn.query("INSERT INTO video_rental (id_rental, id_video,quantity) VALUES ("+ids[index-1].id_rental+","+results[i].id_video+",1)",(err,res)=>{
                                                      console.log("Id renta: "+ids[index-1].id_rental);
                                                      
                                                      });
                                                     console.log("Id renta: "+ids[index-1].id_rental);
                                                   });
                                                  }
                                                  updatevideos(req,res);
                                                  res.redirect("prestamos/carrito/factura");
                                        }
                                        else{
                                          res.redirect("prestamos/carrito/factura");
                                        }
                                  
                                      }
                                      
                                    });
                                  });
                                });
                              });
                              
                            });
                            res.redirect("prestamos/carrito/factura");
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
       insertarRenta(req,res);
       res.redirect("/prestamos/carrito");
      }
    });
  });
};

controller.total = (req, res) => {
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
                    res.render("prestamosCarrito", {
                      tot: total
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
function updatevideos(req,res){
  req.getConnection((err,conn)=>{
    conn.query("SELECT id_video FROM video WHERE status = 1",(error,results)=>{
        if(err){
          
        }
        else{
          if(results.length>0){
            for (var  i =0;i<results.length;i++){
              req.getConnection((err,conn)=>{
                conn.query("UPDATE video SET stock = stock -1,  status = 0 WHERE id_video =?",results[i].id_video,(err,res)=>{
                  if(err){
                    res.json(err);
                  }
                  else{
                    res.redirect("/prestamos/carrito/factura"); 
                  }
                });
             });
            }
            res.redirect("/prestamos");
          }
          else{
            res.redirect("/prestamos");
          }
         // timeCost=costos[0].cost;
         
        }
    });
  });
}
sumaFecha = function(d, fecha)
{
 var Fecha = new Date();
 var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() +1) + "/" + Fecha.getFullYear());
 var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
 var aFecha = sFecha.split(sep);
 var fecha = aFecha[2]+'/'+aFecha[1]+'/'+aFecha[0];
 fecha= new Date(fecha);
 fecha.setDate(fecha.getDate()+parseInt(d));
 var anno=fecha.getFullYear();
 var mes= fecha.getMonth()+1;
 var dia= fecha.getDate();
 mes = (mes < 10) ? ("0" + mes) : mes;
 dia = (dia < 10) ? ("0" + dia) : dia;
 var fechaFinal = dia+sep+mes+sep+anno;
 return (fechaFinal);
 }
function totalFinal(cantidadCarrito,costoTiempo,descuento){
  return (cantidadCarrito*costoTiempo)-(cantidadCarrito*costoTiempo*descuento);
}
module.exports = controller;
