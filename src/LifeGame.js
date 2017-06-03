/**
 * Created by 84406 on 2017/6/3.
 */

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

    let nextAliveState = ALIVE;

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

function modifyNowState(nowState) {
    let newArr = [];

    for (let i = 0; i < nowState.length - 2; i++) {
        newArr.push(nowState[i + 1].slice(1, nowState[i + 1].length));
    }

    return newArr;
}

function InitialState(row, line) {
    let state = InitArray(row, line);

    for (let i = 0; i < row * 2; i++) {
        let x = Math.floor(Math.random() * row / 2) + row / 5;
        let y = Math.floor(Math.random() * line / 2) + row / 5;
        state[x][y] = ALIVE;
    }

    return state;
}

function game() {
    interval = setInterval(function () {
        //printStateOnConsole(nowState);
        printStateOnHtml(nowState);
        nowState = nextCellsState(nowState);
        nowState = modifyNowState(nowState);
    }, updateDelay);
}

function printStateOnConsole(nowState) {
    nowState.forEach(function (e) {
        let str = '';
        for (let i = 0; i < e.length; i++) {
            if (e[i] === DEATH)
                str += ' ';
            else
                str += '*';
        }
        console.log(str);
    });

    console.log("-------------------------------");
}

let updateDelay = 100;
let nowState = InitialState(50, 50);

let interval;

const gridWidth = 500 / nowState.length;

function printStateOnHtml(nowState) {
    const aliveColor = "#FF0000";
    const deathColor = "#FFFFFF";
    const lineWidth = 0.3;
    const strokeStyle = "#666";

    for (let i = 0; i < nowState.length; i++) {
        for (let j = 0; j < nowState[i].length; j++) {
            cxt.fillStyle = nowState[i][j] === ALIVE ? aliveColor : deathColor;
            cxt.strokeStyle = strokeStyle;
            cxt.lineWidth = lineWidth;
            cxt.fillRect(i * gridWidth, j * gridWidth, gridWidth, gridWidth);
            cxt.strokeRect(i * gridWidth, j * gridWidth, gridWidth, gridWidth);
        }
    }
}

//Client Begin---------------------------------------------

const DELAY = 100;

let canvas = document.getElementById("game");
let cxt = canvas.getContext("2d");
let slowDown = document.getElementById("slowDown");
let speedUp = document.getElementById("speedUp");
let speedText = document.getElementById("speed");
let start = document.getElementById("start");
let clearGrid = document.getElementById("clear");


speedText.value = updateDelay;
printStateOnHtml(nowState);

canvas.addEventListener("click", function __handler__(evt) {
    let xPos = evt.clientX;
    let yPos = evt.clientY;
    let rect = canvas.getBoundingClientRect();
    xPos -= rect.left;
    yPos -= rect.top;
    console.log(xPos, yPos); // (xPos, yPos) 就是鼠标在 canvas 单击时的坐标
    let x = Math.floor(xPos / gridWidth);
    let y = Math.floor(yPos / gridWidth);
    nowState[x][y] = nowState[x][y] === ALIVE ? DEATH : ALIVE;
    printStateOnHtml(nowState);
});

clearGrid.onclick = function () {
  for(let i = 0; i < nowState.length;i++) {
      for(let j = 0; j < nowState[i].length; j++) {
          nowState[i][j] = DEATH;
      }
  }
  printStateOnHtml(nowState);
};

start.onclick = function () {
    if (start.value === '开始') {
        start.value = '暂停';
        game();
    } else {
        clearInterval(interval);
        start.value = '开始';
    }
};

slowDown.onclick = function () {
    updateDelay += DELAY;
    speedText.value = updateDelay;
    clearInterval(interval);
    game();
};

speedUp.onclick = function () {
    updateDelay -= DELAY;
    speedText.value = updateDelay;
    clearInterval(interval);
    game();
};

