import { Button } from '@mui/material'
import useAppState from '../store/store'

const DEVLogSomethingCoolButton = () => {
  const boardHexes = useAppState((state) => state.boardHexes)
  const hexMap = useAppState((state) => state.boardHexes)
  const onClick = () => {
    console.log("🚀 ~ hexMap:", hexMap)
    console.log('🚀 ~ boardHexes:', boardHexes)
  }
  return (
    <Button variant="contained" onClick={onClick}>
      Log current state (or w/e)
    </Button>
  )
}

export default DEVLogSomethingCoolButton
