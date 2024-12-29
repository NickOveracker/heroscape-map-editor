import { Container } from '@mui/material'
import DEVLogSomethingCoolButton from './DEVLogSomethingCoolButton'
import PieceSizeSelect from './PieceSizeSelect'
import PenTerrainSelect from './PenTerrainSelect'
import ToggleCameraButton from './ToggleCameraButton'
import RotationSelect from './RotationSelect'
import UndoRedoButtonGroup from './UndoRedoButtonGroup'
import ControlButtonGroup from './ControlButtonGroup'
import { LoadSaveMapButtons } from './LoadSaveMapButtons'

const Controls = () => {
  return (
    <Container sx={{ padding: 1 }}>
      <UndoRedoButtonGroup />
      <PenTerrainSelect />
      <PieceSizeSelect />
      <RotationSelect />
      {/* <MapLensToggles /> */}
      <ControlButtonGroup>
        <LoadSaveMapButtons />
      </ControlButtonGroup>
      {/* <TakePictureButtonGroup /> */}
      <ControlButtonGroup>
        <ToggleCameraButton />
        <DEVLogSomethingCoolButton />
      </ControlButtonGroup>
      {/* <Button onClick={() => useBoundStore.temporal.getState().clear()}>CLEAR</Button> */}
    </Container>
  )
}

export default Controls
