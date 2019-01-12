var Cart = (function() {

	let item = function(book) {
		return {
			id : book.id,
			units : book.units
		}
	}

	return {
		Add : function(book) {
			let id = book.id;
			let units = parseInt(book.units);
			
			let cart = Persistence.Get("cart");
			let cartItem = cart[id];

			if (cartItem != undefined && cartItem.units != undefined)
				units += parseInt(cartItem.units);

			if (!Book.CanPurchase(id, units)) {
				alert(`Cannot purchase ${units}. Not enough in store.`);
				return false;
			}
			
			book.units = units;
			Persistence.Add("cart", book.id, item(book));
			return true;
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
			
			let history = Persistence.Get("history");
			if (history == undefined)
			history = [];
			
			history.push(cart);
			Persistence.Set("history", history);

			cart = {};
			Persistence.Set("cart", cart);

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