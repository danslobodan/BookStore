var CartPage = (function(){

	let br = function() {
		return document.createElement("br");
	}

	let removeItem = function(id) {
		let li = document.getElementById(id);
		let ol = document.getElementById("cart");
		ol.removeChild(li);
		Cart.Remove(id);
	}

	let updatePrice = function(id, amount) {
		let price = document.getElementById(`price${id}`);
		let book = Book.Get(id);
		price.innerHTML = `Price: ${book.price*amount}$`;
	}

	let updateAmount = function(id) {
		let amount = document.getElementById(`units${id}`).value;
		if(Cart.UpdateAmount(id, amount)) {
			updatePrice(id, amount);
			updateTotalPrice();
		}
	}

	let updateTotalPrice = function() {
		let totalEl = document.getElementById("totalPrice");
		totalEl.innerHTML = Cart.TotalPrice();
	}

	let createItem = function(book, units) {
		
		let img = document.createElement("img");
		img.src = book.cover;
		img.alt = book.title;
		img.height = "150";
		
		let title = document.createElement("a");
		title.innerHTML = `${book.title} (${book.year})`;
		title.href = `BookDetails.html?id=${book.id}`;

		let amountInput = document.createElement("input");
		amountInput.id = `units${book.id}`;
		amountInput.name = "units";
		amountInput.type = "number";
		amountInput.min = "1";
		amountInput.value = units;

		let price = document.createElement("p");
		price.innerHTML = `Price: ${book.price*units}$`;
		price.id = `price${book.id}`;

		let updateAmountButton = document.createElement("button");
		updateAmountButton.innerHTML = "Update Amount";
		updateAmountButton.addEventListener("click", function() { updateAmount(book.id); });

		let removeButton = document.createElement("button");
		removeButton.innerHTML = "Remove";
		removeButton.addEventListener("click", function() { removeItem(book.id); });

		let li = document.createElement("li");
		li.id = book.id;
		li.appendChild(title);
		li.appendChild(br());
		li.appendChild(img);
		li.appendChild(price);
		li.appendChild(amountInput);
		li.appendChild(updateAmountButton);
		li.appendChild(removeButton);

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