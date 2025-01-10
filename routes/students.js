var { Router } = require("express");
var router = Router();

const { executeQuery, readTable } = require("./dbConnection");
const tableName = "students";

router.get("/", (req, res) => {
	console.log(new Date().toLocaleString() + " | GET | " + tableName);
	readTable(tableName, (error, results) => {
		if (error) {
			res.status(404).send();
			console.log(new Date().toLocaleString() + " | Result: 404 - ERROR");
		} else {
			res.json(results);
			console.log(new Date().toLocaleString() + " | Result: 200 - OK");
		}
	});
});

router.get("/:id", (req, res) => {
	const studentId = req.params.id;
	console.log(
		new Date().toLocaleString() + " | GET | ID:" + studentId + " | " + tableName
	);

	const query = "SELECT * FROM " + tableName + " WHERE ID LIKE ?";
	executeQuery(query, [studentId], (error, results) => {
		if (error) {
			res.status(404).send();
			console.log(new Date().toLocaleString() + " | Result: 404 - ERROR");
		} else {
			res.json(results);
			console.log(new Date().toLocaleString() + " | Result: 200 - OK");
		}
	});
});

router.delete("/:id", (req, res) => {
	const studentId = req.params.id;
	console.log(
		new Date().toLocaleString() + " | GET | ID:" + studentId + " | " + tableName
	);

	const query = "DELETE FROM " + tableName + " WHERE ID LIKE ?";
	executeQuery(query, [studentId], (error, results) => {
		if (error) {
			res.status(404).send();
			console.log(new Date().toLocaleString() + " | Result: 404 - ERROR");
		} else {
			res.send();
			console.log(new Date().toLocaleString() + " | Result: 200 - OK");
		}
	});
});

router.post("/", (req, res) => {
	console.log(new Date().toLocaleString() + " | POST | " + tableName);
	const newStudent = req.body;
	let error = [];
	if (!newStudent.name) error.push("name");
	if (!newStudent.email) error.push("email");
	if (error.length == 0) {
		const query = "INSERT INTO " + tableName + " (name, email) VALUES (?, ?)";
		executeQuery(
			query,
			[newStudent.name, newStudent.email],
			(error, results) => {
				if (error) {
					res.status(404).send();
					console.log(new Date().toLocaleString() + " | Result: 404 - ERROR");
				} else {
					console.log(new Date().toLocaleString() + " | Result: 200 - OK");
					res.send();
				}
			}
		);
	} else {
		res.status(422).send("Faltan los campos: " + error.join(", "));
	}
});
module.exports = router;
