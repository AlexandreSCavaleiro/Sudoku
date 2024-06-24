import {useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const placeHolder = [
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1,-1,-1,-1]
]


function App() {
  const[sudokuAtual, setSudokuAtual] = useState(getDeepCopy(placeHolder));
  const[initial, setInitial] = useState(getDeepCopy(placeHolder));
  const[solved, setSolved] = useState(getDeepCopy(placeHolder));

  useEffect(()=>{
    const randomCard = Math.floor(Math.random() * 27);

    fetch(`http://localhost:8000/sudoku/${randomCard}`)
      .then(response => {
        return response.json();
      })
      .then(mensagemJson =>{
        setInitial(getDeepCopy(mensagemJson.jsonSudoku));
        setSudokuAtual(getDeepCopy(mensagemJson.jsonSudoku));
      });

      fetch(`http://localhost:8000/solvedsudoku/${randomCard}`)
      .then(response => {
        return response.json();
      })
      .then(mensagemJson =>{
        setSolved(getDeepCopy(mensagemJson.jsonSudoku));
      });

  },[]);

  useEffect(()=>{
    limpaCell()
  },[sudokuAtual])

  function getDeepCopy(arr){
    return JSON.parse(JSON.stringify(arr));
  }

  function onInputChange(e, row, col){
    var val = parseInt(e.target.value) || -1, grid = getDeepCopy(sudokuAtual);
    if(val === -1 || val >=1 && val <=9){ //valores da celula so podem ser  1-9 
      grid[row][col] = val
    }
    setSudokuAtual(grid)
  }

  function limpaCell(){
    for (let i = 0; i < sudokuAtual.length; i++) {
      for (let j = 0; j < sudokuAtual[i].length; j++) {
          document.getElementById(`${i}${j}`).className = "celulaSudoku";
      }
    }
  }

  function resetaSudoku(){ setSudokuAtual(getDeepCopy(initial)); }

  function resolveSudoku(){ setSudokuAtual(getDeepCopy(solved)); }

  function checarSudoku(){
    for (let i = 0; i < sudokuAtual.length; i++) {
      for (let j = 0; j < sudokuAtual[i].length; j++) {
        
        if(sudokuAtual[i][j] != -1 && sudokuAtual[i][j] != solved[i][j]){
          document.getElementById(`${i}${j}`).className = "celulaSudokuERRADA";
        }
      
      }
    }
  }
 
  return (
    <div className="App">
      <div className="App-header">
        <h3>Sudoku Pw4</h3>
        <table>
          <tbody>
            {
              [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row,rIndex) =>{
                return <tr key={rIndex} className={(row + 1) %3 === 0 ? 'linhaBaixo' : ''}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col,cIndex) => {
                    return <td key={rIndex + cIndex} className={(col + 1) %3 === 0 ? 'linhaLado' : ''}>
                      <input 

                        id={`${row}${col}`}
                        onChange={(e)=> onInputChange(e,row,col)} 
                        value={sudokuAtual[row][col] === -1 ? '': sudokuAtual[row][col]} 
                        className="celulaSudoku"
                        disabled={initial[row][col] !== -1}
                        />
                    </td>
                })}
                </tr>
              })
            }
            
          </tbody>
        </table>
        <div className='buttons'>
          <button className='resolveBt' onClick={resolveSudoku}>Resolver</button>
          <button className='checaBt' onClick={checarSudoku}>Checar</button>
          <button className='resetaBt' onClick={resetaSudoku}>Resetar</button>
        </div>
      </div>
    </div>
  );
}

export default App;
