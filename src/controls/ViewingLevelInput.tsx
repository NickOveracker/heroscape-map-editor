import { Box, Grid2, Input, Typography } from '@mui/material'
import useBoundStore from '../store/store'
import { getBoardHexesMaxLevel } from '../utils/map-utils'
import React from 'react'


export default function ViewingLevelInput() {
  const viewingLevel = useBoundStore(s => s.viewingLevel)
  const toggleViewingLevel = useBoundStore(s => s.toggleViewingLevel)
  const boardPieces = useBoundStore(s => s.boardPieces)
  const boardHexes = useBoundStore(s => s.boardHexes)
  // const maxLevel = getBoardPiecesMaxLevel(boardPieces)
  const maxLevel = getBoardHexesMaxLevel(boardHexes)
  React.useEffect(() => {
    toggleViewingLevel(maxLevel)
  }, [boardPieces, toggleViewingLevel, maxLevel])

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
            onChange={(event) => toggleViewingLevel(parseInt(event.target.value))}
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