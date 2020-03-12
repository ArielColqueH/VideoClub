const controller = {};
var peliculas =
  "select a.id_video, b.video_title, c.genre, d.first_name,d.last_name, a.stock from video a, video_title b, genre c, actor d, video_genre e, video_actor f where a.id_video = b.id_video and a.id_video = e.id_video and e.id_genre = c.id_genre and a.id_video = f.id_video and f.id_actor = d.id_actor and status=0 and a.stock>0 group by (a.id_video);";

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(peliculas, (err, video) => {
      if (err) {
        res.json(err);
      } else {
        res.render("prestamosCarritoFactura", {
          data: video
        });
      }
    });
  });
};



// controller.factura = (req, res) => {
//   loan = req.body.d_loan;
//   const nit_number = req.body.nit;
//   var d = new Date();
//   req.getConnection((err, conn) => {
//     conn.query("select id_client from client where invoice_nit = ?", [nit_number], (err, result) => {
//       if (err) {
//         res.json(err);
//       } else {
//         console.log("Cliente id "+result[0].id_client);
//         idClient=result[0].id_client;
//         req.getConnection((err,conn)=>{
//           conn.query(peliculasCarrito,(err,peliculas)=>{
//             if(err){
//               res.join(err);
//             }
//             else{
//               console.log("Cantidad Películas: "+peliculas.length);
//               var idDesc=obteneridDescuento(peliculas.length);
//               var desc=obtenerDescuento(peliculas.length);
//               console.log("Id descuento: "+idDesc);
//               console.log("Descuento: "+desc);
//               req.getConnection((err,conn)=>{
//                 conn.query("SELECT cost FROM rate WHERE time_rate = ?",[loan],(error,costos)=>{
//                   if(err){
//                     res.json(error);
//                     console.log("Error costo tiempo "+ error)
//                   }
//                   else{
//                    console.log("Costo: "+costos[0].cost);
//                     var total =totalFinal(peliculas.length,costos[0].cost,desc);
//                     console.log("Total: "+total);
//                     console.log("Devolución "+formatDate(sumarDias(d,loan))+' '+hours+':'+minutes+':'+seconds);
//                     console.log("Días de préstamo "+2);
//                     req.getConnection((err,conn)=>{
//                       conn.query("SELECT id_rate FROM rate WHERE time_rate = ?",[loan],(err,rates)=>{
//                         if(err){
//                           res.json(err);
//                         }
//                         else{
//                            console.log("Rate function: "+rates[0].id_rate);
//                            req.getConnection((err,conn)=>{
//                             conn.query("insert into rental (id_rate, id_client, start_date, devolution_date, id_discount, total, id_rental_status, id_administrator) values ("+rates[0].id_rate+","+result[0].id_client+",'"+current_date+"','"+formatDate(sumarDias(d,loan))+' '+hours+':'+minutes+':'+seconds+"',"+idDesc+","+total+","+1+","+1+");",(err,rental)=>{
//                               console.log(err);
//                               req.getConnection((err,conn)=>{
//                                 conn.query("SELECT id_rental FROM rental",(err,ids)=>{
//                                   var index  = ids.length;
                                 
//                                   req.getConnection((err,con)=>{
//                                     conn.query("select id_video from video where status =1" ,(err,results)=>{
//                                       if(err){
//                                         console.log(err);
//                                       }else{
//                                         if(results.length>0){
//                                                   for (var i =0;i<results.length;i++){
                                                  
//                                                   req.getConnection((err,conn)=>{
//                                                     console.log("Identificadores" +results[i].id_video);
//                                                     conn.query("INSERT INTO video_rental (id_rental, id_video,quantity) VALUES ("+ids[index-1].id_rental+","+results[i].id_video+",1)",(err,res)=>{
//                                                       console.log("Id renta: "+ids[index-1].id_rental);
                                                      
//                                                       });
//                                                      // console.log("Id renta: "+ids[index-1].id_rental);
//                                                    });
//                                                   }
//                                                   updatevideos(req,res);
//                                                   //res.redirect("prestamosCarritoFactura");
//                                         }
//                                         else{
//                                           res.redirect("/prestamos");
//                                         }
                                  
//                                       }
                                      
//                                     });
//                                   });
//                                 });
//                               });
                              
//                             });
//                              //res.redirect("/prestamos/carrito");
//                         });
                           
//                         }
//                     });
//                     });

//                   }
//               });
//               });
//             }
//           });
      
          
//         });
//        // insertarRenta(req,res);
//        // res.redirect("/prestamos/carrito");
//       }
//     });
//   });
// };


module.exports = controller;
