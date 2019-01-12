var Content = (function() {

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

	return {
		box : box,
		domLink : domLink,
		bookImage: bookImage,
		bookTitle : bookTitle,
		bookAuthor : bookAuthor,
		bookPrice : bookPrice
	}
})();