import { Button } from '@mui/material'
import { MdCameraswitch, MdPhotoCamera } from 'react-icons/md'
import { EVENTS } from '../utils/constants'
import useEvent from '../hooks/useEvent'
import useBoundStore from '../store/store'
import ControlButtonGroup from './ControlButtonGroup'
import React from 'react'
import ToggleCameraButton from './ToggleCameraButton'
import { CameraControls } from '@react-three/drei'
import { RiRestartLine } from 'react-icons/ri'

const CameraControlsButtonGroup = ({
  cameraControlsRef
}: {
  cameraControlsRef: React.RefObject<CameraControls>
}) => {
  const { publish } = useEvent()
  const toggleIsTakingPicture = useBoundStore((s) => s.toggleIsTakingPicture)
  const isTakingPicture = useBoundStore((s) => s.toggleIsTakingPicture)
  const takePictureTimeout = React.useRef<number>(null!);
  const toggleIsOrthoCam = useBoundStore(s => s.toggleIsOrthoCam)
  const isOrthoCam = useBoundStore(s => s.isOrthoCam)
  React.useEffect(() => {
    // clear the timeout after we take a picture
    if (!isTakingPicture) {
      clearTimeout(takePictureTimeout.current);
    }
  }, [isTakingPicture])
  const resetCamera = () => {
    cameraControlsRef?.current?.reset(true)
  }
  const handleToggleOrthoCam = () => {
    toggleIsOrthoCam(!isOrthoCam)
  }
  const handleTakePicturePng = () => {
    toggleIsTakingPicture(true)
    takePictureTimeout.current = setTimeout(() => {
      publish(EVENTS.savePng)
    }, 100); // Long enough to make some changes to the map and render
  }
  const handleTakePictureJpg = () => {
    toggleIsTakingPicture(true)
    takePictureTimeout.current = setTimeout(() => {
      publish(EVENTS.saveJpg)
    }, 100); // Long enough to make some changes to the map and render
  }

  return (
    <ControlButtonGroup>
      <Button
        startIcon={<RiRestartLine />}
        onClick={resetCamera}
        variant="contained"
      >
        Reset Camera Zoom/Position
      </Button>
      <Button
        startIcon={<MdCameraswitch />}
        onClick={handleToggleOrthoCam}
        variant="contained"
      >
        Toggle Camera Type
      </Button>
      <ToggleCameraButton />
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
export default CameraControlsButtonGroup
