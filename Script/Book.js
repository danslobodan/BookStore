var Book = function() {

	return {
		Save : function(form) {
			let book = Form.Serialize(form);
			Persistence.Add("books", book.id, book);
		},
		Load : function(form, id) {
			let books = Persistence.Get("books");
			if (books == undefined)
				alert("Cannot find the books repository.");

			let book = books[id];
			Form.Deserialize(form, book);
		}
	}
}();