import { Box, Grid2, Input, Typography } from '@mui/material'
import useBoundStore from '../store/store'
import { decodePieceID } from '../utils/map-utils'


export default function ViewingLevelInput() {
  const viewingLevel = useBoundStore(s => s.viewingLevel)
  const toggleViewingLevel = useBoundStore(s => s.toggleViewingLevel)
  const boardPieces = useBoundStore(s => s.boardPieces)
  const maxLevel = Object.keys(boardPieces)
    .map(bp => decodePieceID(bp).altitude) // get their altitudes
    .sort((a, b) => b - a)[0] // sort them high to low and grab the first
  return (
    <Box sx={{ width: 250 }}>

      <Grid2 container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid2
          size={{ xs: 6 }}
        >
          <Typography id="input-slider">
            Viewing Level:
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <Input
            title="This feature is not ready yet"
            value={viewingLevel}
            size="small"
            disabled // TODO: implement viewing levels
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