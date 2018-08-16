(function () {

	const version = 20;
	let count = 0;

	indexedDB.deleteDatabase("DBteste");

	// Abrindo o banco de dados
	const request = indexedDB.open("DBteste", version);

	//Tratamento de erro na criação do banco de dados
	request.onerror = function(event) {
		console.log("Error");
	};

	//Tratamento do sucesso na criação/abertura do banco de dados
	request.onsuccess = function(event) {
		console.log("Success")	;
	};

	request.onupgradeneeded = function (event) {
		init(request.result);
	}

	function init(db) {
		const testeOS = db.createObjectStore("testeOS", { autoIncrement : true });

		console.log(testeOS)

		setInterval(function () {
			const transaction = db.transaction(["testeOS"], "readwrite");
			const testeOS = transaction.objectStore("testeOS");
			testeOS.add({ count : count++});
		}, 1000)	
	}

})()