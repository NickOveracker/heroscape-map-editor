import { Button } from '@mui/material'
import useBoundStore from '../store/store'

const DEVLogSomethingCoolButton = () => {
  const appState = useBoundStore((state) => state)
  const onClick = () => {
    console.dir(appState.boardHexes)
  }
  return (
    <Button variant="contained" onClick={onClick}>
      Log app state to console
    </Button>
  )
}

export default DEVLogSomethingCoolButton