var peliculasCarrito =
  "select a.id_video, b.video_title, c.genre, d.first_name,d.last_name, a.stock from video a, video_title b, genre c, actor d, video_genre e, video_actor f where a.id_video = b.id_video and a.id_video = e.id_video and e.id_genre = c.id_genre and a.id_video = f.id_video and f.id_actor = d.id_actor and status=1 and a.stock>0 group by (a.id_video);";
var peliculasCarritoEliminar = "UPDATE video set status=0 where id_video = ?";
const controller = {};
var list = new Array();
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
module.exports = controller;
