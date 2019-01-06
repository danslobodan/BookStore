var Form = (function(){

	return {
		Serialize: function(form) {
			let obj = {};
			let inputs = form.getElementsByTagName("input");
			for(let input of inputs) {
				if (input.name == "submit")
					continue;
				if (input.value == undefined)
					continue;
	
				obj[input.name] = input.value;
			}
			return obj;
		},
		Deserialize: function(form, obj) {
			let inputs = form.getElementsByTagName("input");
			for(let input of inputs) {
				if (input.name == "submit")
					continue;
				if (obj[input.name] == undefined)
					continue;
	
				input.value = obj[input.name];
			}
		}
	}

})();