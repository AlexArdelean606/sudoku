import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler } from "react"

type SudokuCellType = {
  numberValue: string | number
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>
  handleFocus: React.FocusEventHandler<HTMLInputElement>
  prefilled?: boolean
  candidates: string[]
}

export function SudokuCell({ candidates = [], prefilled = false, numberValue, handleInputChange, handleFocus }: SudokuCellType) {

  return (
    <div className='sudokuCell'>
      <input value={numberValue} className={`cellInput ${prefilled ? 'prefilled' : ''}`} onFocus={handleFocus} onChange={handleInputChange} />
      {!prefilled && !numberValue && (<div className="cellCandidates">
        <div id='1' className="cellCandidate">{candidates.includes('1') ? '1' : ' '}</div>
        <div id='2' className="cellCandidate">{candidates.includes('2') ? '2' : ' '}</div>
        <div id='3' className="cellCandidate">{candidates.includes('3') ? '3' : ' '}</div>
        <div id='4' className="cellCandidate">{candidates.includes('4') ? '4' : ' '}</div>
        <div id='5' className="cellCandidate">{candidates.includes('5') ? '5' : ' '}</div>
        <div id='6' className="cellCandidate">{candidates.includes('6') ? '6' : ' '}</div>
        <div id='7' className="cellCandidate">{candidates.includes('7') ? '7' : ' '}</div>
        <div id='8' className="cellCandidate">{candidates.includes('8') ? '8' : ' '}</div>
        <div id='9' className="cellCandidate">{candidates.includes('9') ? '9' : ' '}</div>
      </div>)}
    </div>
  )
}