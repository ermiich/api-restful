function generateCardHTML(studentID, studentName, studentEmail) {
	const cardHTML = `
	<div class="card-student" value="${studentID}">
		<div class="card-title">${studentName}</div>
		<div class="card-body">${studentEmail}</div>
			<div class="card-buttons">
					<button class="card-btn-edit" onclick="showEditModal(this)">EDITAR</button>
					<button class="card-btn-delete">ELIMINAR</button>
			</div>
	</div>
	
	`;
	return cardHTML;
}

module.exports = { generateCardHTML };
