function GenerateUser(){
	let sortedPoint = users.sort((p1, p2) => (p1.points < p2.points) ? 1 : (p1.points > p2.points) ? -1 : 0);
	let sortedCom = users.sort((p1, p2) => (p1.com < p2.com) ? 1 : (p1.com > p2.com) ? -1 : 0);
	for (let i = 1; i <= 4; i++) {
		GenerateContent(users[users.length - i], "newArtists");
		GenerateContent(sortedPoint[i-1], "trendists");
	}
	for (let i = 1; i <= 10; i++) {
		GenerateLeaderBoard(sortedPoint[i-1], i, "top", sortedPoint[i-1].points)
		GenerateLeaderBoard(sortedCom[i-1], i, "most", sortedPoint[i-1].com)
		GenerateLeaderBoard(sortedCom[sortedCom.length - i], i, "least", sortedPoint[sortedCom.length - i].com)
	}
	
}
GenerateUser();

function GenerateContent(data, parent) {
	var sample = document.createElement("div");
	sample.classList.add("artistCard");
	sample.innerHTML = `
	<div class="coverBox">
		<img src="${data.favImg}" alt="cover" class="coverPhoto">
	</div>
	<div class="profileBox">
		<img src="${data.profileImg}" alt="profile">
		<span class="${data.status}"></span>
	</div>
	<h5>${data.name}</h5>
	<div class="artistCardRow">
		Images Uploaded - <span>${data.imageUpload}</span>
	</div>
	<div class="artistCardRow">
		Commissions done - <span>${data.comFin}</span>
	</div>
	<button>Check more ...</button>
	`
	document.querySelector(`.${parent}`).appendChild(sample)
}

function GenerateLeaderBoard(data, index, parent, important) {
	var sample = document.createElement("div");
	sample.classList.add("dataTableRow");
	sample.innerHTML = `
	<div class="dataTableColumn dataTableColumn1">
		${index}
	</div>
	<div class="dataTableColumn dataTableColumn2">
		${data.name}
	</div>
	<div class="dataTableColumn dataTableColumn3">
		${data.rating} stars
	</div>
	<div class="dataTableColumn dataTableColumn4">
		${important}
	</div>
	`
	document.querySelector(`.${parent}`).appendChild(sample);
}

function change(changeTo) {
	changeActive(changeTo);
	switch(changeTo) {
		case "top":
			document.querySelector(".most").style.display = "none"
			document.querySelector(".least").style.display = "none"
			document.querySelector(".top").style.display = "block"
		  // code block
		  break;
		case "most":
			document.querySelector(".top").style.display = "none"
			document.querySelector(".least").style.display = "none"
			document.querySelector(".most").style.display = "block"
		  // code block
		  break;
		case "least":
			document.querySelector(".top").style.display = "none"
			document.querySelector(".most").style.display = "none"
			document.querySelector(".least").style.display = "block"
		  // code block
	  }
}
function changeActive(changeTo) {
	var buttons = document.querySelectorAll(".view-button");
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].classList.remove("active");
	}
	document.querySelector(`.${changeTo}button`).classList.add("active")
}
change("top")