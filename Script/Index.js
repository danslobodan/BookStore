var Books = (function(){

	let br = function() {
		return document.createElement("br");
	}

	let createBook = function(book) {

		let imageLink = document.createElement("a");
		imageLink.href = `BookDetails.html?id=${book.id}`;

		let img = document.createElement("img");
		img.src = book.cover;
		img.alt = book.title;
		img.classList = "pic";
		imageLink.appendChild(img);

		let price = document.createElement("p");
		price.innerHTML = `$${book.price}`;
		price.id = `price${book.id}`;
		
		let title = document.createElement("a");
		title.innerHTML = `${book.title} (${book.year})`;
		title.href = `BookDetails.html?id=${book.id}`;

		let author = document.createElement("a");
		author.innerHTML = book.author;
		author.href = `Author.html?author=${book.author}`;

		let li = document.createElement("li");
		li.classList = "content";
		li.appendChild(imageLink);
		li.appendChild(br());
		li.appendChild(title);
		li.appendChild(br());
		li.appendChild(author);
		li.appendChild(price);

		return li;
	}

	let load = function(listId) {
		let list = document.getElementById(listId);
		let books = Persistence.Get("books");
		for(let id in books) {
			let li = createBook(books[id]);
			list.appendChild(li);
		}
	}

	return {
		Load : load,
		Filter : function(listId, inputId) {

			let list = document.getElementById(listId);
			let value = document.getElementById(inputId).value
			value = value.toLowerCase();

			let lis = list.getElementsByTagName("li");
			for(let li of lis) {

				li.style.display = "";
				if (value == "")
					continue;

				let title = li.getElementsByTagName("img")[0].alt
				title = title.toLowerCase();
				console.log(title, value);
				if (!title.startsWith(value))
					li.style.display = "none";
			}
		}
	}
})();