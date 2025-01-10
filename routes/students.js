var { Router } = require("express");
var router = Router();

const { executeQuery, readTable } = require("./dbConnection");

router.get("/", (req, res) => {
	console.log("------------------------------------------");
	console.log(new Date().toLocaleString() + " | GET | students");
	res.json("ARTICULOS");
});

module.exports = router;
