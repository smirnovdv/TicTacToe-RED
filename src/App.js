import React from 'react';
import './App.css';
import Box from './Box';
import getRightMove from './AI'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      machine: "",
      onClick: this.handleClick,
      matrix: Array(9).fill(""),
      lastTurn: "",
      winner: "",
      matrixCSS: Array(9).fill({color:"white"}),
      animated: "",
      newGameButtonStyles:{visibility:"hidden", opacity:0}
    };
  };


  componentDidMount() {
    this.randomPickFirstMove()
  }


  randomPickFirstMove() {
    if (Math.random() > 0.5) {
      this.setState({machine: "X"})
      setTimeout(this.autoHandleClick,1500)
    }
    else {
      this.setState({machine: "O"})
    }
}

  
  processWinner = (arrayCSS) => {
    this.setState({
      //make New Game button visible
      newGameButtonStyles:{visibility : "visible", opacity : 1, transitionDelay: "1s" },
      //determine the winner
      winner:(this.state.lastTurn === this.state.machine) ? "Machine" : "Human",
      //no clicking after a winner is determined
      onClick: '',
      //highlighting winning combination
      matrixCSS:this.state.matrixCSS.map((item,index)=>{
        if (arrayCSS.indexOf(index)>-1){
          return {color:"red"};
        }
        else {
          return {color:"white"};
        } 
      })
  })
};


  checkWinCondition = () => {
      let m = this.state.matrix;
      if   (m[0] && m[0] === m[1] && m[1] === m[2]) {
        this.processWinner([0,1,2])
      }
      else if (m[3] && m[3] === m[4] && m[4] === m[5]) {
        this.processWinner([3,4,5])
      }
      else if (m[6] && m[6] === m[7] && m[7] === m[8]) {
        this.processWinner([6,7,8])
      }
      else if (m[0] && m[0] === m[3] && m[3] === m[6]) {
        this.processWinner([0,3,6])
      }
      else if (m[1] && m[1] === m[4] && m[4] === m[7]) {
        this.processWinner([1,4,7])
      }
      else if (m[2] && m[2] === m[5] && m[5] === m[8]) {
        this.processWinner([2,5,8])
      }
      else if (m[0] && m[0] === m[4] && m[4] === m[8]) {
        this.processWinner([0,4,8])
      }
      else if (m[2] && m[2] === m[4] && m[4] === m[6]) {
        this.processWinner([2,4,6])
      }
      //Handling Draw
      else if (m.indexOf("")===-1) {
        this.setState({
          newGameButtonStyles:{visibility : "visible", opacity : 1, transitionDelay: "1s" },
          winner:"DRAW",
          lastTurn:(this.state.lastTurn==="X"?"O":"X"),
          onClick: '',
          matrixCSS:Array(9).fill({color:"red"})
      });
      }
      else if (this.state.lastTurn !== this.state.machine) {
        setTimeout(this.autoHandleClick,1500)
      }
  }


  newGame = () => {
    this.setState({
      newGameButtonStyles:{visibility : "hidden", opacity : 0 },
      onClick: this.handleClick,
      // ES6 "fill" to create array with 9 equal elements
      matrix: Array(9).fill(""),
      // last turn X or O
      lastTurn: "",
      //who is the winner
      winner: "",
      matrixCSS:Array(9).fill({color:"white"}),
      animated:""
    })
    this.randomPickFirstMove() 
  }


  autoHandleClick = () => {
    let turn = (this.state.lastTurn === "X")?"O":"X"
    let targetBox = getRightMove(this.state.matrix,this.state.machine,turn)
    console.log('target:' + targetBox)
    let newMatrix = this.state.matrix;
    newMatrix[targetBox] = this.state.lastTurn === "X"?"O":"X";
    console.log('new matrix' + newMatrix)
    this.setState({
      matrix: newMatrix,
      lastTurn:(this.state.lastTurn==="X"?"O":"X")}
    ,() => {this.checkWinCondition()})
  } 


  handleClick = (e) => {
    const target = e.target.className;
    if (e.target.innerText === "" && (this.state.lastTurn === this.state.machine || this.state.lastTurn === ""))   {
    this.setState(() => {
      //iterating through state array changing  element if its index equal to clicked div identifier(class)
      let matrix = this.state.matrix.map((item, j) => {
        if (j === Number(target) && item==="") {
          return this.state.lastTurn==="X"?"O":"X";
        } else {
          return item;
        }
      });
      //returning renewed state
      return {matrix: matrix,
              lastTurn:(this.state.lastTurn === "X" ? "O" : "X")};
    },() => {
      this.checkWinCondition();
    });
    };

  }
    
  render(){
    //creating 9 Box Components via mapping
    const boxs = this.state.matrix.map((value,index) => 
      <Box data={index} turn={value} onClick={this.state.onClick} css={this.state.matrixCSS[index]} animated={this.state.animated}/>
    );
    //
    const showCurrentPlayer = () => {
        //first checking that game is still on, no winner yet
        if (this.state.winner === '') {
          //Machine haven't made its move yet, or it made last move or it is a draw (no empty boxes left) => return Human
          if (this.state.machine === ('' || this.state.lastTurn) ||
            (this.state.matrix.find(X => X !== "") === undefined)) {
            return "Human"
          } else {
            return "Machine"
          }
        }
        //there is a winner, so no next move
        return ""
    }

    const showWinner = () => {
      switch(this.state.winner) {
        case "Machine":
          return "Machine is THE winner!!!"
        case "Human":
          return "Human is THE winner!!!"
        case "DRAW":
          return "DRAW"
      }
    }

    // Returning JSX content
   return (
    <div >
      {/* Game */}
      <div className="App" style={{left:(this.state.winner === ''?"30vw":"10vw")}}>
        <h1 >Let's Play the Game <br></br>Next turn <span>{showCurrentPlayer()}</span></h1> 
        {boxs}
      </div>

      {/* Result */}
      <h1 className="result" style={{opacity:(this.state.winner === '' ? 0 : 1)}}>{showWinner()}</h1>
      <button onClick={this.newGame} style={this.state.newGameButtonStyles}>NEW GAME</button>  
    </div>
  );
  }; 
};
