var Profile = (function() {

	let set = function(id, value) {
		document.getElementById(id).innerHTML = value;
	}

	return {
		Load : function() {
			let username = sessionStorage.getItem("currentUser");
			let user = Users.Get(username);
			set("username", username);
			set("firstname", user.firstname);
			set("lastname", user.lastname);
		}
	}
})();