if(getCookie("username") == ""){
	let i = setInterval(() => {
		database.ref("animals/expires").transaction((expires) => {
			if(expires){
				if(getCookie("username") == ""){
					let now = Date.now();
					let period = 24*60*60*1000;
					let new_expire = new Date();
					new_expire.setTime(now+period);
					if(expires){
						for (const [animal, e] of Object.entries(expires)){
							if(e < now){
								expires[animal] = new_expire.getTime();
								setCookie("username", animal, new_expire);
								console.log(getCookie("username")+" has join the room");
								clearInterval(i);
								break;
							}
						}
					}
				}
			}
			return expires;
		});
	}, 200);
}

