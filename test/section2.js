const expect = require('chai').expect;

describe('section 2', function() {

    it('objects and the dangers of "this"', () => {

        const o1 = {};
        o1.foo = function() { return 'foo1'; };
        expect(o1.foo).is.a('function');

        const o2 = {
            foo: () => 'foo2',
            bar: function() { return 'bar' + this.foo(); } // this not bound with =>
        };

        expect(o2.bar).is.a('function');
        expect(o2.bar()).equal('barfoo2');
        const refbar = o2.bar; // for example, use as a button-click callback
        expect(refbar).is.a('function');
        //refbar(); // "this" is undefined

        // bind creates a new function that, when called, has its 'this' keyword set 
        // to the provided value, with a given sequence of arguments preceding any
        // provided when the new function is called.
        console.log( refbar.bind(o1)() );

        const o3 = {
            foo() { return 'foo'; },
            bar() { return this.foo(); }
        };

        expect(o3.bar()).equal('foo');

        // ES6 has new Javaish class syntax. super(), constructor, etc.
        // ... but it does not solve the 'this' problem.
    });

    it('class-free OO', () => {

        // ecma-262: "Objects are created by using constructors in new 
        // expressions; for example, new Date(2009,11) creates a new Date
        // object. Invoking a constructor without using new has consequences
        // that depend on the constructor."
        // BAD IDEA!!!! Only needed for inheritance. You don't need inheritance.

        // constructor? Just use a function that creates an object
        const createSimpleAnimal = (name, species) => {
            return {
                identify() { return `${name} is a ${species}`; },
            };
        };

        // encapsulation? state? Local variables in the factory function (closure).
        // Note: no "this" needed.
        const createStuffedAnimal = (name) => {
            let stuffingPercentage = 100; // good as new
            return {
                status() { return `${name} has ${stuffingPercentage}% stuffing left.`; },
                hug() { stuffingPercentage -= 1; }
            };
        };

        const pooh = createStuffedAnimal('Winnie');
        pooh.hug();
        // note that stuffingPercentage is NOT a property of the object
        // ... we have no access to it from the outside.
        // expect(pooh.stuffingPercentage).equal(99);
        pooh.hug();
        pooh.hug();
        expect(pooh.status()).equal('Winnie has 97% stuffing left.');

        const callback = pooh.hug; // can take a reference and use it normally
        callback();
        expect(pooh.status()).equal('Winnie has 96% stuffing left.');


        // abstract factory? Just pass in a different factory function.

        // inheritance? You do not need inheritance.
        const createAnimal = (name, species, movingStrategy) => {
            return {
                // notice how we didn't have to add movingStrategy as a 'field'
                identify() { return `${name} is a ${species}`; },
                move() { return name + ' is ' + movingStrategy.move(); }
            };
        };

        const flying = { move() { return 'flying'; } };
        const walking = { move() { return 'walking'; } };

        const seagull = createAnimal('Steven', 'Seagull', flying);
        expect(seagull.move()).equal('Steven is flying');

        const penguin = createAnimal('Pingu', 'Penguin', walking);
        expect(penguin.move()).equal('Pingu is walking');


        // Since there is only one method in the movingStrategy, it can be simplified:
        const createAnimalFn = (name, species, moveFn) => {
            return {
                identify() { return `${name} is a ${species}`; },
                move() { return name + ' is ' + moveFn(); }
            };
        };

        const dog = createAnimalFn('Fido', 'Dog', () => { return 'running'; });
        expect(dog.move()).equal('Fido is running');
    });

    it('equality, objects and primitives', () => {
        const cat = { legs: 4, tails: 1 };
        const dog = { legs: 4, tails: 1 };
        const dogRef = dog;
        expect(cat === dog).false;
        expect(dogRef === dog).true; // reference points to the same object

        expect(42 === 2*21).true; // primitives are not references

        // Primitive data types: 
        //   string, number, boolean, null, undefined, symbol
        //   All primitives are immutable.
        // Object is the seventh type and it is mutable.

        /*
        Except for null and undefined, all primitive values have object
        equivalents that wrap around the primitive values:
            String for the string primitive.
            Number for the number primitive.
            Boolean for the Boolean primitive.
            Symbol for the Symbol primitive.
        The wrapper's valueOf() method returns the primitive value.
        */

    });

});
