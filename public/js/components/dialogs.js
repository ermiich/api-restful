const dialog = document.querySelector("#dialog-edit");
const dialogName = document.querySelector(".dialog-edit-name");
const dialogMail = document.querySelector(".dialog-edit-mail");

function getCardElementFromChild(child) {
	return child.closest(".card-student");
}

function getStudentIdFromCard(cardElement) {
	return cardElement.getAttribute("value");
}

function getDataFromCardChild(cardElement, childSelector) {
	return cardElement.querySelector(childSelector);
}

function showEditModal(invokerElement) {
	const studentCard = getCardElementFromChild(invokerElement);
	const studentId = getStudentIdFromCard(studentCard);
	const studentNameElement = getDataFromCardChild(studentCard, ".card-title");
	const studentMailElement = getDataFromCardChild(studentCard, ".card-body");

	dialogName.setAttribute("placeholder", studentNameElement.textContent);
	dialogMail.setAttribute("placeholder", studentMailElement.textContent);

	dialog.showModal();
	console.log("Editar estudiante con id " + studentId);
}

function closeEditModal() {
	console.log(dialogMail.value);
	dialog.close();
}
