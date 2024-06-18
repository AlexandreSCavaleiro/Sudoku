import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const initial = [
  [-1, 5, -1, 9, -1, -1, -1, -1, -1],
  [8, -1, -1, -1, 4, -1, 3, -1, 7],
  [-1, -1, -1, 2, 8, -1, 1, 9, -1],
  [5, 3, 8, 6, -1, 7, 9, 4, -1],
  [-1, 2, -1, 3, -1, 1, -1, -1, -1],
  [1, -1, 9, 8, -1, 4, 6, 2, 3],
  [9, -1, 7, 4, -1, -1, -1, -1, -1],
  [-1, 4, 5, -1, -1, -1, 2, -1, 9],
  [-1, -1, -1, -1, 3, -1, -1, 7, -1]
]

function App() {
  const[sudoku, setSudoku] = useState(getDeepCopy(initial));

  function getDeepCopy(arr){
    return JSON.parse(JSON.stringify(arr));
  }

  function onInputChange(e, row, col){
    var val = parseInt(e.target.value) || -1, grid = getDeepCopy(sudoku);
    if(val === -1 || val >=1 && val <=9){ //valores da celula so podem ser  1-9 
      grid[row][col] = val
    }
    setSudoku(grid)
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
                        onChange={(e)=> onInputChange(e,row,col)} 
                        value={sudoku[row][col] === -1 ? '': sudoku[row][col]} 
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
          <button className='resolveBt'>Resolver</button>
          <button className='checaBt'>Checar</button>
          <button className='resetaBt'>Resetar</button>
        </div>
      </div>
    </div>
  );
}

export default App;
