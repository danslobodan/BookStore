var Profile = (function() {

	return {
		Load : function(name) {
			let user = Users.GetCurrentUser();
			delete user.password;
			let form = document.forms[name];
			Form.Deserialize(form, user);
		},
		Save : function(form) {
			let user = Form.Serialize(form);
			let username = user.username;

			if (user.currentPassword == "" && 
				user.password == "" &&
				user.confirm == "") {
				Users.Update(user);
				return true;
			}

			if (!Users.Login(username, user.currentPassword)) {
				document.getElementById("error").innerHTML = 
					"Current password is not correct.";
				return false;
			}

			if (!Users.UpdatePassword(user))
				return false;
			
			Users.Update(username, user);
			return true;
		}
	}
})();