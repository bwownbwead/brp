function exampleModule() {

	this.checkModern = function() {
		console.log(Modernizr);
	};

	this.hello = function() {
		return 'hello!';
	};
}

module.exports = exampleModule;