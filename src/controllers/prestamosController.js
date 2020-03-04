const controller = {};

var peliculas =
  "select a.id_video, b.video_title, c.genre, d.first_name,d.last_name, a.stock from video a, video_title b, genre c, actor d, video_genre e, video_actor f where a.id_video = b.id_video and a.id_video = e.id_video and e.id_genre = c.id_genre and a.id_video = f.id_video and f.id_actor = d.id_actor and a.stock>0 group by (a.id_video);";
var peliculasGeneros = "SELECT * FROM genre";
var peliculasSearch =
  "select a.id_video, b.video_title, c.genre, d.first_name,d.last_name, a.stock from video a, video_title b, genre c, actor d, video_genre e, video_actor f where a.id_video = b.id_video and a.id_video = e.id_video and e.id_genre = c.id_genre and a.id_video = f.id_video and f.id_actor = d.id_actor and b.video_title = ? and a.stock>0 group by (a.id_video);";
var peliculasByGenre =
  "select a.id_video, b.video_title, c.genre, d.first_name,d.last_name, a.stock from video a, video_title b, genre c, actor d, video_genre e, video_actor f where a.id_video = b.id_video and a.id_video = e.id_video and e.id_genre = c.id_genre and a.id_video = f.id_video and f.id_actor = d.id_actor and c.genre = ? and a.stock>0 group by (a.id_video);";
controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(peliculas, (err, video) => {
      if (err) {
        res.json(err);
      } else {
        conn.query(peliculasGeneros, (err, genre_names) => {
          if (err) {
            res.json(err);
          } else {
            res.render("prestamos", {
              data: video,
              data2: genre_names
            });
          }
        });
      }
    });
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
      conn.query(peliculasSearch, [word], (err, video) => {
        if (err) {
          res.json(err);
        } else {
          conn.query(peliculasGeneros, (err, genre_names) => {
            //console.log(genre_names);\
            if (err) {
              res.json(err);
            } else {
              res.render("prestamos", {
                data: video,
                data2: genre_names
              });
            }
            // res.render("/prestamos");
            // response.send(genre_names);
          });
        }
      });
    } else {
      if (word == "") {
        conn.query(peliculas, (err, video) => {
          if (err) {
            res.json(err);
          }
          conn.query(peliculasGeneros, (err, genre_names) => {
            //console.log(genre_names);\
            if (err) {
              res.json(err);
            }
            res.render("prestamos", {
              data: video,
              data2: genre_names
            });
          });
        });
      }
    }
  });
};
controller.add_card = (req, res) => {
  var { id_video } = req.params;
  req.session.id = id_video;
  console.log(req.session.id);
  res.redirect("/prestamos");
};

controller.searchByGenre = (req, res) => {
  const { genre } = req.params;
  console.log(genre);
  req.getConnection((err, conn) => {
    conn.query(peliculasByGenre, [genre], (err, video) => {
      if (err) {
        res.json(err);
      } else {
        conn.query(peliculasGeneros, (err, genre_names) => {
          if (err) {
            res.json(err);
          } else {
            res.render("prestamos", {
              data: video,
              data2: genre_names
            });
          }
        });
      }
      // res.render("/prestamos");
      // response.send(genre_names);
    });
  });
};

module.exports = controller;
