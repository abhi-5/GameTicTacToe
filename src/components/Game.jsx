import React, { Component } from 'react';
import Board from './Board';

class Game extends Component {
    state = { 
        history: [{
            squares: Array(9).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true,
     }

     handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
    
        squares[i] = this.state.xIsNext ? 'X' : 'O';
    
        this.setState({
          history: history.concat([{
            squares: squares
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
      }

      handleReset = () => {
          this.setState({ stepNumber : this.state.stepNumber = 0})
      }

      jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) ? false : true,
        });
      }

      renderGame(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;
       
        if (winner) return  <button onClick={this.handleReset} className="btn btn-primary btn-md">New Game</button>
        
         return (
                <button onClick={this.handleReset} className="btn btn-primary btn-md">Reset Game</button>
         )
      }

    render() { 
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        console.log(current.squares)
        console.log(history)

        const winner = calculateWinner(current.squares);
        let status;
       
        if (winner) {
          status = 'Winner: ' + winner;
        } 
        else {
          status = 'Move: ' + (this.state.xIsNext ? 'X' : 'O');
        }
       
    
      
        return ( 
                <div className="game container text-center">
                  <div >
                  <div className="game-info">
                    <div> <h5> {status} </h5></div>
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                    <br/>
                    {this.renderGame()}
                 </div>                       
                        
                </div>

               </div>
         );
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
 
export default Game;