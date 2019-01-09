var AuthorPage = (function() {

	let getSelected = function() {
		let select = document.getElementById("authors");
		let options = select.getElementsByTagName("option");
		for(let option of options) {
			if (option.selected == true)
				return option.value;
		}
	}

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
		price.innerHTML = `Price: ${book.price}$`;
		price.id = `price${book.id}`;
		
		let title = document.createElement("a");
		title.innerHTML = `${book.title} (${book.year})`;
		title.href = `BookDetails.html?id=${book.id}`;

		let li = document.createElement("li");
		li.classList = "content";
		li.id = book.id;
		li.appendChild(img);
		li.appendChild(br());
		li.appendChild(title);
		li.appendChild(br());
		li.appendChild(price);

		return li;
	}

	let loadBooks = function() {
		let ol = document.getElementById("books");
		let books = Persistence.Get("books");
		for(let id in books) {
			let li = createBook(books[id]);
			ol.appendChild(li);
		}
	}

	let filterBooks = function() {
		let selectedAuthor = getSelected();
		let ol = document.getElementById("books");
		let lis = ol.getElementsByTagName("li");
		let books = Persistence.Get("books");
		for(let li of lis) {
			let author = books[li.id].author;
			li.style.display = "";
			if (author != selectedAuthor) {
				li.style.display = "none";
			}
		}
	}

	return {
		Load : function() {
			let selectedAuthor = SearchParams.Get("author");
			let select = document.getElementById("authors");
			Author.Load(select, selectedAuthor);
			loadBooks();
			filterBooks();
		},
		Select : function() {
			filterBooks();
		}
	}
})();