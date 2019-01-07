var Cart = (function() {

	let item = function(book) {
		return {
			id : book.id,
			units : book.units
		}
	}

	return {
		Add : function(book) {
			Persistence.Add("cart", book.id, item(book));
		},
		Remove : function(id) {
			Persistence.Remove("cart", id);
		},
		UpdateAmount : function(id, amount) {
			let cart = Persistence.Get("cart");
			if (!Book.CanPurchase(id, amount)) {
				alert(`Cannot purchase ${amount}. Not enough in store.`);
				return false;
			}

			cart[id].units = amount;
			Persistence.Set("cart", cart);
			return true;
		},
		Checkout : function() {
			let cart = Persistence.Get("cart");
			for(let id in cart) {
				if (!Book.CanPurchase(id, cart[id].units)) {
					alert(`Cannot purchase ${cart[id].units}. Not enough in store.`);
					return false;
				}
			}

			for(let id in cart) {
				Book.Purchase(id, cart[id].units);
			}

			// TODO : add to purchase hitsory
			return true;
		},
		TotalPrice : function() {
			let cart = Persistence.Get("cart");
			let total = 0;
			for(let id in cart) {
				let book = Book.Get(id);
				total += book.price*cart[id].units;
			}
			return total;
		}
	}
})();