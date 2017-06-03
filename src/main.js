import _ from 'lodash'
const ALIVE = 1;
const DEATH = 0;

const CELLROW = 3;

/**
 * @return {number}
 */
function GetCellAliveAmount(cellArr) {
    let aliveAmount = 0;
    for (let i = 0; i < CELLROW; i++) {
        for (let j = 0; j < CELLROW; j++) {
            if (cellArr[i][j] === ALIVE) {
                aliveAmount++;
            }
        }
    }
    return aliveAmount;
}

/**
 * @return {number}
 */
function JudgeCellNextState(centerCell, aliveAmount) {
    let nextAliveState = DEATH;

    if (centerCell === ALIVE) {
        if (aliveAmount > 2 && aliveAmount < 5) {
            nextAliveState = ALIVE;
        } else {
            nextAliveState = DEATH;
        }
    } else if (aliveAmount === 3) {
        nextAliveState = ALIVE;
    }

    return nextAliveState;
}

const cellLifeGame = (cellArr) => {
    let aliveAmount = GetCellAliveAmount(cellArr);

    return JudgeCellNextState(cellArr[1][1], aliveAmount);
};

module.exports = {
    cellLifeGame
};
