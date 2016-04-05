const expect = require('chai').expect;

describe('bonus materials', function() {

    it('There is i18n stuff in ES6', () => {
        expect(typeof Intl.Collator).equal('function');
    });

    it('expressions as object keys --> DSL?', () => {
        const expr = 'abc';
        const o = {
            [expr]: 7
        };
        expect(o.abc).equal(7);
    });

    it('expr propkey with short fn syntax', () => {
        const k = 'key';
        const o = {
            [k]() { return 'the key'; } // [k]: () => { return 'the key'; }
        };
        expect(o.key()).equal('the key');
    });

    it('new can take a variable - good for factories', () => {
        const what = Date;
        const o = new what(1456505734776);

        class Foo {
            constructor(x) { this.x = x; }
        }
        class Bar {
            constructor(x) { this.x = x + 1; }
        }

        const clazz = Bar;
        const o2 = new clazz(1);
        expect(o2.x).equal(2);

        // ...except that we don't want to use 'new' ...
    });

    it('var scope is surprising', () => {
        // var scope is 'surprising'. Better not use at all.
        // Cannot break WWW. Old crap is still there. Just use the new crap.
        for(var i = 0; i < 3; i++ ) {
            var x = 'bozuk';
        };

        // var has function scope. It gets 'hoisted' to the top of the function
        // no matter where it is in the code.
        expect(x).equal('bozuk'); 
        expect(i).equal(3);
    });

    it('typed arrays, binary data', () => {

        // Good for: image data, binary network protocols, binary files, ...

        const someInts = Uint8Array.of(65, 128, 16, 32);
        expect(someInts[0]).equal(65);

        // TypedArray --> ArrayBuffer <-- DataView
        const view = new DataView(someInts.buffer);
        expect(view.getUint8(1)).equal(128);
        expect(view.getInt8(1)).equal(-128); // reinterpret as unsigned

        expect(view.getUint16(2)).equal(256*16 + 1*32); // note the index!

        const littleEndian = true;
        expect(view.getUint16(2, littleEndian)).equal(1*16 + 256*32); // note the index!

        // Int8Array, Uint8Array, Uint8ClampedArray
        // Int16Array, Uint16Array
        // Int32Array, Uint32Array
        // Float32Array, Float64Array

        // "Uint8ClampedArray is totally a historical artifact (of the HTML5
        // canvas element). Avoid unless you really are doing canvas-y things.""

    });

    it('freeze', () => {
        const bucket = { litresOfWater: 3 };
        bucket.litresOfWater = 5;
        const bucketRef = Object.freeze(bucket);
        expect(bucketRef === bucket); // freeze mutates and returns same object
        expect(() => { bucketRef.litresOfWater = 6; }).to.throw(TypeError);
        expect(() => { bucket.litresOfWater = 6; }).to.throw(TypeError);

        // Cannot change prop values, add/delete props, configure...
        // freeze is shallow. frozen.some.innards = 3 is still possible.

        // Object.seal(o);
        // Prevents new properties from being added and marks existing properties
        // as non-configurable. This makes the "shape" of the object fixed but
        // the property values can still change.
    });

    it('if you really really need inheritance', () => {

        // Constructor: "function object that creates and initializes objects"
        // Meh....

        const base = { flag: 'a' };
        base.ding = () => { return 'dingding'; };
        const o = Object.create(base);
        expect(o.__proto__).equal(base);
        expect(o.flag).equal('a');
        expect(o.ding()).equal('dingding');
    });

    // Object.is
    // "... not the same as being equal according to the === operator.
    // The === operator (and the == operator as well) treats the number
    // values -0 and +0 as equal and treats Number.NaN as not equal to NaN.
    // BONUS Q: what is a NaN? What happens if x = 2.4/0; ?

    it('properties have attributes', () => {
        const o = { foo: 1 };
        Object.defineProperty( o, 'bar', { value: 2 }); // default: not writable
        Object.defineProperty( o, 'baz', { value: 3, writable: true });
        expect(o.bar).equal(2);
        o.foo = 6;
        expect(() => { o.bar = 7; }).to.throw(TypeError); // read only
        o.baz = 8;
    });

    it('weird prototype stuff', () => {
        // "An object is a collection of properties and has a single prototype object.
        //  The prototype may be the null value."
        const o = {};
        expect(o.prototype).undefined; // but it is undefined ???

        const func = function() { return 'I am'; };
        // every _function_ has a prototype. Every object does not.
        expect(func.prototype).function;
    });

    it('a philosophical question - should we use this stuff?', () => {
        const things = [1 ,'a'];
        things.desc = 'mixed bag';
        
        // hang properties on something that doesn't look like an object:
        const count = new Number(13700);
        count.desc = 'estimated'; 
        expect(count + 100).equal(13800);

        // Functions are definitely objects
        const func = function() { return 'I am'; };
        func.requireAuth = true;
        func.goForIt = function() { return 'yay!'; };
        expect(func()).equal('I am');
        expect(func.requireAuth).true;
        expect(func.goForIt).function;
        expect(func.goForIt()).equal('yay!');

        // this technique is used in the node-uuid lib:
        // x = uuid.v1();
        // x = uuid.v4();
        // x = uuid(); // maps to uuid.v4();
    });

    it('symbol', () => {
        // Each possible Symbol value is unique and immutable.
        // Each Symbol value immutably holds an associated value
        // called [[Description]] that is either undefined or a String value.
        const s1 = Symbol();
        const s2 = Symbol();
        const s3 = Symbol('optional_name_for_debugging');
        expect(s1 === s2).false;
        expect(s1 == s2).false;

        // A property key is either a String or a Symbol
        // A symbol is guaranteed to be unique but a string is not.
        const o = {
            s1: 'foo',
            s2: 42
        };
        expect(o.s2).equal(42);
    });

    it('data property vs accessor property', () => {

        const print = (aPerson) => {
            console.log(aPerson.name);
        };

        const personA = {
            name: 'John'
        };

        print(personA);

        const personB = {
            get name() { /* we could do stuff here */ return 'John'; },
            set name(val) { /* ... */ }
        };

        print(personB);

        // However! If you want a map use a map.
        // In ES6 it is no longer necessary to abuse objects as dictionaries.
    });

});
