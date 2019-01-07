var Navigation = (function(){

	let nav = document.getElementById("nav");

	if (nav == undefined)
		return;
	
	let getLink = function(label, link) {
		let a = document.createElement("a");
		a.href = link;
		a.innerHTML = label;
		a.style.padding = "10px";
		return a;
	}

	let addNav = function(label, link) {
		let a = getLink(label, link);
		nav.appendChild(a);
		return a;
	}

	addNav("Books","Index.html");
	addNav("Authors","Author.html");
	addNav("Profile","Profile.html");

	if (Admins.IsAdmin()) {
		addNav("Add Book","AddBook.html");
		addNav("Add Author","AddAuthor.html");
		addNav("Register Admin","RegisterAdmin.html");				
	}
	else {
		addNav("Cart","Cart.html");
		addNav("Shopping History","ShoppingHistory.html");
	}

	let logoutLink = addNav("Logout","Login.html");
	logoutLink.addEventListener("click", function() {
		sessionStorage.removeItem("currentUser");
	});

})();