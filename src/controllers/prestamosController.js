const controller = {};
controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(
      "select a.id_video, b.video_title, c.genre, d.first_name,d.last_name, a.stock from video a, video_title b, genre c, actor d, video_genre e, video_actor f where a.id_video = b.id_video and a.id_video = e.id_video and e.id_genre = c.id_genre and a.id_video = f.id_video and f.id_actor = d.id_actor and a.stock>0 group by (a.id_video);",
      (err, video) => {
        if (err) {
          res.json(err);
        } else {
          //console.log(actor);
          res.render("prestamos", {
            data: video
          });
        }
      }
    );
  });
};

controller.add = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query("INSERT INTO rental SET ?", [data], (err, rent) => {
      if (err) {
        res.json(err);
      } else {
        console.log(video);
        list.add(video);
        res.redirect("prestamos");
      }
    });
  });
};

controller.search = (req, res) => {
  var word = req.body.word;
  console.log(word);
  req.getConnection((err, conn) => {
    if (word) {
      conn.query(
        "select a.id_video, b.video_title, c.genre, d.first_name,d.last_name, a.stock from video a, video_title b, genre c, actor d, video_genre e, video_actor f where a.id_video = b.id_video and a.id_video = e.id_video and e.id_genre = c.id_genre and a.id_video = f.id_video and f.id_actor = d.id_actor and b.video_title = ? and a.stock>0 group by (a.id_video);",
        [word],
        (err, video) => {
          if (err) {
            res.json(err);
          } else {
            //console.log(actor);
            res.render("prestamos", {
              data: video
            });
          }
        }
      );
    }else{
      if(word==""){
        conn.query(
          "select a.id_video, b.video_title, c.genre, d.first_name,d.last_name, a.stock from video a, video_title b, genre c, actor d, video_genre e, video_actor f where a.id_video = b.id_video and a.id_video = e.id_video and e.id_genre = c.id_genre and a.id_video = f.id_video and f.id_actor = d.id_actor and a.stock>0 group by (a.id_video);",
          (err, video) => {
            if (err) {
              res.json(err);
            } else {
              //console.log(actor);
              res.render("prestamos", {
                data: video
              });
            }
          }
        );
      }
    }
  });
};
module.exports = controller;
