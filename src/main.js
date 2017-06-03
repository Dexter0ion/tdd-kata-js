import _ from 'lodash'

const CELLROW = 3;

/**
 * @return {number}
 */
function GetCellAliveAmount(cellArr) {
    let aliveAmount = 0;
    for (let i = 0; i < CELLROW; i++) {
        for (let j = 0; j < CELLROW; j++) {
            if (cellArr[i][j] === 1) {
                aliveAmount++;
            }
        }
    }
    return aliveAmount;
}

const cellLifeGame = (cellArr) => {
    let aliveAmount = GetCellAliveAmount(cellArr);

    if (cellArr[1][1] === 1) {
        if (aliveAmount <= 2) {
            return 0;
        } else if (aliveAmount <= 4) {
            return cellArr[1][1];
        }
        else {
            return 0;
        }
    } else {
        if (aliveAmount >= 2 && aliveAmount <= 3) {
            return cellArr[1][1];
        }
    }
};

module.exports = {
    cellLifeGame
};
