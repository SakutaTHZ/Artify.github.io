function GeneratePosts() {
	var CheckIfTheresPoll = (poll) => {
		var totalAmountOfPollResult = 0;
		for (let i = 0; i < poll.length; i++) {
			totalAmountOfPollResult+=poll[i].value
		}
		if(poll.length === 0) {
			return " ";
		}
		var context = "";
		for (let i = 0; i < poll.length; i++) {
			var calculate = Math.round((poll[i].value / totalAmountOfPollResult) * 100)
			if(poll !== []) {
				context += `
					<div>
						<span class="lable">${poll[i].label}</span>
						<span>
							${calculate}% <progress value="${calculate}" max="100"></progress>
						</span>
					</div>
				`;
				if(i == poll.length-1) {
					return `<form class="poll">` + context + `</form>`;
				}
			}	
		}
	}
	let shuffled = posts
	.map(value => ({ value, sort: Math.random() }))
	.sort((a, b) => a.sort - b.sort)
	.map(({ value }) => value);
	shuffled.forEach(element => {
		
		var post = document.createElement("div");
		post.classList.add(`post`)
		post.classList.add(`post${element.postId}`)
		var Sample = `
			<div class="head">
				<img src="${element.op.profileImg}" alt="">
				<p>${element.op.name}</p>
				<span class="follow">Sub</span>
			</div>
			<div class="body">
				<p>
					${element.details.text}
				</p>
				${
					CheckIfTheresPoll(element.details.poll)
				}
				
			</div>
			<div class="foot">
				<button class="like" onclick="addLike(${element.postId},1)">
					<span class="likeCount">${element.details.like}</span> Likes
				</button>
				<button onclick="OpenComment(${element.postId})">
					<span class="commentCount">${element.details.comments.length}</span>
					comments
				</button>
			</div>
		`;
		post.innerHTML = Sample;
		document.querySelector(".newsfeed").appendChild(post)
	});
}
GeneratePosts();

function OpenComment(id) {
	var fetchAllComment = () => {
		if(posts[id-1].details.comments.length === 0) {
			return " ";
		}
		var comments = "";
		for (let i = 0; i < posts[id-1].details.comments.length; i++) {
			comments += `
			<div class="comment comment${i}">
				<img src="${posts[id-1].details.comments[i].user.profileImg}" alt="">
				<p>${posts[id-1].details.comments[i].context}</p>
				<div class="commentReaction">
					<button class="commentbutt1" onclick="commentLike(${i}, ${id}, 1, 1)">like</button>
					<span class="commentLike">${posts[id-1].details.comments[i].like}</span>
					<button class="commentbutt2" onclick="commentLike(${i}, ${id}, -1, 2)">dislike</button>
				</div>
			</div>
			`
			if(i == posts[id-1].details.comments.length-1) {
				return comments;
			}
		}
	}
	var comment = document.createElement("div");
	comment.classList.add("comments");
	var sample = `
	<div class="userComment">
		<input type="text" placeholder="Comment here ...">
		<button class="commentButton" onclick="PostComment(${id})">></button>
	</div>
	${
		fetchAllComment()
	}
	`
	comment.innerHTML = sample;
	if(document.querySelector(`.post${id}`).querySelector(".comment") !== undefined) {
		var allComments = document.querySelectorAll(".comment");
		var alluserComment = document.querySelectorAll(".userComment");
		for (let i = 0; i < allComments.length; i++) {
			allComments[i].remove();
		}
		for (let i = 0; i < alluserComment.length; i++) {
			alluserComment[i].remove();
		}
		document.querySelector(`.post${id}`).appendChild(comment)
	}else {
		var allComments = document.querySelector(`.post${id}`).querySelectorAll(".comment");
		document.querySelector(`.post${id}`).querySelector(`.userComment`).remove();
		for (let i = 0; i < allComments.length; i++) {
			allComments[i].remove();
		}
	}
	
}

function addLike(id,num){
	if(document.querySelector(`.post${id}`).querySelector(".like").classList.contains("clicked")){
		posts[id-1].details.like -= num;
		document.querySelector(`.post${id}`).querySelector(".likeCount").innerHTML = posts[id-1].details.like;
		document.querySelector(`.post${id}`).querySelector(".like").classList.remove("clicked");
	}else{
		console.log("plus");
		posts[id-1].details.like += num;
		document.querySelector(`.post${id}`).querySelector(".likeCount").innerHTML = posts[id-1].details.like;
		document.querySelector(`.post${id}`).querySelector(".like").classList.add("clicked");
	}
}
function commentLike(commentId, postId, operator, buttonClickedId){
	buttonClickedId == 1 ? document.querySelector(`.comment${commentId}`).querySelector(`.commentbutt${2}`).disabled = true : document.querySelector(`.comment${commentId}`).querySelector(`.commentbutt${1}`).disabled = true
	if(!document.querySelector(`.comment${commentId}`).querySelector(`.commentbutt${buttonClickedId}`).classList.contains("lclicked")) {
		posts[postId-1].details.comments[commentId].like += operator;
		document.querySelector(`.comment${commentId}`).querySelector(`.commentLike`).innerHTML = posts[postId-1].details.comments[commentId].like;
		document.querySelector(`.comment${commentId}`).querySelector(`.commentbutt${buttonClickedId}`).classList.add("lclicked")
	}else {
		posts[postId-1].details.comments[commentId].like -= operator;
		document.querySelector(`.comment${commentId}`).querySelector(`.commentLike`).innerHTML = posts[postId-1].details.comments[commentId].like;
		document.querySelector(`.comment${commentId}`).querySelector(`.commentbutt${buttonClickedId}`).classList.remove("lclicked")
		document.querySelector(`.comment${commentId}`).querySelector(`.commentbutt${1}`).disabled = false
		document.querySelector(`.comment${commentId}`).querySelector(`.commentbutt${2}`).disabled = false
	}
	
}

var messageCooldownSeconds = 0;

function PostComment(postId) {
	if(document.querySelector(`.post${postId}`).querySelector("input").value == "") {
		Cooldown(`Add something in the comment box`, "err");
		return;
	}else if(messageCooldownSeconds !== 0) {
		return;
	}
	var context = document.querySelector(`.post${postId}`).querySelector("input").value;
	posts[postId-1].details.comments.push({user: GetCurrentUser, context: context, like: 0})
	var div = document.createElement("div");
	div.classList.add("comments")
	var sample = `
	<div class="comment comment${posts[postId-1].details.comments.length}">
		<img src="${posts[postId-1].details.comments[posts[postId-1].details.comments.length-1].user.profileImg}" alt="">
		<p>${posts[postId-1].details.comments[posts[postId-1].details.comments.length-1].context}</p>
		<div class="commentReaction">
			<button class="commentbutt1" onclick="commentLike(${posts[postId-1].details.comments.length-1}, ${postId}, 1, 1)">like</button>
			<span class="commentLike">${posts[postId-1].details.comments[posts[postId-1].details.comments.length-1].like}</span>
			<button class="commentbutt2" onclick="commentLike(${posts[postId-1].details.comments.length-1}, ${postId}, -1, 2)">dislike</button>
		</div>
	</div>
	`
	div.innerHTML = sample;
	document.querySelector(`.post${postId}`).appendChild(div);
	messageCooldownSeconds = 60;
	
	Cooldown(`Please wait ; seconds for another comment`, "var");
}

var Cooldown = (message, type) => {
	var span = document.createElement("span")
	span.classList.add("cooldown");
	span.innerHTML = "hmmmmmmmmmmm";
	document.body.appendChild(span)
	if(type == "err") {
		console.log(message)
		span.innerHTML = message;
		setTimeout(() => {
			span.style.left = -2000 + "px"
			setTimeout(() => {
				span.remove()
			}, 400)
		}, 1000)
		return;
	}
	var interval = setInterval(() => {
		
		if(messageCooldownSeconds != 0) {
			document.querySelector(".cooldown").style.left = 0 + "px"
			if(type == "var") {
				span.innerHTML = message.replace(";", messageCooldownSeconds);
			}
			
			messageCooldownSeconds--;
		}else {
			span.style.left = -2000 + "px"
			setTimeout(() => {
				span.remove()
			}, 400)
			clearInterval(interval)
		}
		
	}, 1000)
}