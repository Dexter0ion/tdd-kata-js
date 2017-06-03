import {expect} from 'chai';
import  {cellLifeGame, JudgeCellNextState} from '../src/main';

describe('cellLifeGame', () => {
    it('should return death (0) if less than two cell alive around this cell when the center cell is alive(1)', () => {
        expect(JudgeCellNextState([[1, 0, 0], [0, 1, 0], [0, 0, 0]])).equal(0);
        expect(JudgeCellNextState([[0, 1, 0], [0, 1, 0], [0, 0, 0]])).equal(0);
        expect(JudgeCellNextState([[0, 0, 0], [0, 1, 0], [0, 0, 0]])).equal(0);
    });

    it('should return the same state if cell around is between two and three when the center cell is alive(1)', () => {
        expect(JudgeCellNextState([[1, 0, 1], [0, 1, 0], [1, 0, 0]])).equal(1);
        expect(JudgeCellNextState([[0, 1, 0], [0, 1, 0], [1, 0, 0]])).equal(1);
        expect(JudgeCellNextState([[0, 0, 0], [0, 1, 0], [1, 1, 1]])).equal(1);
    });

    it('should return death(0) if cell around is more than three when the center cell is alive(1)', () => {
        expect(JudgeCellNextState([[1, 1, 1], [0, 1, 0], [0, 0, 1]])).equal(0);
        expect(JudgeCellNextState([[0, 1, 0], [0, 1, 1], [1, 1, 0]])).equal(0);
        expect(JudgeCellNextState([[1, 1, 1], [0, 1, 0], [1, 1, 1]])).equal(0);
    });

    it('should return alive(1) if cell around is three when the center cell is death(0)', () => {
        expect(JudgeCellNextState([[1, 1, 0], [0, 0, 0], [0, 0, 1]])).equal(1);
        expect(JudgeCellNextState([[0, 1, 0], [0, 0, 0], [1, 1, 0]])).equal(1);
        expect(JudgeCellNextState([[1, 1, 1], [0, 0, 0], [0, 0, 0]])).equal(1);
    });

    it('should return next cells state [[0,0,0,0,0],[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0],[0,0,0,0,0]] when cells state is [[1,0,0],[0,0,1],[1,0,0]]', () => {
        expect(cellLifeGame([[1, 0, 0], [0, 0, 1], [1, 0, 0]])).deep.equal([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]);
    });

    it('should return next cells state nextState when cells state is nowState', () => {
        let nowState = [
            [1,0,1,0],
            [0,1,0,1],
            [0,0,0,1],
            [0,0,1,0]
        ];

        let nextState = [
            [0,0,0,0,0,0],
            [0,0,1,1,0,0],
            [0,0,1,0,1,0],
            [0,0,0,0,1,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
        ];

        expect(cellLifeGame(nowState)).deep.equal(nextState);
    });

});
