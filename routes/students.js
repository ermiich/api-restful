var { Router } = require("express");
var router = Router();

const { executeQuery, readTable } = require("../utils/dbConnection");
const { saveLog } = require("../utils/logs");

const tableName = "students";

function sendError(res, error, message = "") {
	res.status(404).send(message);
	console.error(
		new Date().toLocaleString() +
			" | Result: 404 - READ LOG " +
			saveLog(error.toString())
	);
}

router.get("/", (req, res) => {
	console.log(new Date().toLocaleString() + " | GET | " + tableName);
	readTable(tableName, (error, results) => {
		if (error) {
			sendError(res, error);
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
			sendError(res, error);
		} else {
			res.json(results);
			console.log(new Date().toLocaleString() + " | Result: 200 - OK");
		}
	});
});

router.put("/:id", (req, res) => {
	const studentId = req.params.id;
	console.log(
		new Date().toLocaleString() + " | PUT | ID:" + studentId + " | " + tableName
	);

	const studentData = req.body;
	let nullParams = [];
	if (!studentData.name) nullParams.push("name");
	if (!studentData.email) nullParams.push("email");

	console.log("NullParamVALUE: " + studentData);
	if (nullParams.length == 0) {
		const query =
			"UPDATE " + tableName + " SET name = ?,email = ? WHERE ID LIKE ?";
		const params = [req.body["name"], req.body["email"], req.body[studentId]];
		executeQuery(query, params, (error, results) => {
			if (error) {
				if (error instanceof Error) {
					sendError(res, error);
				}
			} else {
				res.send(results);
				console.log(new Date().toLocaleString() + " | Result: 200 - OK");
			}
		});
	} else {
		res.status(404).send(nullParams.join(","));
	}
});

router.delete("/:id", (req, res) => {
	const studentId = req.params.id;
	console.log(
		new Date().toLocaleString() + " | GET | ID:" + studentId + " | " + tableName
	);

	const query = "DELETE FROM " + tableName + " WHERE ID LIKE ?";
	executeQuery(query, [studentId], (error, results) => {
		if (error) {
			sendError(res, error);
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
					sendError(res, error);
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
