import { Button, Container } from '@mui/material'
import PieceSizeSelect from './PieceSizeSelect'
import PenModeControls from './PenModeControls'
import RotationSelect from './RotationSelect'
import UndoRedoButtonGroup from './UndoRedoButtonGroup'
import ViewingLevelInput from './ViewingLevelInput'
import useBoundStore from '../store/store'
import { HEX_DIRECTIONS, hexUtilsAdd } from '../utils/hex-utils'
import { decodePieceID, genBoardHexID, genPieceID } from '../utils/map-utils'
import { buildupJsonFileMap } from '../data/buildupMap'
import LocalStorageList from './LocalStorageList'

const Controls = () => {
  const boardHexes = useBoundStore((s) => s.boardHexes)
  const boardPieces = useBoundStore((s) => s.boardPieces)
  const hexMap = useBoundStore((s) => s.hexMap)
  const loadMap = useBoundStore((s) => s.loadMap)


  const handleClickLogState = () => {
    console.log("🚀 ~ Controls ~ boardHexes:", boardHexes)
    console.log("🚀 ~ Controls ~ boardPieces:", boardPieces)
    console.log("🚀 ~ Controls ~ hexMap:", hexMap)
  }
  // const handleTrimMap = () => {
  //   const boardHexArr = Object.values(boardHexes)
  //   const maxX = Math.max(...boardHexArr.map(bh => bh.q - bh.s))
  //   const rightColumn = boardHexArr.filter(bh => bh.q - bh.s === maxX || bh.q - bh.s === (maxX - 1))
  //   const isRightSideEmpty = rightColumn.every(bh => bh.terrain === HexTerrain.empty)
  //   const leftColumn = boardHexArr.filter(bh => bh.s - bh.q === -1 || bh.s - bh.q === 0)
  //   const isLeftSideEmpty = leftColumn.every(bh => bh.terrain === HexTerrain.empty)
  //   const maxY = Math.max(...boardHexArr.map(bh => bh.r - bh.s - bh.q))
  //   const bottomRow = boardHexArr.filter(bh => (bh.r - bh.s - bh.q === maxY) || (bh.r - bh.s - bh.q === maxY - 2))
  //   const isBottomRowEmpty = bottomRow.every(bh => bh.terrain === HexTerrain.empty)
  //   const top2Rows = boardHexArr.filter(bh => bh.q + bh.s - bh.r === 0 || bh.q + bh.s - bh.r === -2)
  //   const isTop2RowsEmpty = top2Rows.every(bh => bh.terrain === HexTerrain.empty)
  // }
  const movePieces = (direction: number) => {
    const newBoardPieces = Object.keys(boardPieces).reduce((prev: any, pid: string) => {
      const {
        pieceID,
        altitude,
        rotation,
        // boardHexID,
        pieceCoords
      } = decodePieceID(pid)
      const newPieceCoords = hexUtilsAdd(pieceCoords, HEX_DIRECTIONS[direction])
      const newBoardHexID = genBoardHexID({ ...newPieceCoords, altitude })
      const newPieceID = genPieceID(newBoardHexID, pieceID, rotation)
      return {
        ...prev,
        [newPieceID]: pieceID
      }
    }, {})
    const newMap = buildupJsonFileMap(newBoardPieces, hexMap)
    loadMap(newMap)
  }
  const handleClickAddMapLengthX = () => {
    const newHexMap = {
      ...hexMap,
      length: hexMap.length + 1
    }
    const newMap = buildupJsonFileMap(boardPieces, newHexMap)
    loadMap(newMap)
  }
  const handleClickRemoveMapLengthX = () => {
    const newHexMap = {
      ...hexMap,
      length: hexMap.length - 1

    }
    const newMap = buildupJsonFileMap(boardPieces, newHexMap)
    loadMap(newMap)
  }
  const handleClickAddMapWidthY = () => {
    const newHexMap = {
      ...hexMap,
      width: hexMap.width + 1
    }
    const newMap = buildupJsonFileMap(boardPieces, newHexMap)
    loadMap(newMap)
  }
  const handleClickRemoveMapWidthY = () => {
    const newHexMap = {
      ...hexMap,
      width: hexMap.width - 1

    }
    const newMap = buildupJsonFileMap(boardPieces, newHexMap)
    loadMap(newMap)
  }

  return (
    <Container sx={{ padding: 1 }}>
      <UndoRedoButtonGroup />
      <PenModeControls />
      <PieceSizeSelect />
      <RotationSelect />
      {/* <MapLensToggles /> */}
      <ViewingLevelInput />
      <LocalStorageList />
      <Button onClick={handleClickAddMapLengthX}>Add length</Button>
      <Button onClick={handleClickRemoveMapLengthX}>Remove length</Button>
      <Button onClick={handleClickAddMapWidthY}>Add width</Button>
      <Button onClick={handleClickRemoveMapWidthY}>Remove width</Button>
      <Button onClick={() => movePieces(0)}>East</Button>
      <Button onClick={() => movePieces(1)}>SouthEast</Button>
      <Button onClick={() => movePieces(2)}>SouthWest</Button>
      <Button onClick={() => movePieces(3)}>West</Button>
      <Button onClick={() => movePieces(4)}>NorthWest</Button>
      <Button onClick={() => movePieces(5)}>NorthEast</Button>
      <Button onClick={handleClickLogState}>Log state</Button>
    </Container>
  )
}

export default Controls
