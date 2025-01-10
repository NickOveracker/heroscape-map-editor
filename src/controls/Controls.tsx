import { Button, Container } from '@mui/material'
import PieceSizeSelect from './PieceSizeSelect'
import PenTerrainSelect from './PenTerrainSelect'
import RotationSelect from './RotationSelect'
import UndoRedoButtonGroup from './UndoRedoButtonGroup'
import ViewingLevelInput from './ViewingLevelInput'
import useBoundStore from '../store/store'
import { HexTerrain } from '../types'

const Controls = () => {
  const boardHexes = useBoundStore((s) => s.boardHexes)
  const boardPieces = useBoundStore((s) => s.boardPieces)
  const hexMap = useBoundStore((s) => s.hexMap)
  const handleClickAddLeftRow = () => {
    const boardHexArr = Object.values(boardHexes)

    const maxX = Math.max(...boardHexArr.map(bh => bh.q - bh.s))
    const rightColumn = boardHexArr.filter(bh => bh.q - bh.s === maxX || bh.q - bh.s === (maxX - 1))
    const isRightSideEmpty = rightColumn.every(bh => bh.terrain === HexTerrain.empty)
    const leftColumn = boardHexArr.filter(bh => bh.s - bh.q === -1 || bh.s - bh.q === 0)
    const isLeftSideEmpty = leftColumn.every(bh => bh.terrain === HexTerrain.empty)


    const maxY = Math.max(...boardHexArr.map(bh => bh.r - bh.s - bh.q))
    const bottomRow = boardHexArr.filter(bh => (bh.r - bh.s - bh.q === maxY) || (bh.r - bh.s - bh.q === maxY - 2))
    const isBottomRowEmpty = bottomRow.every(bh => bh.terrain === HexTerrain.empty)
    const topRow = boardHexArr.filter(bh => bh.q + bh.s - bh.r === 0)
    const isTopRowEmpty = topRow.every(bh => bh.terrain === HexTerrain.empty)
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
