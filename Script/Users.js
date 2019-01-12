var Users = (function() {

	if (Persistence.Get("users") == undefined) {
		let admin = {
			firstname : "Slobodan",
			lastname : "Dan",
			username : "admin",
			password : "admin",
			isAdmin : true
		}
		Persistence.Add("users", admin.username, admin);
	}

	let get = function(username) {

		let users = Persistence.Get("users");
		if (users == undefined)
			return;

		let user = users[username];
		return user;
	}

	let getCurrentUser = function() {
		let username = sessionStorage.getItem("currentUser");
		if (username == undefined)
			return;

		let user = get(username)
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

	let save = function(form, isAdmin) {
		let user = Form.Serialize(form);
		user.isAdmin = isAdmin;

		let existing = get(user.username);
		
		if (existing != undefined) {
			displayError(`Username ${user.username} is taken.`);
			return false;
		}
		
		if (user.password != user.confirm) {
			displayError("Please make sure that your passwords match.");
			return false;
		}
		
		delete user.confirm;
		Persistence.Add("users", user.username, user);
		login(user.username, user.password);
		return true;
	}
	
	return {
		Save : function(form) { save(form, false); },
		SaveAdmin : function(form) { save(form, true); },
		Update : function(user) {
			let users = Persistence.Get("users");
			let username = user.username;
			users[username].firstname = user.firstname;
			users[username].lastname = user.lastname;
			Persistence.Set("users", users);
		},
		UpdatePassword : function(user) {

			if (user.password == "") {
				displayError("Please enter new password");
				return false;
			}

			if (user.password != user.confirm) {
				displayError("Please make sure that your new passwords match.");
				return false;
			}

			let users = Persistence.Get("users");
			users[user.username].password = user.password;
			Persistence.Set("users", users);
			return true;
		},
		Load : function(name, username) {

			let form = document.forms[name];
			let user = get(username);
			Form.Deserialize(form, user);
		},
		Get : get,
		GetCurrentUser : getCurrentUser,
		Login : login,
		Logout : function() {
			sessionStorage.clear();
		},
		FormLogin : function(form) {
			let user = Form.Serialize(form);
			if (login(user.username, user.password))
				return true;
			
			return false;
		},
		IsLoggedIn : function() {
			let user = getCurrentUser();
			return user != undefined;
		},
		IsAdmin : function() {
			let user = getCurrentUser();
			if (user != undefined && user.isAdmin == true)
				return true;

			return false;
		}
	}
})();