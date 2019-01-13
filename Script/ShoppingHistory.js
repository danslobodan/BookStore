var ShoppingHistory = (function() {

	let bookUnits = function(units) {
		let p = document.createElement("p");
		p.innerHTML = units;
		let pBox = Content.box(p);
		pBox.classList = "units";
		return pBox;
	}

	let orderTotal = function(total) {
		let p = document.createElement("p");
		p.innerHTML = `Total: $${total}`;
		let totalBox = Content.box(p);
		totalBox.classList = "total";
		return totalBox;
	}

	let boxRow = function() {
		let row = document.createElement("div");
		row.classList += "row his";
		for(let e of arguments) {
			e.classList += " column his";
			row.appendChild(e);
		}
		return row;
	}

	return {
		Load : function() {

			let ol = document.getElementById("history");
			let history = Persistence.Get("history");
			if (history == undefined)
				return;

			let total = 0;
			
			for(let cart of history) {
				let li = document.createElement("li");
				li.classList = "row wrap";

				for(let id in cart) {
					
					let item = cart[id];
					let book = Book.Get(id);
					
					let title = Content.bookTitle(book);
					let author = Content.bookAuthor(book);
					let units = bookUnits(item.units);
					let price = Content.bookPrice(book);
					
					let row = boxRow(title, author, units, price);
					li.appendChild(row);
					
					total += (parseInt(item.units) * parseFloat(item.price));
				}

				let hr = document.createElement("hr");
				li.appendChild(hr);
				
				let totalEl = orderTotal(total);
				let row = boxRow(totalEl);
				row.classList += " total"
				li.appendChild(row);
				ol.appendChild(li);
			}

		}
	}
})();