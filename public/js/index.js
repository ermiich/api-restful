function addCards(studentsJSON) {
	const container = document.querySelector(".container-students");
	studentsJSON.forEach((student) => {
		const card = generateCardHTML(
			student["id"],
			student["name"],
			student["email"]
		);
		container.innerHTML += card;
	});
}
fetch("/api/students")
	.then((response) => response.json())
	.then((data) => {
		addCards(data);
	});
