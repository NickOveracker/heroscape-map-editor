import { Button } from '@mui/material'
import { MdPhotoCamera } from 'react-icons/md'
import { EVENTS } from '../utils/constants'
import useEvent from '../hooks/useEvent'
import useBoundStore from '../store/store'
import ControlButtonGroup from './ControlButtonGroup'

const TakePictureButtonGroup = () => {
  const { publish } = useEvent()
  const toggleIsTakingPicture = useBoundStore((s) => s.toggleIsTakingPicture)
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
