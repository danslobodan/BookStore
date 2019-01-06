var Storage = function() {

	if (typeof(Storage) === "undefined") {
		return {
			Get: function(key) {
				// get from cookies	
			},
			Set: function(key, obj) {
				// set to cookies
			}
		}
	}

	return {
		Get: function(key) {
			
			var json = localStorage.getItem(key);
			var obj = JSON.parse(json);
			return obj;
		},
		Set: function(key, obj) {
		
			var json = JSON.stringify(obj);
			localStorage.setItem(key, json);
		}
	};
}();