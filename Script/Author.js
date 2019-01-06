var Author = (function() {

	return {
		Save : function(form) {
			let author = Form.Serialize(form);
			let id = author.firstname.toLowerCase() 
				+ author.lastname.toLowerCase();
			Persistence.Add("authors", id, author);
		},
		Load : function(select, selectedAuthor) {
			let authors = Persistence.Get("authors");
			for(let key in authors) {

				let author = authors[key];
				let value = `${author.firstname} ${author.lastname}`;
				let option = document.createElement("option");

				option.textContent = value;
				option.value = value;
				if (value == selectedAuthor)
					option.selected = true;

				select.appendChild(option);
			}
		}
	}
})();