function pushMessage(chathash){
	let textareaid = "#"+chathash+"-textarea";
	let username = getCookie("username");
	let content = $(textareaid).val();
	if(username != undefined && content != ""){
		let message = {
			name: username,
			content: content,
		};

		let hash = database.ref("chats").push().key
		let updates = {};
		updates["chats/"+chathash+"/"+hash] = message;
		updates["chatinfo/"+chathash+"/preview"] = content;
		database.ref().update(updates);
		$(textareaid).val("");
	}
}

