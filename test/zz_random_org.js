const expect = require('chai').expect;

describe('https.get example', function() {

	// Change "xit" to "it" to make this test run
	xit('go get random', function() {
		const https = require('https');
		https.get('https://www.random.org/integers/?num=5&min=1&max=10&col=1&base=10&format=plain&rnd=new', (res) => {
		   console.log(`Got response: ${res.statusCode}`);
		   res.on('data', (chunk) => {
		   	 const c = chunk;
		     console.log(`BODY: ${c}`);
		   });
		}).on('error', (e) => {
		     console.log(`Got error: ${e.message}`);
		});
	});

});
