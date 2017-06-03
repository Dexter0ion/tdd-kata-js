import {expect} from 'chai';
import  {cellLifeGame} from '../src/main';

describe('cellLifeGame', () => {
    it('should return death (0) if less than two cell alive around this cell', () => {
        expect(cellLifeGame([[1, 0, 0], [0, 1, 0], [0, 0, 0]])).equal(0);
        expect(cellLifeGame([[0, 1, 0], [0, 1, 0], [0, 0, 0]])).equal(0);
        expect(cellLifeGame([[0, 0, 0], [0, 1, 0], [0, 0, 0]])).equal(0);
    });

    it('should return the same state if cell around is between two and three', () => {
        expect(cellLifeGame([[1, 0, 1], [0, 1, 0], [0, 0, 0]])).equal(1);
        expect(cellLifeGame([[0, 1, 0], [0, 1, 0], [1, 0, 0]])).equal(1);
        expect(cellLifeGame([[0, 0, 0], [0, 0, 0], [1, 0, 1]])).equal(0);
    });

    it('should return death(0) if cell around is more than three', () => {
        expect(cellLifeGame([[1, 1, 1], [0, 1, 0], [0, 0, 0]])).equal(0);
        expect(cellLifeGame([[0, 1, 0], [0, 1, 0], [1, 1, 0]])).equal(0);
        expect(cellLifeGame([[1, 1, 1], [0, 1, 0], [1, 1, 1]])).equal(0);
    });
});
