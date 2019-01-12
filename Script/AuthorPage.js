var AuthorPage = (function() {

	let createBook = function(book) {

		let image = Content.bookImage(book);
		let title = Content.bookTitle(book);
		let price = Content.bookPrice(book);

		let textBox = Content.box(title, price);
		textBox.classList = "text";

		let li = document.createElement("li");
		li.id = book.id;
		li.classList = "content";
		li.appendChild(image);
		li.appendChild(textBox);

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

	let getSelected = function() {
		let select = document.getElementById("authors");
		let options = select.getElementsByTagName("option");
		for(let option of options) {
			if (option.selected == true)
				return option.value;
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