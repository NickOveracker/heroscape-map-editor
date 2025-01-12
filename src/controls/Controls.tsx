import { Button, Container } from '@mui/material'
import PieceSizeSelect from './PieceSizeSelect'
import PenTerrainSelect from './PenTerrainSelect'
import RotationSelect from './RotationSelect'
import UndoRedoButtonGroup from './UndoRedoButtonGroup'
import ViewingLevelInput from './ViewingLevelInput'
import useBoundStore from '../store/store'
import { BoardPieces, HexTerrain } from '../types'
import { HEX_DIRECTIONS, hexUtilsAdd } from '../utils/hex-utils'
import { decodePieceID, genBoardHexID, genPieceID } from '../utils/map-utils'

const Controls = () => {
  const boardHexes = useBoundStore((s) => s.boardHexes)
  const boardPieces = useBoundStore((s) => s.boardPieces)
  const hexMap = useBoundStore((s) => s.hexMap)
  const logState = () => {
    console.log("🚀 ~ Controls ~ boardPieces:", boardPieces)
  }
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

    const newBoardHexes = boardHexArr.map(bh => {
      const newCoords = hexUtilsAdd(bh, HEX_DIRECTIONS[0])
      const newID = genBoardHexID({ ...newCoords, altitude: bh.altitude })
    })
    const newBoardPieces = Object.keys(boardPieces).reduce((prev: any, pid: string) => {
      const {
        pieceID,
        altitude,
        rotation,
        // boardHexID,
        pieceCoords
      } = decodePieceID(pid)
      const newPieceCoords = hexUtilsAdd(pieceCoords, HEX_DIRECTIONS[0])
      const newBoardHexID = genBoardHexID({ ...newPieceCoords, altitude })
      const newPieceID = genPieceID(newBoardHexID, pieceID, rotation)
      return {
        ...prev,
        [newPieceID]: pieceID
      }
    }, {})
    console.log("🚀 ~ newBoardPieces ~ newBoardPieces:", newBoardPieces)
  }

  return (
    <Container sx={{ padding: 1 }}>
      <Button onClick={handleClickAddLeftRow}>Add left column</Button>
      <Button onClick={logState}>Log boardpieces</Button>
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
