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
import { keyBy } from 'lodash'

const Controls = () => {
  const boardHexes = useBoundStore((s) => s.boardHexes)
  const boardPieces = useBoundStore((s) => s.boardPieces)
  const hexMap = useBoundStore((s) => s.hexMap)
  const loadMap = useBoundStore((s) => s.loadMap)

  const handleClickLogState = () => {
    console.log("🚀 ~ Controls ~ boardPieces:", boardPieces)
  }

  const handleClickAddLeftCol = () => {
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

    const newBoardHexes = keyBy(boardHexArr.map(bh => {
      const newCoords = hexUtilsAdd(bh, HEX_DIRECTIONS[0])
      const newID = genBoardHexID({ ...newCoords, altitude: bh.altitude })
      const newPieceID = genPieceID(newID, bh.pieceID, bh.pieceRotation)
      return {
        ...bh,
        id: newID,
        pieceID: newPieceID,
      }
    }), 'id')
    console.log("🚀 ~ handleClickAddLeftCol ~ newBoardHexes:", newBoardHexes)
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
    loadMap({
      hexMap: newHexMap,
      boardPieces: newBoardPieces,
      boardHexes: newBoardHexes,
    })
    console.log("🚀 ~ newBoardPieces ~ newBoardPieces:", newBoardPieces)
  }

  return (
    <Container sx={{ padding: 1 }}>
      <Button onClick={handleClickAddLeftCol}>Add left column</Button>
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
