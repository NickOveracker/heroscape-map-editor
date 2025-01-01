import { Container } from '@mui/material'
import DEVLogSomethingCoolButton from './DEVLogSomethingCoolButton'
import PieceSizeSelect from './PieceSizeSelect'
import PenTerrainSelect from './PenTerrainSelect'
import RotationSelect from './RotationSelect'
import UndoRedoButtonGroup from './UndoRedoButtonGroup'
import ControlButtonGroup from './ControlButtonGroup'
import CameraControlsButtonGroup from './TakePictureButtonGroup'
import ViewingLevelInput from './ViewingLevelInput'
import { CameraControls } from '@react-three/drei'

const Controls = ({
  cameraControlsRef
}: {
  cameraControlsRef: React.RefObject<CameraControls>
}) => {
  return (
    <Container sx={{ padding: 1 }}>
      <UndoRedoButtonGroup />
      <PenTerrainSelect />
      <PieceSizeSelect />
      <RotationSelect />
      {/* <MapLensToggles /> */}
      <CameraControlsButtonGroup cameraControlsRef={cameraControlsRef} />
      <ControlButtonGroup>
        <DEVLogSomethingCoolButton />
      </ControlButtonGroup>
      <ViewingLevelInput />
    </Container>
  )
}

export default Controls
