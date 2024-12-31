import { Container } from '@mui/material'
import DEVLogSomethingCoolButton from './DEVLogSomethingCoolButton'
import PieceSizeSelect from './PieceSizeSelect'
import PenTerrainSelect from './PenTerrainSelect'
import RotationSelect from './RotationSelect'
import UndoRedoButtonGroup from './UndoRedoButtonGroup'
import ControlButtonGroup from './ControlButtonGroup'
import TakePictureButtonGroup from './TakePictureButtonGroup'
import ViewingLevelInput from './ViewingLevelInput'

const Controls = () => {
  return (
    <Container sx={{ padding: 1 }}>
      <UndoRedoButtonGroup />
      <PenTerrainSelect />
      <PieceSizeSelect />
      <RotationSelect />
      {/* <MapLensToggles /> */}
      <TakePictureButtonGroup />
      <ControlButtonGroup>
        <DEVLogSomethingCoolButton />
      </ControlButtonGroup>
      <ViewingLevelInput />
    </Container>
  )
}

export default Controls
