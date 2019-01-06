var AddBook = function() {

	return {
		Save : function(form) {
			let book = Form.Serialize(form);
			Persistence.Add("books", book.id, book);
		}
	}
}();