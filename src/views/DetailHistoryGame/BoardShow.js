import React from 'react';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //white goes first
      'isWhite': true,
      //this sets up an empty board
      //"+"" represenets an empty square, "b" is a black stone and "w" is a white stone
      'grid': Array(20).fill().map(x => Array(20).fill("+")),
      matrix: null
    };
  }



  //generate a new empty grid and set it to the grid state with setState
  handleReset() {
    let newGrid = Array(20).fill().map(x => Array(20).fill("+"));
    this.setState({ 'grid': newGrid });
  }


  render() {
    const history = this.props.matrix;
    const indexClick = this.props.indexClick;
    const winningLine = this.props.winningLine;
    //define styles for the <table> element in the return() function below
    const style = {
      textAlign: "center",
      marginLeft: "20px",
      height: "auto",
      width: "500px",
      border: "1px solid black",
    };
    const g = this.state.grid;
    //loop through the squares in each row and generate a new Square component,
    //passing in props to the Square component in the nested map() function
    var k = 0;
    var indexWinningLine = 0;
    const board = g.map((row, i) => {
      return (
        <tr key={"row_" + i}>
          {row.map((col, j) => {
            var data = {color: '', player: ''};
            if(history !== undefined && k < history.length && i*20 + j === history[k]['index']){
              data.color = history[k]['player'] === 1 ? 'red' : 'blue';
              data.player = history[k]['player'] === 1 ? 'X' : 'O';
              k++;
            }

            var colorWiningLine  = false;
            if(winningLine !== undefined && indexWinningLine < winningLine.length && i*20 + j === winningLine[indexWinningLine]){
            //  colorWiningLine = "#e4e4a1";
              colorWiningLine = true;
              indexWinningLine++;
            }
            //set the color of the square based on state.grid e4e4a1
            const color_ = i*20 + j === indexClick ? '#5bc0de' : (colorWiningLine ? "#e4e4a1" : "white");
            return (
              <Square color={color_} key={i + "_" + j} data={data}/>
            )
          }
          )
          }
        </tr>)
    });

    //returns the board with the Square Components in {board},
    //as well as a simple Button component that takes the handleReset function as a prop
    //this could be further refactored to separate the layout and styling, but it isn't that complicated so I will leave it like this
    return (
      <div style={{ textAlign: 'left' }}>
        <div style={{ width: "50%" }}>
          <table cellSpacing="0" style={style}>
            <tbody>
              {board}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

class Square extends React.Component {
  render() {
    const color_ = this.props.color;
    const data = this.props.data;

    return (
      <td
        style={{
          overflow: 'hidden',
          width: '30px',
          height: '30px',
          minHeight: '30px',
          maxHeight: '30px',
          backgroundColor: color_,

        }}
        onClick={this.props.handleClick} >
          
        <div
          style={{
            border: "1px solid black",
            height: 30,
            width: 30,
            fontWeight: 'bold',
            color: data.color 
          }} >
               {data.player}
        </div>
      </td>
    )
  }
}