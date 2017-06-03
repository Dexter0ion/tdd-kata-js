import {expect} from 'chai';
import  {cellLifeGame} from '../src/main';

describe('cellLifeGame', () => {
    it('should return death (0) if less than two cell alive around this cell', () => {
        expect(cellLifeGame([[1, 0, 0], [0, 1, 0], [0, 0, 0]])).equal(0);
        expect(cellLifeGame([[0, 1, 0], [0, 1, 0], [0, 0, 0]])).equal(0);
        expect(cellLifeGame([[0, 0, 1], [0, 1, 0], [0, 0, 0]])).equal(0);
    });
});
