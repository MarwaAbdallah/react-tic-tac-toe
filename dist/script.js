function Square(props) {
  return /*#__PURE__*/(
    React.createElement("button", { className: "square", onClick: props.onClick },
    props.value));


}

function Board(props) {
  function renderSquare(i) {
    return /*#__PURE__*/(
      React.createElement(Square, {
        value: props.squares[i],
        onClick: () => props.onClick(i) }));


  }

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { className: "board-row" },
    renderSquare(0),
    renderSquare(1),
    renderSquare(2)), /*#__PURE__*/

    React.createElement("div", { className: "board-row" },
    renderSquare(3),
    renderSquare(4),
    renderSquare(5)), /*#__PURE__*/

    React.createElement("div", { className: "board-row" },
    renderSquare(6),
    renderSquare(7),
    renderSquare(8))));



}

function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    const currentHistory = history.slice(0, stepNumber + 1);
    const currentStep = currentHistory[currentHistory.length - 1];
    const squares = currentStep.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";

    setHistory(currentHistory.concat([{ squares: squares }]));
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
    'Go to move #' + move :
    'Go to game start';
    return /*#__PURE__*/(
      React.createElement("li", { key: move }, /*#__PURE__*/
      React.createElement("button", { onClick: () => jumpTo(move) }, desc)));


  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return /*#__PURE__*/(
    React.createElement("div", { className: "game" }, /*#__PURE__*/
    React.createElement("div", { className: "game-board" }, /*#__PURE__*/
    React.createElement(Board, {
      squares: current.squares,
      onClick: i => handleClick(i) })), /*#__PURE__*/


    React.createElement("div", { className: "game-info" }, /*#__PURE__*/
    React.createElement("div", null, status), /*#__PURE__*/
    React.createElement("ol", null, moves))));



}

// ========================================

ReactDOM.render( /*#__PURE__*/React.createElement(Game, null), document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]];


  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}