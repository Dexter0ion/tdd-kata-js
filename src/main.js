const ALIVE = 1;
const DEATH = 0;
const NINEGRIDROW = 3;

/**
 * @return {number}
 */
function GetCellAliveAmount(cellArr) {
    let aliveAmount = 0;
    for (let i = 0; i < NINEGRIDROW; i++) {
        for (let j = 0; j < NINEGRIDROW; j++) {
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
        nextAliveState = aliveAmount - 1 >= 2 && aliveAmount - 1 <= 3 ? ALIVE : DEATH;
    } else if (aliveAmount === 3) {
        nextAliveState = ALIVE;
    }

    return nextAliveState;
}

function initArray(row, line) {
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
    const extraLength = 4;
    const startPosition = 2;

    let nowCellsState = initArray(cellArr.length + extraLength, cellArr.length + extraLength);
    for (let i = startPosition; i < cellArr.length + startPosition; i++) {
        for (let j = startPosition; j < cellArr[0].length + startPosition; j++) {
            nowCellsState[i][j] = cellArr[i - startPosition][j - startPosition];
        }
    }

    return nowCellsState;
}

function getCellAroundNineGrid(nowCellState, i, j) {
    let centerCellArr = [];

    centerCellArr.push([nowCellState[i - 1][j - 1], nowCellState[i - 1][j], nowCellState[i - 1][j + 1]]);
    centerCellArr.push([nowCellState[i][j - 1], nowCellState[i][j], nowCellState[i][j + 1]]);
    centerCellArr.push([nowCellState[i + 1][j - 1], nowCellState[i + 1][j], nowCellState[i + 1][j + 1]]);
    return centerCellArr;
}

function nextCellsState(cellArr) {
    let nextCellState = initArray(cellArr.length + 2, cellArr.length + 2);
    let nowCellState = getNowCellsState(cellArr);

    for (let i = 1; i < nowCellState.length - 1; i++) {
        for (let j = 1; j < nowCellState[i].length - 1; j++) {
            nextCellState[i - 1][j - 1] = JudgeCellNextState(getCellAroundNineGrid(nowCellState, i, j));
        }
    }
    return nextCellState;
}

const cellLifeGame = (cellArr) => {
    return nextCellsState(cellArr);
};

module.exports = {
    cellLifeGame,
    JudgeCellNextState,
    nextCellsState
};
