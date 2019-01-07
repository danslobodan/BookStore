var Users = (function() {

	let get = function(id) {

		let users = Persistence.Get("users");
		if (users == undefined)
			return;

		let user = users[id];
		return user;
	}

	return {
		Save : function(form) {
			let user = Form.Serialize(form);
			Persistence.Add("users", user.username, user);
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
		Login : function(username, password) {
			let user = get(username);
			if (user == undefined)
				return false;

			if (user.password != password)
				return false;

			return true;
		}
	}
})();