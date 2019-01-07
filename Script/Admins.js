var Admins = (function() {

	return {
		Save : function(form) {
			
			if(!Users.Save(form))
				return false;

			let username = document.getElementById("username").value;
			Persistence.Add("admins", username, username);
			return true;
		},
		IsAdmin : function() {
			let admins = Persistence.Get("admins");
			let currentUser = sessionStorage.getItem("currentUser");
			if (admins[currentUser] == currentUser)
				return true;

			return false;
		}
	}
})();