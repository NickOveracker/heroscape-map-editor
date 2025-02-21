import React from 'react'
import useBoundStore from '../store/store'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { decodePieceID } from '../utils/map-utils'
import { isPieceIDPiece } from '../utils/board-utils'
import { useHotkeys } from 'react-hotkeys-hook'
import { noop } from 'lodash'
import { enqueueSnackbar } from 'notistack'
import { piecesSoFar } from '../data/pieces'

const SelectedPieceReadout = () => {
  const selectedPieceID = useBoundStore(s => s.selectedPieceID)
  const toggleSelectedPieceID = useBoundStore(s => s.toggleSelectedPieceID)
  const removePieceByPieceID = useBoundStore(s => s.removePieceByPieceID)
  const deletePiece = () => {
    if (isPieceIDPiece(pieceID)) {
      removePieceByPieceID(selectedPieceID)
      toggleSelectedPieceID('')
    } else {
      enqueueSnackbar({
        message: `Currently, can only delete battlements, roadwalls, and laur wall addons.`,
        variant: 'error',
        autoHideDuration: 3000,
      })
    }

  }
  useHotkeys('delete', () => selectedPieceID ? deletePiece() : noop(), /*isEnabled*/)
  if (!selectedPieceID) {
    return null
  }
  const {
    pieceID,
    altitude,
    rotation,
    // boardHexID,
    // pieceCoords
  } = decodePieceID(selectedPieceID)
  const piece = piecesSoFar[pieceID]

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 20,
        margin: 20,
        // backgroundColor: 'var(--gunmetal-transparent)'
      }}
    >
      <Card sx={{ width: 150, height: 200 }}>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: 'text.secondary', fontSize: 14 }}
          >
            Selected Piece
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontSize: 18 }}
          >
            {piece.title}
          </Typography>
          <Typography variant="body2">
            {/* TODO: Piece Altitude off by one */}
            Altitude: {altitude + 1}
            <br />
            Rotation: {rotation}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            // variant='contained'
            // color="error"
            size="small"
            onClick={deletePiece}
          >Delete Piece</Button>
        </CardActions>
      </Card>
    </div>
  )
}
// export const HoveredPieceReadout = () => {
//   const hoveredPieceID = useBoundStore(s => s.hoveredPieceID)
//   if (!hoveredPieceID) {
//     return null
//   }
//   return (
//     <div
//       style={{
//         position: 'absolute',
//         bottom: 200,
//         right: 0,
//         padding: 20,
//         margin: 20,
//         // backgroundColor: 'var(--gunmetal-transparent)'
//       }}
//     >
//       <Card sx={{ minWidth: 150 }}>
//         <CardContent>
//           <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
//             Hovered Piece:
//           </Typography>
//           <Typography variant="h6" component="div" sx={{ fontSize: 16 }}>
//             {piece.title}
//           </Typography>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

export default SelectedPieceReadout
