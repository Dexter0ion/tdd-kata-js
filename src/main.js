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
function JudgeCellNextState(cellArr) {
    let aliveAmount = GetCellAliveAmount(cellArr);

    let nextAliveState = DEATH;
    if (cellArr[1][1] === ALIVE) {
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

function InitArray(row, line) {
    let arr = new Array(row);

    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(line);
    }

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

function getNowCellsState(cellArr) {
    
    let nowCellsState = InitArray(cellArr.length + 4, cellArr.length + 4);
    for (let i = 2; i < cellArr.length + 2; i++) {
        for (let j = 2; j < cellArr[0].length + 2; j++) {
            nowCellsState[i][j] = cellArr[i - 2][j - 2];
        }
    }
    return nowCellsState;
}

function nextCellsState(cellArr) {
    let nextCellState = InitArray(cellArr.length + 2, cellArr.length + 2);
    let nowCellState = getNowCellsState(cellArr);

    for (let i = 1; i < nowCellState.length - 1; i++) {
        for (let j = 1; j < nowCellState[i].length - 1; j++) {
            let centerCellArr = [];
            centerCellArr.push([nowCellState[i - 1][j - 1], nowCellState[i - 1][j], nowCellState[i - 1][j + 1]]);
            centerCellArr.push([nowCellState[i][j - 1], nowCellState[i][j], nowCellState[i][j + 1]]);
            centerCellArr.push([nowCellState[i + 1][j - 1], nowCellState[i + 1][j], nowCellState[i + 1][j + 1]]);

            nextCellState[i - 1][j - 1] = JudgeCellNextState(centerCellArr);
        }
    }

    return nextCellState;
}

const cellLifeGame = (cellArr) => {
    const cellState = nextCellsState(cellArr);

    // cellState.forEach(function (e) {
    //     console.log(e.toString());
    // });

    return cellState;
};

module.exports = {
    cellLifeGame,
    JudgeCellNextState
};
