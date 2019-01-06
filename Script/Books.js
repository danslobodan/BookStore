var Books = (function(){

	let createBook = function(book) {
		let img = document.createElement("img");
		img.src = book.cover;
		img.alt = book.title;
		
		let title = document.createElement("a");
		title.innerHTML = `${book.title} (${book.year})`;
		title.href = `Book.html?${book.id}`;

		let li = document.createElement("li");
		li.appendChild(title);
		li.appendChild(img);
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

			let books = list.getElementsByTagName("li");
			for(let book of books) {

				book.style.display = "";
				if (value == "")
					continue;

				let title = book.getElementsByTagName("a")[0].innerHTML
				title = title.toLowerCase();
				if (!title.startsWith(value))
					book.style.display = "none";
			}
		}
	}
})();