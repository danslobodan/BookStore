var Book = function() {

	let get = function(id) {
		let books = Persistence.Get("books");
		let book = books[id];
		return book;		
	}

	let canPurchase = function(id, amount) {
		let book = get(id);
		if (book.units < amount)
			return false;

		return true;
	}

	return {
		Save : function(form) {
			let book = Form.Serialize(form);
			let select = document.getElementById("author");
			book.author = select.value;
			Persistence.Add("books", book.id, book);
		},
		Load : function(name, id) {

			let form = document.forms[name];
			if (form == undefined) {
				alert(`Cannot find form ${name}.`);
				return;
			}

			let books = Persistence.Get("books");
			if (books == undefined) {
				alert("Cannot find the books repository.");
				return;
			}

			let book = books[id];
			if (book == undefined) {
				alert(`Cannot find book with id ${id}`);
				return;
			}

			Form.Deserialize(form, book);
			let select = document.getElementById("author");
			Author.Load(select, book.author);
		},
		Get : get,
		CanPurchase : canPurchase,
		Purchase : function(id, amount) {

			if (!canPurchase(id, amount))
				return false;
	
			let book = get(id);
			book.units -= amount;
			Persistence.Add("books", id, book);
			return true;
		},
		Remove(id) {
			let books = Persistence.Get("books");
			
			if (books[id] == undefined)
				return;

			delete books[id];
			Persistence.Set("books", books);
		}
	}
}();