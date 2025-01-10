const fs = require("node:fs");

function saveLog(content) {
	try {
		let fileName = "LOG_" + new Date().getTime() + ".txt";
		let folder = "logs/";
		if (fs.existsSync(folder)) {
			fs.writeFileSync(folder + fileName, content);
		} else {
			fs.mkdirSync(folder);
			fs.writeFileSync(folder + fileName, content);
		}
		return fileName;
	} catch (err) {
		console.error(err);
	}
}

module.exports = { saveLog };
