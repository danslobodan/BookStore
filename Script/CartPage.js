var CartPage = (function(){

	let newLine = function() {
		return document.createElement("br");
	}

	let removeItem = function(id) {
		let li = document.getElementById(id);
		let ol = document.getElementById("cart");
		ol.removeChild(li);
		Cart.Remove(id);
	}

	let updateAmount = function(id) {
		let li = document.getElementById(id);
		let amount = li.getElementsByTagName("input")[0].value;
		Cart.UpdateAmount(id, amount);
	}

	let createItem = function(book) {
		
		let img = document.createElement("img");
		img.src = book.cover;
		img.alt = book.title;
		
		let title = document.createElement("a");
		title.innerHTML = `${book.title} (${book.year})`;
		title.href = `BookDetails.html?id=${book.id}`;

		let amountInput = document.createElement("input");
		amountInput.name = "units";
		amountInput.type = "number";
		amountInput.min = "1";
		amountInput.value = book.units;

		let updateAmountButton = document.createElement("button");
		updateAmountButton.innerHTML = "Update Amount";
		updateAmountButton.addEventListener("click", function() { updateAmount(book.id); });

		let removeButton = document.createElement("button");
		removeButton.innerHTML = "Remove";
		removeButton.addEventListener("click", function() { removeItem(book.id); });

		let li = document.createElement("li");
		li.id = book.id;
		li.appendChild(title);
		li.appendChild(newLine());
		li.appendChild(img);
		li.appendChild(newLine());
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
				let book = cart[id];
				let li = createItem(book);
				cartEl.appendChild(li);
			}
		}
	}
})();