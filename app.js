var express = require("express");
var path = require("path");
var app = express();
var PORT = process.env.PORT || 3000;
const fs = require("fs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/reservations", function(req, res) {
    let getReservations = JSON.parse(fs.readFileSync(__dirname + "/db.json"));
    return res.json(getReservations);
});

app.post("/api/reservations", function(req, res) {
    let getReservations = JSON.parse(fs.readFileSync(__dirname + "/db.json"));
    var newReservation = req.body;
    getReservations.push(newReservation);
    fs.writeFileSync(__dirname + "/db.json", JSON.stringify(getReservations));
    return res.json(newReservation);
});

app.listen(PORT, function() {
    console.log("App listening on http://localhost:" + PORT);
});
