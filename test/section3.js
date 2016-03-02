const expect = require('chai').expect;

describe('section 3', () => {

  it('varargs, "rest parameters"', () => {

  	// A rest parameter _gather_ an argument list (or part of it) into an array.

      const printfn = (pattern, ...args) => {
          expect(Array.isArray(args)).true;
      };

      printfn('%s has %d apples.', 'Jill', 3);
  });

  it('spread', () => {

    // Gather <--> Spread

		// The spread operator turns the elements of an Array into arguments
		// of a function call or into elements of an Array literal.
    	const a = [3, 4];
    	const b = [1, 2, ...a, 5];
    	expect(b).deep.equal([1, 2, 3, 4, 5]);

  		const arr1 = [22,33];
  		const arr2 = [44,55];
  		arr1.push(...arr2);
  		expect(arr1).deep.equal([22,33,44,55]);

      // Spread works on any iterable.
      // For example, we can extract a maps keys or values iterator to an array:
      const map = new Map([[1,1],[2,2]]);
      const keys = [...map.keys()];

      // String is iterable too
    	const f = (a, b, c) => { return `${a} and ${b} and ${c}`; };
    	expect( f(...'abc') ).equal('a and b and c');

    });

    it('a decorator that works with any args', () => {

      // how to wrap a logDecorator around any fn? 
      // The fn could have any num of args and also return something.
      // If 'rest parameters' gather args into an array and 'spread'
      // turns an array into args could we ...

      const withLogging = (fn) => {
			  return (...args) => {
	        console.log(` calling ${fn.name} with ${args.length} arguments` );
			    return fn(...args);       	
			  }
      };

      const buildMessage = (prefix, content) => {
        return prefix + ' new message: ' + content;
      };

      const loggingBuild = withLogging(buildMessage);
      expect(buildMessage('a', 'xyz')).equal('a new message: xyz');
      expect(loggingBuild('the', 'xyz')).equal('the new message: xyz');

      // note that this won't work with object methods due to 'this' issues :-(
    });

  it('default values', () => {

    const coordinatesToStr = function(x, y, z=0) {
      return `${x}:${y}:${z}`;
    };

    expect(coordinatesToStr(1, 2, 3)).equal('1:2:3');
    expect(coordinatesToStr(1, 2)).equal('1:2:0');

    // the absence of arg triggers default value. Absence=undefined
    expect(coordinatesToStr(1, 2, undefined)).equal('1:2:0');
    expect(coordinatesToStr(1, 2, null)).equal('1:2:null');

    const compact = (x, y, z=0) => `${x}:${y}:${z}`;

    expect(compact(1, 2)).equal('1:2:0');

  });
    
});
