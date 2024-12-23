import { Button } from '@mui/material'
import useBoundStore from '../store/store'

const DEVLogSomethingCoolButton = () => {
  const appState = useBoundStore((state) => state)
  const onClick = () => {
    console.info({ boardHexes: appState.boardHexes, pieces: appState.boardPieces, hexMap: appState.hexMap, state: appState })
  }
  return (
    <Button variant="contained" onClick={onClick}>
      Log app state to console
    </Button>
  )
}

export default DEVLogSomethingCoolButton