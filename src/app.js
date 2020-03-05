const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const bodyParser = require("body-parser");
const app = express();
var session = require("express-session");

//importing routes
const customerRoutes = require("./routes/customer");
const loginRoutes = require("./routes/login");
const clientRoutes = require("./routes/client");
const prestamoRoutes = require("./routes/prestamo");
const devolucionRoutes = require("./routes/devolucion");
const preciosRoutes = require("./routes/precios");
const videoRoutes = require("./routes/videos");
const prestamoCarritoRoutes = require("./routes/prestamo");

("use strict");
const cookieParser = require("cookie-parser");
//settings
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//middleweares
app.use(
  session({
    secret: "1545ddfddcdcx15"
  })
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "",
      port: 3306,
      database: "video_club",
      dateStrings: "date"
    },
    "single"
  )
);
// to support JSON-encoded bodies

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//routes
app.use("/", loginRoutes);
app.use("/prestamos", prestamoRoutes);
app.use("/videos", videoRoutes);
app.use("/prestamos/carrito", prestamoRoutes);
app.use("/devoluciones", devolucionRoutes);
app.use("/clientes", clientRoutes);
app.use("/configuraciones", preciosRoutes);

//static fields
app.use(express.static(path.join(__dirname, "public")));
//starting the server

app.listen(app.get("port"), () => {
  console.log("Server on port 3000");
});
