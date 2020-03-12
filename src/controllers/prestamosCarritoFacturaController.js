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
module.exports = controller;
