let getRightMove = function(iBrd, iPlayer, iTurn){
    let newBoardFunc = (board, turn, target) => {
        let newBoard = [...board]
        newBoard[target] = turn
        return newBoard
    }

    let valueMove = (board, player, turn, index) => {
        const newBoard = newBoardFunc(board,turn,index);
        let result = checkWin(newBoard);
        if (result === 'win'){
            if (turn === player) {
                return  10}
            else {
                return -10}
        }
        else if  (result === 'draw'){ 
                return 0
        }
        else {
            let count = 1;
            let totalvalue = 0;
            for (let i = 0; i<=newBoard.length; i++) {
                // console.log(i, newBoard)
                if (newBoard[i] === '') {
                        let newTurn = turn === 'O'?'X':'O'
                        totalvalue = totalvalue + valueMove(newBoard, player, newTurn, i)
                }
                count++
            }
            return totalvalue / count
        };
    }


    let checkWin = (board) => {
        let b = board;
        if (( b[0] && b[0] === b[1] && b[1] === b[2]) ||
            ( b[3] && b[3] === b[4] && b[4] === b[5]) ||
            ( b[6] && b[6] === b[7] && b[7] === b[8]) ||
            ( b[0] && b[0] === b[3] && b[3] === b[6]) ||
            ( b[1] && b[1] === b[4] && b[4] === b[7]) ||
            ( b[2] && b[2] === b[5] && b[5] === b[8]) ||
            ( b[0] && b[0] === b[4] && b[4] === b[8]) ||
            ( b[2] && b[2] === b[4] && b[4] === b[6])) 
            {
            return 'win'} 
        else if (board.indexOf('') === -1) {
            return 'draw'
        }
        return 'next'
    }

    let maxValue = -Infinity;
    let result = null;
    for (let i = 0; i<=iBrd.length; i++) {
        if (iBrd[i] === '') {
            let tvalue = valueMove(iBrd, iPlayer, iTurn, i)
            if (tvalue > maxValue) {
                maxValue = tvalue;
                result = i
            }
            console.log(i, tvalue)
            };
            
    }
    return result
}


// console.log(getRightMove(["O","","","","","X","O","X","X"],"O", "O"))

export default getRightMove