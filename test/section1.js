const expect = require('chai').expect;


describe('section 1 - REPL', function() {

	// 1. Intro: 
	// 		What: the language. strictly "strict mode"
	// 		Not: tools, libraries, node.js, browser
	// 		Not: old language features that have a better modern alternative

	it('REPL: basic stuff', () => {
		// the basic stuff is the same as in many other languages

		// Start node REPL from the commandline and experiment with these:
		//  1 + 1
		//  7 % 2
		//  !true
		//  0x80 << 1	// hex, bit shift
		//  0x80 >> 1
		//  0b0101  	// binary
		//  0o666		// octal rw-rw-rw-
		//  true && false
		//  true || false
		//  (1 < 2) ? 'yup' : 'naah'
	});

	it('Gotcha! equality operators', () => {

		// JavaScript provides three different value-comparison operations:
		//   strict equality (or "triple equals" or "identity") using ===,
		//   loose equality ("double equals") using ==,
		//   Object.is (new in ECMAScript 2015).  +0 vs. -0
		expect(1 == 1).true;
		expect(1 == '1').true; // WTF???!?
		expect(1 === 1).true;
		expect(1 === '1').false; // Ahh... much better

		// This is the kind of thing Douglas Crockford talks about in
		// 'Javascript - the good parts'
		// 1 != '1'
		// 1 !== '1'
		//  7 % 2 === 0
	});

	it('functions', function() {

		// functions are things ...
		// ... that can be assigned to a variable.
		const ff = function(n) { return 2*n; };
		// --> undefined
		// Q: what is the difference between a statement and an expression?

		// const f = (n) => { return 2*n; };

		// expression, returns a Function
		(n) => 2*n;

		// statement:
		const f = (n) => 2*n;

		// Expressions have a value, while statements do not.
		// If you can pass it as an argument to a function, it's an expression.

		expect(f(21)).equal(42);
	});


	// INTRODUCE MOCHA. mocha --watch
	// describe/it DSL --> builds Suite/Test just like JUnit/NUnit


	it('variables', function() {

		// const is write once. C#/Java readonly/final. NOT compile time const.
		// const is good - prefer const. grok/safe/optimization.
		// safe: "oh, I didn't mean to change that".
		const truth = 21*2;
		const password = "kissa123";
		// truth = 41; // no can do: read only

		// if you really must mutate a variable use let.
		let x;
		expect(x).undefined; // never assigned -> undefined
		// null vs undefined
		x = null;
		expect(x).null;
	});

	const log = (msg) => { console.log(msg); };

	it('higher order functions', ()=> {

		// describe() and it() are higer order functions. They take
		// functions as parameters.

		// callback

		const fetchData = (id, callback) => {
			// call server with id, give result to callback
			callback('your result');
		};

		fetchData(123, (result) => { 
			log(result); 
		});

       //  predicate
		const numbers = [56,33,72,3,7];
		const isEven = (n) => n % 2 ===0;
		expect(isEven(2)).true;
		expect(numbers.filter(isEven)).deep.equal([56,72]);

	});

    it('data structures - objects (structs)', () => {
		const address = {
			street: 'Itämerenkatu 5',
			zip: '00180',
			city: 'Helsinki'
		};
		expect(address.zip).equal('00180');
    });

	it('data structures - arrays', () => {

        const someChars = ['a', 'b', 'e'];
        someChars[1] = 'c';
        expect(someChars[1]).equal('c');
        expect(someChars.length).equal(3);        

        someChars.push('d');
        expect(someChars).deep.equal(['a', 'c', 'e', 'd']); // push at end
        expect(someChars.pop()).equal('d'); // pop at end
        expect(someChars).deep.equal(['a', 'c', 'e']); 

        // pop/push <-- work at array end
        // shift/unshift <-- work at array front

        // Arrays are sparse
        const sparse = [];
        sparse[42] = 'answer';
        sparse[13] = 'luck'
        expect(sparse[0]).undefined; // holes are undefined
        sparse.forEach(e => log(e)); // luck answer, skips holes

        // but:
        expect(sparse.length).equal(43);

        // An array index is an integer index whose numeric value i is in
        // the range +0 ≤ i < 2^32−1.
	});

	it('data structures - sets', () => {

		// Set(iterable)
		const magicNumbers = new Set([7,13,64738]);
		expect(magicNumbers.size).equal(3);
		expect(magicNumbers.has(6)).false;
		magicNumbers.forEach( (v) => { log(v); } );

		// values() returns iterable
		for(const v of magicNumbers.values()) log(v);
		
		// add, delete, clear work as you would expect

	});
    
    it('data structures - maps', () => {

		const servers = new Map([
            ['orders', 'orders.acme.com'],
            ['deliveries', 'deliveries.acme.com']
        ]);  
		expect(servers.size).equal(2);
		servers.set('deliveries', 'deliv2.acme.com');
		expect(servers.get('deliveries')).equal('deliv2.acme.com');
		// servers.has() <-- just like Set

		servers.forEach( (value, key) => log(key) );
		// methods that return iterators:
		// servers.keys();
		// servers.values();
		// servers.entries();
		// Set has the same ones, but with Set key & value are the same

		servers.delete('orders');
		expect(servers.size).equal(1);
		servers.clear();
		expect(servers.size).equal(0);
    });

	it('operations on data structures', () => {

		const a = { foo: 'A' };
		a.bar = 'B'
		const b = { baz: 'C' };
		const c = Object.assign({}, a, b); // assign(target, ...sources)
		expect(c.foo).equal('A');
		expect(c.bar).equal('B');
		expect(c.baz).equal('C');

		const letters = ['a', 'b', 'c', 'd', 'e'];
		// ES 2016: expect( letters.includes('b') ).true;
		expect( letters.indexOf('x') ).equal(-1);
		expect( letters.findIndex(s => s === 'd') ).equal(3);

		const numbers = [5, 3, 7, 9, 4, 6, 2];
		expect(numbers.filter( (val) => val < 6 )).deep.equal([5,3,4,2]);
		expect(numbers.filter( (val, idx) => idx % 3 === 0 )).deep.equal([5,9,2]);

		const ai = ['H', 'A', 'L'];
		const bigblue = ai.map( x => String.fromCharCode(x.charCodeAt(0) + 1) );
		bigblue.forEach(c => log(c) );

		// ...but they are not lazy like C# / Java 8
		numbers	
			.map( n => { log('map'); return n+1; } )
			.filter( n => { log('filter'); return n % 2 === 0; } );


		// You can map() and filter() arrays, but there are no
		// such operations for maps.
		// ..wait...   WHAT??
		// not in ES7 either :-(

		// WeakSet, WeakMap --> like Java, does not prevent GC
		// Typed arrays, binary data (bonus.js).
		// Immutable data structures: Immutable.js
	});

	it('string & for ... of', () => {

		const phrase = 'this is not a test';
		expect(phrase.startsWith('this is')).true;
		expect(phrase.endsWith('a test')).true;
		expect(phrase.includes('is not')).true;
		expect('x'.repeat(3)).equal('xxx');

		const sentence1 = 'The sign said "No smoking"';
		const sentence2 = "The sign said 'No smoking'";


		//for(const ch of phrase) console.log(ch);

		// for ... of works on iterables: 
		//     array (values)
		//     set (values)
		//     map (entries)
		//     -- all of the above have: entries, keys, values
		//     string (unicode code points)
		//     DOM structures will be iterable (some day)
		//     the legacy special variable 'arguments'
		
		for(const i of [1, 2, 3, 4]) log(i);

	});

	it('template literals & interpolation', () => {

		const what = 'Template literal';
		const how = 'with backticks';

		log(
		`${what} is created ${how}.
		 It can span multiple
		 lines.`);

		// remember expressions?
		log(`I can haz ${1+2} expressions?`);

		// Unescaped template strings
		// Template strings are “raw” if you prefix them with the
		// tag String.raw – the backslash is not a special character
		// and escapes such as \n are not interpreted.
		log( String.raw`In ES5 \n is a line-feed.` );

	});

	it('Numbers and Math', () => {
		// BTW, numbers are doubles

		typeof(1); // 'number'

		expect(0.1 + 0.2).not.equal(0.3);

		Number.EPSILON;

		// "Integers in the range −2^53 < i < 2^53 are safe."
		expect(9007199254740993).equal(9007199254740993);
		// 9008 0000 0000 0001 --> 9008 0000 0000 0000

		// floating point, vs int. Good enough for 53 bit signed integers.
		Number.MAX_SAFE_INTEGER;
		Number.MIN_SAFE_INTEGER

		expect(Math.sign(-783)).equal(-1);

		// floor(), ceil(), trucn(), round() ... etc.

		// If you work with decimal numbers or larger integers:
		// There are libraries:
		// https://github.com/MikeMcl/decimal.js/

	});
});
