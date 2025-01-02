import { Container } from '@mui/material'
import PieceSizeSelect from './PieceSizeSelect'
import PenTerrainSelect from './PenTerrainSelect'
import RotationSelect from './RotationSelect'
import UndoRedoButtonGroup from './UndoRedoButtonGroup'
import ViewingLevelInput from './ViewingLevelInput'

const Controls = () => {
  return (
    <Container sx={{ padding: 1 }}>
      <UndoRedoButtonGroup />
      <PenTerrainSelect />
      <PieceSizeSelect />
      <RotationSelect />
      {/* <MapLensToggles /> */}
      <ViewingLevelInput />
    </Container>
  )
}

export default Controls
