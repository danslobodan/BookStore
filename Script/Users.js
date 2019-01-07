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
				displayError("Please make sure that you password is correct.");
				return false;
			}
			
			displayError("");
			delete user.confirm;
			Persistence.Add("users", user.username, user);
			login(user.username, user.password);
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
		FormLogin : function(form) {
			let user = Form.Serialize(form);
			if (login(user.username, user.password)) {
				displayError("");
				return true;
			}
			
			return false;
		}
	}
})();