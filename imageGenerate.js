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
				<div class="uploader" title="username">
					<img src="images/photos/photo${imageIndex}.jpg" alt="profile" class="profile">
				</div>
				<img src="images/photos/photo${imageIndex}.jpg">
				<div class="imageDetails">
					<h3>Testing the header</h3>
					<p>by username</p>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta corrupti nemo ipsam debitis iusto ex facilis quas quia, eos possimus nam nisi fuga magni omnis. Sapiente nobis impedit alias esse.
					</p>
					<div class="reactions">
						<button class="like upvote"><span class="goodreactCount">1k</span> Like</button>
						<button class="like downvote"><span class="badreactCount">?</span> Dislike</button>
					</div>
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