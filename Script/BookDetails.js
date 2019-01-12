var BookDetails = (function() {

	let addToCart = function(id, units) {
		return function() {
			let book = Book.Get(id);
			book.units = units.value;

			if (Cart.Add(book))
				window.location.href = "Index.html";
		}
	}

	let removeBook = function(id) {
		return function() {
			Book.Remove(id);
			window.location.href = "Index.html"
		}
	}

	return {
		Load : function () {

			let id = SearchParams.Get('id')
			let books = Persistence.Get("books");
			let book = books[id];

			let image = Content.domImage(book.cover, book.title);
			imageBox = Content.box(image);
			imageBox.classList = "column image"
			
			let title = document.createElement("p");
			title.innerHTML = `${book.title} (${book.year})`;

			let author = Content.bookAuthor(book);
			let price  = Content.bookPrice(book);
			
			let units = document.createElement("p");
			units.innerHTML = `In store: ${book.units}`;
			
			let textBox = Content.box(title, author, price, units);
			textBox.classList = "row text"
			
			let bookEl = document.getElementById("book");
			bookEl.appendChild(imageBox);
			
			let controlBox = document.createElement("div");
			controlBox.classList = "row controls";

			if (Users.IsAdmin()) {
				let edit = Content.domLink(`EditBook.html?id=${id}`, "Edit");

				let removeButton = document.createElement("button");
				removeButton.innerHTML = "Remove book";
				removeButton.addEventListener("click", removeBook(id));

				controlBox.appendChild(edit);
				controlBox.appendChild(removeButton);
			} else {
				let unitsInput = document.createElement("input");
				unitsInput.id = "units";
				unitsInput.type = "number";
				unitsInput.min = 1;
				unitsInput.max = 99;
				unitsInput.value = 1;
				
				let addButton = document.createElement("button");
				addButton.innerHTML = "Add to cart";
				addButton.addEventListener("click", addToCart(id, unitsInput));

				controlBox.appendChild(unitsInput);
				controlBox.appendChild(addButton);
			}

			let detailsBox = Content.box(textBox, controlBox);
			detailsBox.classList = "column details";
			bookEl.appendChild(detailsBox);
		}
	}
})();