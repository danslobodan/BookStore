var IndexPage = (function(){

	let createBook = function(book) {

		let image = Content.bookImage(book);
		let title = Content.bookTitle(book);
		let author = Content.bookAuthor(book);
		let price = Content.bookPrice(book);

		let textBox = document.createElement("div");
		textBox.classList = "text";
		textBox.appendChild(title);
		textBox.appendChild(author);
		textBox.appendChild(price);

		let li = document.createElement("li");
		li.classList = "content";
		li.appendChild(image);
		li.appendChild(textBox);

		return li;
	}

	return {
		Load : function(listId) {
			let list = document.getElementById(listId);
			let books = Persistence.Get("books");
			for(let id in books) {
				let li = createBook(books[id]);
				list.appendChild(li);
			}
		},
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
				if (!title.startsWith(value))
					li.style.display = "none";
			}
		}
	}
})();