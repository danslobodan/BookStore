var Users = (function() {

	let get = function(id) {

		let users = Persistence.Get("users");
		if (users == undefined)
			return;

		let user = users[id];
		return user;
	}

	let displayError = function(message) {
		let error = document.getElementById("error");
		error.innerHTML = message;
	}

	let login = function(username, password) {
		let user = get(username);
		if (user == undefined) {
			displayError("Username or password not correct.");
			return false;
		}

		if (user.password != password) {
			displayError("Username or password not correct.");
			return false;
		}

		sessionStorage.setItem("currentUser", user.username);
		return true;
	}
	
	return {
		Save : function(form) {
			let user = Form.Serialize(form);
			let existing = get(user.username);
			
			if (existing != undefined) {
				displayError(`Username ${user.username} is taken.`);
				return false;
			}
			
			if (user.password != user.confirm) {
				displayError("Please make sure that your passwords match.");
				return false;
			}
			
			displayError("");
			delete user.confirm;
			Persistence.Add("users", user.username, user);
			login(user.username, user.password);
			return true;
		},
		Update : function(username, user) {
			let users = Persistence.Get("users");
			users[username].firstname = user.firstname;
			users[username].lastname = user.lastname;
			Persistence.Set("users", users);
		},
		UpdatePassword : function(username, user) {

			if (user.password == "") {
				displayError("Please enter new password");
				return false;
			}

			if (user.password != user.confirm) {
				displayError("Please make sure that your new passwords match.");
				return false;
			}

			let users = Persistence.Get("users");
			users[username].password = user.password;
			Persistence.Set("users", users);
			return true;
		},
		Load : function(name, id) {

			let form = document.forms[name];
			if (form == undefined) {
				alert(`Cannot find form ${name}.`);
				return;
			}

			let user = get(id);
			if (user == undefined) {
				alert(`Cannot find user with username ${id}`)
			}
			Form.Deserialize(form, user);
		},
		Get : get,
		Login : login,
		Logout : function() {
			sessionStorage.clear();
		},
		FormLogin : function(form) {
			let user = Form.Serialize(form);
			if (login(user.username, user.password)) {
				displayError("");
				return true;
			}
			
			return false;
		},
		IsLoggedIn : function() {
			let user = sessionStorage.getItem("currentUser");
			return user != undefined;
		},
		SaveAdmin : function(form) {
			
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