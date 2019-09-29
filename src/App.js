import React from 'react';
import './App.css';
import Box from './Box';


class App extends React.Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this); DO I NEED THIS?
    this.state = {
      onClick: this.handleClick,
      // ES6 "fill" to create array with 9 equal elements
      matrix: Array(9).fill(""),
      // last turn X or O
      lastTurn: "",
      //who is the winner
      winner: "",
      matrixCSS:Array(9).fill({color:"white"})};
  };
  processWinner = (arrayCSS) => {
    this.setState({winner:this.state.lastTurn,
      lastTurn:(this.state.lastTurn==="X"?"O":"X"),
      onClick: '',
      matrixCSS:this.state.matrixCSS.map((item,index)=>{
        if (arrayCSS.indexOf(index)>-1){
          return {color:"red"};
        }
        else {
          return {color:"white"};
        } 
      })
  })};
  //Handling clicks 
  handleClick = (e) => {
    //saving clicked div Class to targetName
    let targetName = e.target.className
    //using a function to set state
    this.setState(() => {
      //iterating through state array changing  element if its index equal to clicked div identifier(class)
      let matrix = this.state.matrix.map((item, j) => {
        if (j === Number(targetName) && item==="") {
          return this.state.lastTurn==="X"?"O":"X";
        } else {
          return item;
        }
      });
      //returning renewed state
      return {matrix: matrix,lastTurn:(this.state.lastTurn==="X"?"O":"X")};
    },()=>{ // callBack to check WIN conditions after new matrix is generated
        let m = this.state.matrix;
        if   (m[0] && m[0]===m[1] && m[1]===m[2]) {
          this.processWinner([0,1,2])
        }
        else if (m[3] && m[3]===m[4] && m[4]===m[5]) {
          this.processWinner([3,4,5])
        }
        else if (m[6] && m[6]===m[7] && m[7]===m[8]) {
          this.processWinner([6,7,8])
        }
        else if (m[0] && m[0]===m[3] && m[3]===m[6]) {
          this.processWinner([0,3,6])
        }
        else if (m[1] && m[1]===m[4] && m[4]===m[7]) {
          this.processWinner([1,4,7])
        }
        else if (m[2] && m[2]===m[5] && m[5]===m[8]) {
          this.processWinner([2,5,8])
        }
        else if (m[0] && m[0]===m[4] && m[4]===m[8]) {
          this.processWinner([0,4,8])
        }
        else if (m[2] && m[2]===m[4] && m[4]===m[6]) {
          this.processWinner([2,4,6])
        }
        else if (m.indexOf("")===-1) {
          this.setState({winner:"DRAW",
            lastTurn:(this.state.lastTurn==="X"?"O":"X"),
            onClick: '',
            matrixCSS:Array(9).fill({color:"red"})
        });
      }
    })
  }

    
  render(){
    const boxs = this.state.matrix.map((value,index) => 
    //spawning 9 Box Components
    <Box data={index} turn={value} onClick={this.state.onClick} css={this.state.matrixCSS[index]}/>
  );
 
  return (
    <div >
      <div className="App" style={{left:(this.state.winner===''?"30vw":"10vw")}}>
        <h1 >Let's Play the Game <br></br>Turn: {this.state.lastTurn==="X"?"O":"X"}</h1> 
        {boxs}
      </div>
      <h1 className="result" style={{opacity:(this.state.winner===''?0:1)}}>{(this.state.winner==="X")?"X is THE winner!!!":(this.state.winner==="O"?"O is THE winner!!!":(this.state.winner==="DRAW"?"DRAW!!!":""))}</h1>
    </div>
  );
}; 
};

export default App;
