const expect = require('chai').expect;

describe('destructuring', () => {

	it('arrays', () => {
		const coords = [1.0, 2.2, 0.3];
		const [x,y,z] = coords;
		expect(x).within(0.99, 1.01);
		expect(y).within(2.15, 2.25);
		expect(z).within(0.25, 0.35);

		// you can ignore some
		const [first,,third] = coords;

	});

	it('applications', () => {

		// iterate entries
	    const arr = ['salmon', 'bread', 'cheese'];
	    for (const [index, elem] of arr.entries()) {
	        console.log(index+'. '+elem);
	    };

	    // multiple return values
		const nextMove = () => { 
			const a = 3+4;
			const b = 3+3;
			return [a, b]; 
		};

		const [x, y] = nextMove();
		expect(x).equal(7);
	});

	it('objects', () => {
		const coords = { x:1, y:2, z:3 };
		const {x,y,z} = coords;
		expect(x).equal(1);
		expect(y).equal(2);
		expect(z).equal(3);

		// attempting to destructure nonexistent property
		// default value for undefined
		const { nosuch, bling = 1 } = coords;
		expect(nosuch).undefined;
		expect(bling).equal(1);
	});

	it('object graphs', () => {

		const planeState = {
			pos: { x:1, y:2, z:3 },
			speed: 7
		};

		// code that looks like the data it is parsing
		const { speed, pos:{y} } = planeState;
		expect(speed).equal(7);
		expect(y).equal(2);
		// expect(pos).undefined; <-- there is no 'pos'

		// what if we want all of 'pos'?
		// BTW, we can change the names but the syntax is ass backwards.
		const { speed: s, pos: p } = planeState;
		expect(s).equal(7);
		expect(p).deep.equal({x:1,y:2,z:3});

		const mess = {
			a:1,
			b: {
				c:2,
				d: {
					e: { f:42 }
				}
			}
		};

		const { b:{ d:{ e:{ f } } } } = mess;
		expect(f).equal(42);
	});

	it('application - parameter objects', () => {

		// Parameter objects are very popular and useful.
		// You can destructure an incoming parameter object right
		// there in the functions argument list:

		const handleBatches = ({ dir = '.', batchSize = 100 }) => {
			return `handling:${dir} size:${batchSize}`;
		};

		const s = handleBatches( { batchSize:50 } );
		expect(s).equal('handling:. size:50');

	});

	it('nested arrays', () => {
		const ary = [1, ['a', 'b'], 3];
		const [x,[m,n],z] = ary;
		expect(m).equal('a');
	});

	it('mixed objects and arrays', () => {
		const data = {
			name: 'barf',
			stuff: [
				{ a:1, b:4 },
				{ a:2, b:5 },
				{ a:3, b:6 }
			]
		};
		// cannot get inside the objects in the array
		const { name, stuff: [{a:a1},...therest] } = data;
		expect(name).equal('barf');
		expect(a1).equal(1);
	});

	it('destructuring and gathering', () => {
		const ary = [1,2,3,4];
		const [head, ...tail] = ary;
		expect(head).equal(1);
		expect(tail).deep.equal([2,3,4]);
	});

});
