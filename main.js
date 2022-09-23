//hunted list buttons

let list = document.querySelectorAll('.list');
let onclick = 0;

for(let i=0; i<list.length; i++){
    list[i].onmouseover = function(){
        let j = 0;
        while(j<list.length){
            list[j++].className = 'list';
        }
        list[i].className = 'list active';
    }
	list[i].onclick = function(){
		onclick = i;
	}
}

setInterval(
	function () {
		for(let i=0; i<list.length; i++){
		        let j = 0;
		        while(j<list.length){
		            list[j++].className = 'list';
		        }
		        list[onclick].className = 'list active';
		}
	}
, 2000);

// Exit and open login menu
function Exit(item) {
	document.querySelector(`.${item}`).style.opacity = "0%";
	setTimeout(() => {
		document.querySelector(`.${item}`).style.display = "none";
		// document.querySelector(`.${item}Box`).style.animation = "none";
	}, 500)
}
function Open(item) {
	// document.querySelector(`.${item}Box`).style.animation = "enter 0.2s";
	document.querySelector(`.${item}`).style.opacity = "100%";
	document.querySelector(`.${item}`).style.display = "flex";
}

// Show password
function showPassword(ps) {
	var x = document.getElementById(`${ps}`);
	if (x.type === "password") {
	  x.type = "text";
	} else {
	  x.type = "password";
	}
}

//switch login and signup
function switchSides(where){
	if(where == 'login'){
		document.getElementById(`login`).style.display = "flex";
		document.getElementById(`signup`).style.display = "none";
	}else if(where == 'signup'){
		document.getElementById(`signup`).style.display = "flex";
		document.getElementById(`login`).style.display = "none";
	}
}