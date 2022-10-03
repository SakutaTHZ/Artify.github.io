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

var start = 1;

var lastcolumn = 1;
var maxImage = 11;
var end = maxImage;
var ended = false
function GenerateImages() {
	var index = lastcolumn;
	var imageIndex = start;
	var maximum = end;
	if(ended) {
		alert("No more Images to load ;(")
		return;
	}
	var interval = setInterval(() => {
		if(imageIndex == 33) {
			clearInterval(interval)
			ended = true
		}else if(index !== 5 && imageIndex != maximum) {
			var div = document.createElement("div");
			div.classList.add("imageBox");
			div.innerHTML = `
			<img src="images/photos/photo${imageIndex}.jpg">
			<div class="imageDetails">
				<h3>Post Name</h3>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta corrupti nemo ipsam debitis iusto ex facilis quas quia, eos possimus nam nisi fuga magni omnis. Sapiente nobis impedit alias esse.
				</p>
			</div>
			`
			document.querySelector(`#column${index}`).appendChild(div);
			// console.log(index)
			index++;
			imageIndex++;
			lastcolumn = index;
		}else{
			index = 1;
		}
	}, 200);
	
	start = end;
	end = end + maxImage;
	
}
GenerateImages();