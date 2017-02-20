import {expect} from 'chai';
import {fizzBuzz} from '../src/js/fizz-bizz.js';

describe('Test Fizz Buzz', () => {
    it('should return a given number as a string', () => {
        expect(fizzBuzz(1)).to.equal('1');
    });
    it('should return FIZZ given number can be divided by 3', () => {
        expect(fizzBuzz(3)).to.equal('FIZZ');
        expect(fizzBuzz(6)).to.equal('FIZZ');
        expect(fizzBuzz(9)).to.equal('FIZZ');
    });
});

