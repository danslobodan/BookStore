var Author = (function() {

	let getId = function(author) {
		return `${author.firstname.toLowerCase()}_${author.lastname.toLowerCase()}`;
	}

	return {
		Save : function(form) {
			let author = Form.Serialize(form);
			id = getId(author);
			authors = Persistence.Get("authors");
			if (authors[id] != undefined) {
				alert(`Author ${author.firstname} ${author.lastname} is already added.`);
				return false;
			}

			Persistence.Add("authors", id, author);
			return true;
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