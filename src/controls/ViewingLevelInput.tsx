import { Box, Grid2, Input, Typography } from '@mui/material'
import useBoundStore from '../store/store'
import { decodePieceID, getBoardPiecesMaxLevel } from '../utils/map-utils'
import React, { ChangeEvent, useCallback, useMemo } from 'react'
import { BoardPieces, Pieces } from '../types'


export default function ViewingLevelInput() {
  const viewingLevel = useBoundStore(s => s.viewingLevel)
  const toggleViewingLevel = useBoundStore(s => s.toggleViewingLevel)
  const boardPieces = useBoundStore(s => s.boardPieces)
  const maxLevel = getBoardPiecesMaxLevel(boardPieces)

  const filterBoardPieces = useCallback((level: number) => (
    Object.keys(boardPieces).reduce((prev: BoardPieces, pid: string) => {
      if (decodePieceID(pid).altitude < level) {
        return { ...prev, [pid]: decodePieceID(pid).pieceID as Pieces }
      } else {
        return prev
      }
    }, {} as BoardPieces)
  ), [boardPieces])

  const filteredBoardPiecesDown = useMemo(() => (
    filterBoardPieces(viewingLevel - 1)
  ), [filterBoardPieces, viewingLevel])

  const filteredBoardPiecesUp = useMemo(() => {
    const newMax = getBoardPiecesMaxLevel(filterBoardPieces(viewingLevel + 1))
    return newMax > viewingLevel ? filterBoardPieces(newMax) : filterBoardPieces(viewingLevel + 1)
  }, [filterBoardPieces, viewingLevel])

  const nextLevelDownWithPieces = getBoardPiecesMaxLevel(filteredBoardPiecesDown)
  const nextLevelUpWithPieces = getBoardPiecesMaxLevel(filteredBoardPiecesUp)

  React.useEffect(() => {
    toggleViewingLevel(maxLevel)
  }, [boardPieces, toggleViewingLevel, maxLevel])

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const input = parseInt(event.target.value)
    console.log("🚀 ~ handleChange ~ input:", input)
    const isGoingUp = input > viewingLevel
    const isGoingWayUp = isGoingUp && (input !== nextLevelUpWithPieces)
    console.log("🚀 ~ handleChange ~ nextLevelUpWithPieces:", nextLevelUpWithPieces)
    const isGoingDown = input < viewingLevel
    const isGoingWayDown = isGoingDown && (input !== nextLevelDownWithPieces)
    console.log("🚀 ~ handleChange ~ nextLevelDownWithPieces:", nextLevelDownWithPieces)
    if (isGoingUp) {
      toggleViewingLevel(isGoingWayUp ? nextLevelUpWithPieces : input)
    }
    else if (isGoingDown) {
      toggleViewingLevel(isGoingWayDown ? nextLevelDownWithPieces - 1 : input)
    } else {
      toggleViewingLevel(input)
    }
  }
  return (
    <Box sx={{ width: 250 }}>
      <Grid2 container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid2
          size={{ xs: 6 }}
        >
          <Typography id="input-slider">
            {viewingLevel === maxLevel ? 'Viewing all' : 'Viewing up to'}:
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Input
            // title="This feature is not ready yet"
            value={viewingLevel}
            size="small"
            // disabled // TODO: implement viewing levels
            onChange={handleChange}
            inputProps={{
              step: 1,
              min: 0,
              max: maxLevel ?? 0,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}