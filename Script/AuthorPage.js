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
		let img = document.createElement("img");
		img.src = book.cover;
		img.alt = book.title;
		img.height = "150";

		let price = document.createElement("p");
		price.innerHTML = `Price: ${book.price}$`;
		price.id = `price${book.id}`;
		
		let title = document.createElement("a");
		title.innerHTML = `${book.title} (${book.year})`;
		title.href = `BookDetails.html?id=${book.id}`;

		let div = document.createElement("div");
		div.style.float = "left";
		div.style.padding = "10px";
		div.id = book.id;
		div.appendChild(title);
		div.appendChild(br());
		div.appendChild(img);
		div.appendChild(price);

		return div;
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
		let divs = ol.getElementsByTagName("div");
		let books = Persistence.Get("books");
		for(let div of divs) {
			let author = books[div.id].author;
			div.style.display = "";
			if (author != selectedAuthor) {
				div.style.display = "none";
			}
		}
	}

	let updateHeading = function() {
		let selectedAuthor = getSelected();
		let heading = document.getElementById("author");
		heading.innerHTML = selectedAuthor;
	}

	return {
		Load : function() {
			let selectedAuthor = SearchParams.Get("author");
			let select = document.getElementById("authors");
			Author.Load(select, selectedAuthor);
			updateHeading();
			loadBooks();
			filterBooks();
		},
		Select : function() {
			updateHeading();
			filterBooks();
		}
	}
})();