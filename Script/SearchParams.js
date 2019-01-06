var SearchParams = (function() {

	return {
		Get : function(name) {
			urlParams = new URLSearchParams(window.location.search);
			let value = urlParams.get(name);
			return value;
		}
	}
})();