var Navigation = (function(){
	
	let clickNav = function(event) {
		let nav = event.target;
		sessionStorage.setItem("currentNav", nav.innerHTML);
	}

	let addNav = function(label, link) {
		let a = document.createElement("a");
		a.classList = "navLink";
		a.href = link;
		a.innerHTML = label;
		a.addEventListener("click", clickNav);

		let li = document.createElement("li");
		li.classList = "navItem";

		if (sessionStorage.getItem("currentNav") == label) {
			a.classList += " active";
		}

		li.appendChild(a);
		nav.appendChild(li);

		return li;
	}

	let getUser = 
	function() {
		let user = Users.GetCurrentUser();

		let p = document.createElement("p");
		p.innerHTML = `Hi ${user.firstname}`;
		p.classList = "navLink currentUser";

		let li = document.createElement("li");
		li.classList = "navItem";
		li.appendChild(p);

		return li;
	}

	let nav = document.getElementById("nav");
	nav.classList = "navBar";

	addNav("Books","Index.html");
	addNav("Authors","Author.html");
	
	if (!Users.IsLoggedIn()) {
		addNav("Login","Login.html")
	}
	else {
		addNav("Profile","Profile.html");

		if (Users.IsAdmin()) {
			addNav("Add Book","AddBook.html");
			addNav("Add Author","AddAuthor.html");
			addNav("Register Admin","RegisterAdmin.html");				
		}
		else {
			addNav("Cart","Cart.html");
			addNav("Shopping history","ShoppingHistory.html");
		}
		
		let logoutLink = addNav("Logout","Login.html");
		logoutLink.addEventListener("click", Users.Logout);

		let currentUser = getUser();
		nav.appendChild(currentUser);
	}

})();