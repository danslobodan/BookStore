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
		img.style.padding = "10px"
		img.src = book.cover;
		img.alt = book.title;
		img.height = "150";
		
		let title = document.createElement("a");
		title.innerHTML = `${book.title} (${book.year})`;
		title.href = `BookDetails.html?id=${book.id}`;

		let amountInput = document.createElement("input");
		amountInput.style.width = "2em";
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

		let div = document.createElement("div");
		div.id = book.id;
		div.style.padding = "10px";
		div.style.display = "inline-block";
		div.appendChild(title);
		div.appendChild(br());
		div.appendChild(img);
		div.appendChild(price);
		div.appendChild(amountInput);
		div.appendChild(updateAmountButton);
		div.appendChild(br());
		div.appendChild(removeButton);

		return div;
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