var Persistence = (function() {

	if (typeof(Storage) === "undefined") {
		alert("Object persistence is unavailable in this browser");

		return {
			Get: function(key) {},
			Set: function(key, obj) {},
			Add: function(key, id, obj) {},
			Remove: function(key, id) {}
		}
	}

	let get = function(key) {		
		var json = localStorage.getItem(key);
		var obj = JSON.parse(json);
		return obj;
	};

	let set = function(key, obj) {		
		var json = JSON.stringify(obj);
		localStorage.setItem(key, json);
	};

	let add = function(key, id, obj) {
		let dict = get(key);
		
		if (dict == undefined)
			dict = {};
			
		dict[id] = obj;
		set(key, dict);
	}

	let remove = function(key, id) {
		let dict = get(key);

		if (dict == undefined)
			alert(`Cannot remove. ${key} is undefined.`);

		if (dict[id] != undefined) {
			delete dict[id];
			set(key, dict);
		}
	}

	return {
		Get: get,
		Set: set,
		Add: add,
		Remove: remove,
	};
})();