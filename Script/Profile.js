var Profile = (function() {

	let set = function(id, value) {
		document.getElementById(id).innerHTML = value;
	}

	return {
		Load : function(name) {
			let username = sessionStorage.getItem("currentUser");
			let user = Users.Get(username);
			delete user.password;
			let form = document.forms[name];
			Form.Deserialize(form, user);
		},
		Save : function(form) {
			let username = sessionStorage.getItem("currentUser");
			let user = Form.Serialize(form);

			if (user.currentPassword == "" && 
				user.password == "" &&
				user.confirm == "") {
				Users.Update(username, user);
				return true;
			}

			if (!Users.Login(username, user.currentPassword)) {
				document.getElementById("error").innerHTML = 
					"Current password is not correct.";
				return false;
			}

			if (!Users.UpdatePassword(username, user))
				return false;
			
			Users.Update(username, user);
			return true;
		}
	}
})();