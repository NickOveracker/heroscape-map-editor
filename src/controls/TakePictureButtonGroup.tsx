import { Button } from '@mui/material'
import { MdCameraswitch, MdPhotoCamera } from 'react-icons/md'
import { EVENTS } from '../utils/constants'
import useEvent from '../hooks/useEvent'
import useBoundStore from '../store/store'
import ControlButtonGroup from './ControlButtonGroup'

const TakePictureButtonGroup = () => {
  const { publish } = useEvent()
  const toggleIsTakingPicture = useBoundStore((s) => s.toggleIsTakingPicture)
  const toggleIsOrthoCam = useBoundStore(s => s.toggleIsOrthoCam)
  const isOrthoCam = useBoundStore(s => s.isOrthoCam)

  const handleToggleOrthoCam = () => {
    toggleIsOrthoCam(!isOrthoCam)
    publish(EVENTS.toggleOrthoCam)
  }
  const handleTakePicturePng = () => {
    toggleIsTakingPicture(true)
    publish(EVENTS.savePng)
  }
  const handleTakePictureJpg = () => {
    toggleIsTakingPicture(true)
    publish(EVENTS.saveJpg)
  }

  return (
    <ControlButtonGroup>
      <Button
        startIcon={<MdCameraswitch />}
        onClick={handleToggleOrthoCam}
        variant="contained"
      >
        Toggle Camera Type
      </Button>
      <Button
        startIcon={<MdPhotoCamera />}
        onClick={handleTakePicturePng}
        variant="contained"
      >
        Save current camera view as PNG
      </Button>
      <Button
        startIcon={<MdPhotoCamera />}
        onClick={handleTakePictureJpg}
        variant="contained"
      >
        Save current camera view as JPG
      </Button>
    </ControlButtonGroup>
  )
}
export default TakePictureButtonGroup
