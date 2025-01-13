import { Button, Container } from '@mui/material'
import PieceSizeSelect from './PieceSizeSelect'
import PenTerrainSelect from './PenTerrainSelect'
import RotationSelect from './RotationSelect'
import UndoRedoButtonGroup from './UndoRedoButtonGroup'
import ViewingLevelInput from './ViewingLevelInput'
import useBoundStore from '../store/store'
import { HexTerrain } from '../types'
import { HEX_DIRECTIONS, hexUtilsAdd } from '../utils/hex-utils'
import { decodePieceID, genBoardHexID, genPieceID } from '../utils/map-utils'
import { buildupJsonFileMap } from '../data/buildupMap'

const Controls = () => {
  const boardHexes = useBoundStore((s) => s.boardHexes)
  const boardPieces = useBoundStore((s) => s.boardPieces)
  const hexMap = useBoundStore((s) => s.hexMap)
  const loadMap = useBoundStore((s) => s.loadMap)

  const handleClickLogState = () => {
    console.log("🚀 ~ Controls ~ boardPieces:", boardPieces)
  }

  const handleClickRemoveLeftCol = () => {
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

    const newBoardPieces = Object.keys(boardPieces).reduce((prev: any, pid: string) => {
      const {
        pieceID,
        altitude,
        rotation,
        // boardHexID,
        pieceCoords
      } = decodePieceID(pid)
      const newPieceCoords = hexUtilsAdd(pieceCoords, HEX_DIRECTIONS[3])
      const newBoardHexID = genBoardHexID({ ...newPieceCoords, altitude })
      const newPieceID = genPieceID(newBoardHexID, pieceID, rotation)
      return {
        ...prev,
        [newPieceID]: pieceID
      }
    }, {})
    const newHexMap = {
      ...hexMap,
      height: hexMap.height - 1

    }
    const newMap = buildupJsonFileMap(newBoardPieces, newHexMap)
    loadMap(newMap)
  }
  const handleClickAddMapHeightX = () => {
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
    const newHexMap = {
      ...hexMap,
      height: hexMap.height + 1

    }
    const newMap = buildupJsonFileMap(newBoardPieces, newHexMap)
    loadMap(newMap)
  }
  const handleClickAddMapWidthY = () => {
    const newBoardPieces = Object.keys(boardPieces).reduce((prev: any, pid: string) => {
      const {
        pieceID,
        altitude,
        rotation,
        // boardHexID,
        pieceCoords
      } = decodePieceID(pid)
      const newPieceCoords = hexUtilsAdd(hexUtilsAdd(pieceCoords, HEX_DIRECTIONS[1]), HEX_DIRECTIONS[2])
      const newBoardHexID = genBoardHexID({ ...newPieceCoords, altitude })
      const newPieceID = genPieceID(newBoardHexID, pieceID, rotation)
      return {
        ...prev,
        [newPieceID]: pieceID
      }
    }, {})
    const newHexMap = {
      ...hexMap,
      width: hexMap.width + 2

    }
    const newMap = buildupJsonFileMap(newBoardPieces, newHexMap)
    loadMap(newMap)
  }

  return (
    <Container sx={{ padding: 1 }}>
      <Button onClick={handleClickAddMapHeightX}>Add left column</Button>
      <Button onClick={handleClickAddMapWidthY}>Add top row</Button>
      <Button onClick={handleClickLogState}>Log boardpieces</Button>
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
