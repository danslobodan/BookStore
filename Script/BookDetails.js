var BookDetails = (function() {

	return {
		Load : function () {
			let id = SearchParams.Get('id')
			let books = Persistence.Get("books");
			let book = books[id];
	
			let idEl = document.getElementById("id");
			idEl.innerHTML = id;
			
			let title = document.getElementById("title");
			title.innerHTML = book.title;

			let author = document.getElementById("author");
			author.innerHTML = book.author;
			
			let year = document.getElementById("year");
			year.innerHTML = book.year;

			let img = document.getElementById("image");
			img.src = book.cover;
			img.alt = book.title;
	
			let price = document.getElementById("price");
			price.innerHTML = book.price;
	
			let units = document.getElementById("units");
			units.innerHTML = book.units;
	
			let edit = document.getElementById("edit");
			edit.href = `EditBook.html?id=${id}`;
		},
		Purchase : function() {
			let id = document.getElementById("id").innerHTML;
			let amount = document.getElementById("amount").value;
			if (!Book.Purchase(id, amount)) {
				alert(`Cannot purchase ${amount}. Not enough copies in store.`);
				location.reload();
				return;
			}
	
			window.location.href = "Index.html";
		},
		Remove : function() {
			let id = document.getElementById("id").innerHTML;
			Book.Remove(id);
			window.location.href = "Index.html"
		}
	}
})();