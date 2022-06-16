function pushChat(name){
	let chatInfo = {
		name: $("#chat-name").val(),
		preview: "",
	};

	let hash = database.ref("chatinfo").push().key
	let updates = {};
	updates["chatinfo/"+hash] = chatInfo;
	database.ref().update(updates);
}

const myModal = document.getElementById('chatModal')
const myInput = document.getElementById('chat-btn')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})
