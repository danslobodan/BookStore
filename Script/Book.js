var Book = function() {

	return {
		Save : function(form) {
			let book = Form.Serialize(form);
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
				return
			}

			let book = books[id];
			if (book == undefined) {
				alert(`Cannot find book with id ${id}`);
				return;
			}

			Form.Deserialize(form, book);
		}
	}
}();