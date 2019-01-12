var Persistence = (function() {

	if (typeof(Storage) === "undefined") {
		alert("Local storage is unavailable in this browser");

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

	if (get("users") == undefined) {
		let admin = {
			firstname : "Slobodan",
			lastname : "Dan",
			username : "admin",
			password : "admin",
			isAdmin : true
		}
		let user = {
			firstname : "Slobodan",
			lastname : "Dan",
			username : "dan",
			password : "dan",
			isAdmin : false			
		}
		let users = { admin, user };
		set("users", users);
	}

	if (get("authors") == undefined) {
		let asimov = { id : "isaac_asimov", firstname : "Isaac", lastname : "Asimov" };
		let bulgakov = { id : "mikhail_bulgakov", firstname : "Mikhail" , lastname : "Bulgakov" };
		let loe = { id : "elrlend_loe", firstname : "Erlend", lastname : "Loe" };
		let authors = { asimov, bulgakov, loe };
		set("authors", authors);
	}

	if (get("books") == undefined) {
		let books = {};
		books[1] = { id: "1", title :"Foundation", year :"1951", price :"23.18", units :"3", cover :"Images/Foundation.jpg", author:"Isaac Asimov"},
		books[2] = { id: "2", title :"Foundation And Empire", year :"1952", price :"7.19", units :"7", cover :"Images/FoundationAndEmpire.jpg", author:"Isaac Asimov"},
		books[3] = { id: "3", title :"Second Foundation", year :"1953", price :"15.29", units :"1", cover :"Images/SecondFoundation.jpg", author:"Isaac Asimov"},
		books[4] = { id: "4", title :"Master And Margarita", year :"1969", price :"12.61", units :"9", cover :"Images/MasterAndMargarita.jpg", author:"Mikhail Bulgakov"},
		books[5] = { id: "5", title :"Dopler", year :"2004", price :"2.5", units :"20", cover :"Images/Dopler.jpg", author:"Erlend Loe"},
		books[6] = { id: "6", title :"Naive Super", year :"1996", price :"14.00", units :"4", cover :"Images/NaiveSuper.jpg", author:"Erlend Loe"},
		books[7] = { id: "7", title :"Volvo Trucks", year :"2005", price :"20.92", units :"6", cover :"Images/VolvoTrucks.jpg", author:"Erlend Loe"},
		books[8] = { id: "8", title :"Lazy Days", year :"2009", price :"8.99", units :"15", cover :"Images/LazyDays.jpg", author:"Erlend Loe"}
		set("books", books);
	}

	return {
		Get: get,
		Set: set,
		Add: add,
		Remove: remove,
	};
})();