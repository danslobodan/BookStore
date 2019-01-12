var CartPage = (function(){

	let removeItem = function(id) {
		return function() {
			let li = document.getElementById(id);
			let ol = document.getElementById("cart");
			ol.removeChild(li);
			Cart.Remove(id);
		}
	}
	
	let updateTotalPrice = function() {
		let totalEl = document.getElementById("totalPrice");
		totalEl.innerHTML = Cart.TotalPrice();
	}

	let updateAmount = function(id) {
		return function() {
			let amount = document.getElementById(`units${id}`).value;
			if(Cart.UpdateAmount(id, amount)) {
				updateTotalPrice();
			}
		}
	}

	let createItem = function(book, units) {
		
		let title = Content.bookTitle(book);
		let author = Content.bookAuthor(book);
		
		let textBox = Content.box(title, author);
		textBox.classList = "column text";

		let price = Content.bookPrice(book);
		let priceBox = Content.box(price);
		priceBox.classList = "column price"
		
		let image = Content.bookImage(book);
		let imageBox = Content.box(image);
		imageBox.classList = "column image";
		
		let amountInput = document.createElement("input");
		amountInput.id = `units${book.id}`;
		amountInput.name = "units";
		amountInput.type = "number";
		amountInput.min = "1";
		amountInput.max = "99";
		amountInput.value = units;
		
		let updateAmountButton = document.createElement("button");
		updateAmountButton.innerHTML = "Update Amount";
		updateAmountButton.addEventListener("click", updateAmount(book.id));

		let amountBox = Content.box(amountInput, updateAmountButton);
		amountBox.classList = "amount";
		
		let removeButton = document.createElement("button");
		removeButton.innerHTML = "Remove";
		removeButton.addEventListener("click", removeItem(book.id));
		let removeBox = Content.box(removeButton);
		removeBox.classList = "remove";

		let controlBox = Content.box(amountBox, removeBox);
		controlBox.classList = "column control";
		
		let li = document.createElement("li");
		li.classList = "content";
		li.id = book.id;
		li.appendChild(imageBox);
		li.appendChild(textBox);
		li.appendChild(priceBox);
		li.appendChild(controlBox);

		return li;
	}
	
	return {
		Load : function() {
			
			let cartEl = document.getElementById("cart");
			let cart = Persistence.Get("cart");
	
			for(let id in cart) {
				let item = cart[id];
				let book = Book.Get(id);
				let li = createItem(book, item.units);
				cartEl.appendChild(li);
			}

			updateTotalPrice();
		}
	}
})();