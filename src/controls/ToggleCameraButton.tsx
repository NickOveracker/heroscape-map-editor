import { Button } from '@mui/material'
import useBoundStore from '../store/store'
import { MdOutlineVideocam, MdOutlineVideocamOff } from 'react-icons/md'

const ToggleCameraButton = () => {
  const isCamerDisabled = useBoundStore((state) => state.isCameraDisabled)
  const toggleIsCameraDisabled = useBoundStore(
    (state) => state.toggleIsCameraDisabled,
  )
  const onClick = () => {
    toggleIsCameraDisabled(!isCamerDisabled)
  }
  return (
    <Button
      startIcon={isCamerDisabled ? <MdOutlineVideocam /> : <MdOutlineVideocamOff />}
      variant="contained"
      onClick={onClick}
    >
      Turn camera controls {isCamerDisabled ? 'ON' : 'OFF'}
    </Button>
  )
}

export default ToggleCameraButton
