var Books = (function(){

	let box = function(e) {
		let div = document.createElement("div");
		div.appendChild(e);
		return div;
	}

	let domImage = function(src, alt) {
		let img = document.createElement("img");
		img.src = src;
		img.alt = alt;
		return img;
	}

	let domLink = function(href, text) {
		let a = document.createElement("a");
		a.href = href;
		a.innerHTML = text;
		return a;
	}

	let bookImage = function(book) {
		let a = document.createElement("a")
		a.href = `BookDetails.html?id=${book.id}`;
		let image = domImage(book.cover, book.title);
		a.appendChild(image);
		let imageBox = box(a);
		imageBox.classList = "image";
		return imageBox;
	}

	let bookTitle = function(book) {
		let title = domLink(`BookDetails.html?id=${book.id}`,
			`${book.title} (${book.year})`);
		let titleBox = box(title);
		titleBox.classList = "title";
		return titleBox;
	}

	let bookAuthor = function(book) {
		let authorLink = domLink(`Author.html?author=${book.author}`,
			book.author);
		let authorBox = box(authorLink);
		authorBox.classList = "author";
		return authorBox;
	}

	let bookPrice = function(book) {
		let price = document.createElement("p");
		price.innerHTML = `$${book.price}`;
		price.id = `price${book.id}`;
		let priceBox = box(price);
		priceBox.classList = "price";
		return priceBox;
	}

	let createBook = function(book) {

		let image = bookImage(book);

		let title = bookTitle(book);
		let author = bookAuthor(book);
		let price = bookPrice(book);

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
				if (!title.startsWith(value))
					li.style.display = "none";
			}
		}
	}
})();