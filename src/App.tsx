import React, { useState, useEffect } from 'react'
import './App.css'
import { SudokuCell } from './components/SudokuCell'

enum INPUT_MODE {
  NUMBER,
  CORNERS
}

const initialGrid = [
  [6, 1, 3, 0, 7, 9, 0, 0, 0],
  [0, 2, 0, 0, 3, 0, 0, 0, 6],
  [0, 0, 0, 0, 6, 0, 0, 2, 0],
  [8, 0, 0, 0, 0, 6, 3, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 4, 6, 3, 1, 7, 8, 9, 0],
  [0, 0, 1, 7, 2, 3, 6, 0, 4],
  [2, 6, 0, 8, 0, 0, 7, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 9],
]

const initialCandidates = [
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
  [[], [], [], [], [], [], [], [], []],
]

function App() {

  const [mode, setMode] = useState<INPUT_MODE>(INPUT_MODE.NUMBER)

  const getDeepCopy = (arr: number[][] | number[][][] | string[][] | string[][][]) => {
    return JSON.parse(JSON.stringify(arr))
  }

  const [sudokuGrid, setSudokuGrid] = useState<number[][]>(getDeepCopy(initialGrid))
  const [sudokuCandidates, setSudokuCandidates] = useState<string[][][]>(getDeepCopy(initialCandidates))

  const handleFocus = (e: any, row: number, col: number): any => {
    console.log('lookin at row@' + row + '| col@' + col + ' => ' + e.target.value)
  }

  const handleInputChange = (e: any, row: number, col: number): any => {
    let val = e.target.value.slice(-1)

    console.log(e.target.value)

    if (mode === INPUT_MODE.NUMBER) {
      let grid = getDeepCopy(sudokuGrid)

      if (val === '' || (1 <= parseInt(val) && parseInt(val) <= 9)) {
        grid[row][col] = (grid[row][col] === val ? '' : val)
      }

      setSudokuGrid(grid)
    }

    else {
      let candidates = getDeepCopy(sudokuCandidates)

      if (val === '' || (1 <= parseInt(val) && parseInt(val) <= 9)) {
        let cellCandids = candidates[row][col]
        let index = cellCandids.indexOf(val);
        if (index !== -1) {
          cellCandids.splice(index, 1);
        }
        else {
          cellCandids.push(val)
        }
      }

      setSudokuCandidates(candidates)
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <h3>Sudoku</h3>

        <table>
          <tbody>
            {
              [0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIdx) => {
                return (
                  <tr key={rIdx}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIdx) => {
                      return (
                        <td key={rIdx + cIdx} className={`${((col + 1) % 3) === 0 ? 'rBorder' : ''} ${((row + 1) % 3) === 0 ? 'bBorder' : ''}`}>
                          <SudokuCell
                            numberValue={sudokuGrid[row][col] ? sudokuGrid[row][col] : ''}
                            handleInputChange={(e) => handleInputChange(e, row, col)}
                            handleFocus={(e) => handleFocus(e, row, col)}
                            prefilled={initialGrid[row][col] > 0}
                            candidates={sudokuCandidates[row][col]}
                          />
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <p>
          <button disabled={mode === INPUT_MODE.NUMBER} onClick={() => setMode(INPUT_MODE.NUMBER)} >
            Number
          </button>

          <button disabled={mode === INPUT_MODE.CORNERS} onClick={() => setMode(INPUT_MODE.CORNERS)} >
            Corners
          </button>
        </p>
      </div>
    </div>
  )
}

export default App
