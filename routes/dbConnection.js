// Importación de módulos
const mysql = require("mysql");
// Función para crear una conexión a la base de datos
function createConn() {
	return mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "school_db",
	});
}

// Función para leer datos de una tabla
function readTable(tabla, callback) {
	const connection = createConn();

	connection.connect((err) => {
		if (err) {
			//console.error("Error al conectar a la base de datos:", err);
			callback(err, null);
			return;
		}
		//console.log("Conexión exitosa a la base de datos.");

		const query = `SELECT * FROM \`${tabla}\`;`;
		connection.query(query, (err, results) => {
			if (err) {
				//console.error("Error al ejecutar la consulta:", err);
				callback(err, null);
			} else {
				callback(null, results);
			}

			connection.end((endErr) => {
				if (endErr) {
					//console.error("Error al cerrar la conexión:", endErr);
				} else {
					//console.log("Conexión cerrada correctamente.");
				}
			});
		});
	});
}

// Función para ejecutar una consulta personalizada
function executeQuery(query, valores, callback) {
	const connection = createConn();

	connection.connect((err) => {
		if (err) {
			//console.error("Error al conectar a la base de datos:", err);
			callback(err, null);
			return;
		}
		//console.log("Conexión exitosa a la base de datos.");

		connection.query(query, valores, (err, results) => {
			if (err) {
				console.error("Error al ejecutar la consulta:", err);
				callback(err, null);
			} else {
				callback(null, results);
			}

			connection.end((endErr) => {
				if (endErr) {
					console.error("Error al cerrar la conexión:", endErr);
				} else {
					//console.log("Conexión cerrada correctamente.");
				}
			});
		});
	});
}

// Exportar las funciones para uso en otros archivos
module.exports = {
	createConn,
	readTable,
	executeQuery,
};
