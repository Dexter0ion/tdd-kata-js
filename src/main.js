import _ from 'lodash'

const cellLifeGame = (cellArr) => {
  let aliveAmount = 0;
  if(cellArr[1][1]===1){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
          if(cellArr[i][j]===1){
            aliveAmount++;
          }
        }
    }
    if(aliveAmount<=2){
      cellArr[1][1]=0;
      return cellArr[1][1];
    }
  }
};

module.exports = {
  cellLifeGame
};
