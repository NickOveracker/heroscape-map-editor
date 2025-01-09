import { Button, Container } from '@mui/material'
import PieceSizeSelect from './PieceSizeSelect'
import PenTerrainSelect from './PenTerrainSelect'
import RotationSelect from './RotationSelect'
import UndoRedoButtonGroup from './UndoRedoButtonGroup'
import ViewingLevelInput from './ViewingLevelInput'
import useBoundStore from '../store/store'

const Controls = () => {
  const boardHexes = useBoundStore((s) => s.boardHexes)
  const boardPieces = useBoundStore((s) => s.boardPieces)
  const hexMap = useBoundStore((s) => s.hexMap)
  const handleClickAddLeftRow = () => {
    const boardHexArr = Object.values(boardHexes)
    console.log("🚀 ~ handleClickAddLeftRow ~ boardHexArr:", boardHexArr)
  }
  return (
    <Container sx={{ padding: 1 }}>
      <Button onClick={handleClickAddLeftRow}>Add left column</Button>
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
