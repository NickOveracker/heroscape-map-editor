import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import React from 'react';
import { MdCameraswitch, MdOutlineVideocam, MdOutlineVideocamOff, MdPhotoCamera } from 'react-icons/md';
import useBoundStore from '../store/store';
import { RiRestartLine } from 'react-icons/ri';
import useEvent from '../hooks/useEvent';
import { EVENTS } from '../utils/constants';
import { CameraControls } from '@react-three/drei';


export default function CameraSpeedDial({
  cameraControlsRef
}: {
  cameraControlsRef: React.RefObject<CameraControls>
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { publish } = useEvent()
  const toggleIsTakingPicture = useBoundStore((s) => s.toggleIsTakingPicture)
  const isTakingPicture = useBoundStore((s) => s.toggleIsTakingPicture)

  const toggleIsOrthoCam = useBoundStore(s => s.toggleIsOrthoCam)
  const isOrthoCam = useBoundStore(s => s.isOrthoCam)
  const isCamerDisabled = useBoundStore((s) => s.isCameraDisabled)
  const toggleIsCameraDisabled = useBoundStore(
    (s) => s.toggleIsCameraDisabled,
  )

  // this timeout gives the World enough time to re-render without empty hexes etc.
  const takePictureTimeout = React.useRef<number>(null!);
  // effect: clear the timeout after we take a picture
  React.useEffect(() => {
    if (!isTakingPicture) {
      clearTimeout(takePictureTimeout.current);
    }
  }, [isTakingPicture])

  const onClickDisableCamera = (e: any) => {
    console.log("🚀 ~ onClickDisableCamera ~ e:", e.nativeEvent.target.id)
    toggleIsCameraDisabled(!isCamerDisabled)
    setOpen(false)
  }
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
    <SpeedDial
      ariaLabel="camera-speed-dial"
      sx={
        {
          position: 'absolute', bottom: 16, left: '2rem',
          // Style the button red when camera is disabled
          ['.MuiSpeedDial-fab']: {
            ...(isCamerDisabled ? { backgroundColor: 'red', color: 'white' } : {})
          }
        }
      }
      icon={isCamerDisabled ? <MdOutlineVideocamOff id='camera-unlock-icon' style={{ backgroundColor: 'red', color: 'white' }} /> : <MdOutlineVideocam id='camera-lock-icon' />}
      transitionDuration={100}
      direction="right"
      title={isCamerDisabled ? 'Unlock camera' : 'Lock camera'}
      open={open}
      onClick={e => onClickDisableCamera(e)}
      onClose={handleClose}
      onOpen={handleOpen}
    >
      <SpeedDialAction
        icon={<RiRestartLine />}
        tooltipTitle={'Reset'}
        onClick={resetCamera}
      />
      <SpeedDialAction
        icon={<RiRestartLine />}
        tooltipTitle={'Reset'}
        onClick={resetCamera}
      />
      <SpeedDialAction
        icon={<MdCameraswitch />}
        tooltipTitle={isOrthoCam ? 'Perspective' : 'Orthographic'}
        onClick={handleToggleOrthoCam}
      />
      <SpeedDialAction
        icon={<MdPhotoCamera />}
        tooltipTitle={'.PNG'}
        onClick={handleTakePicturePng}
      />
      <SpeedDialAction
        icon={<MdPhotoCamera />}
        tooltipTitle={'.JPG'}
        onClick={handleTakePictureJpg}
      />
    </SpeedDial>
  );
}