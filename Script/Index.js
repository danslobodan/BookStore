var Books = (function(){

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

		let li = document.createElement("li");
		li.appendChild(title);
		li.appendChild(br());
		li.appendChild(img);
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