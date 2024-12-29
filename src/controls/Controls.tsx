import { Container } from '@mui/material'
import DEVLogSomethingCoolButton from './DEVLogSomethingCoolButton'
import PieceSizeSelect from './PieceSizeSelect'
import PenTerrainSelect from './PenTerrainSelect'
import ToggleCameraButton from './ToggleCameraButton'
import RotationSelect from './RotationSelect'
import UndoRedoButtonGroup from './UndoRedoButtonGroup'
import ControlButtonGroup from './ControlButtonGroup'

const Controls = () => {
  return (
    <Container sx={{ padding: 1 }}>
      <UndoRedoButtonGroup />
      <PenTerrainSelect />
      <PieceSizeSelect />
      <RotationSelect />
      {/* <MapLensToggles /> */}
      {/* <TakePictureButtonGroup /> */}
      <ControlButtonGroup>
        <ToggleCameraButton />
        <DEVLogSomethingCoolButton />
      </ControlButtonGroup>
    </Container>
  )
}

export default Controls
