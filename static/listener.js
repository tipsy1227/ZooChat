database.ref("chatinfo").on("value", (snapshot) => {
	let chats = snapshot.val();
	let chatinfo = "";
	if(chats){
		for (const [hash, chat] of Object.entries(chats)){
			chatinfo += '<a id="'+hash+'-tab" class="list-group-item list-group-item-action d-flex justify-content-between align-items-start" data-bs-toggle="list" href="#'+hash+'-chat" role="tab" aria-controls="'+hash+'-chat" onclick="append_listener(\''+hash+'\')"><div class="px-3 ms-2 me-auto"><div class="text-dark">'+chat["name"]+'</div><small class="text-black-50">'+chat["preview"]+'</small></div><span class="badge bg-primary rounded-pill"></span></a>';
		}
	}

	$("#list-chat").html(chatinfo);
});

database.ref("chatinfo").on("child_added", (chat) => {
	let hash = chat.key;
	let chats = chat.val();
	console.log(chat.val());
	let chatcontent = $("#chat-content").html();
	if(chats){
		chatcontent += '<div class="tab-pane fade" id="'+hash+'-chat" role="tabpanel" aria-labelledby="'+hash+'-chat"><div id="'+hash+'-messagearea" class="mx-3 overflow-auto" style="height: 80vh;"></div><textarea class="mt-3 form-control" id="'+hash+'-textarea" rows="3"></textarea><div><button type="button" class="btn btn-success btn-lg btn-block w-100" onclick="pushMessage(\''+hash+'\')">Send</button></div></div>';
	}

	$("#chat-content").html(chatcontent);
});

function append_listener(chathash){
	console.log("append "+chathash);
	database.ref("chats/"+chathash).on("value", (snapshot) => {
		let messages = snapshot.val();
		let rmessages = "";
		if(messages){
			for (const [hash, message] of Object.entries(messages)){
				rmessages += "<div class='my-5'><img src='static/"+message["name"]+".png' alt='"+message["name"]+"' width='50' height='50'><span class='text-white bg-primary mt-5 p-3 rounded-pill border-bottom border-white'>"+message["content"]+"</span></div>";
			}
			$("#"+chathash+"-messagearea").html(rmessages);
		}
	});

	$("#"+chathash+"-tab").on('hide.bs.tab', function (e) {
		console.log(chathash+" off");
		database.ref("chats/"+chathash).off();
	})
}
