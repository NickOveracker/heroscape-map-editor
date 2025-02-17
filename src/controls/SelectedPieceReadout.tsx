import React from 'react'
import useBoundStore from '../store/store'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { getPieceNameByID } from '../data/pieceNames'
import { decodePieceID } from '../utils/map-utils'

const SelectedPieceReadout = () => {
  const selectedPieceID = useBoundStore(s => s.selectedPieceID)
  const {
    pieceID,
    altitude,
    rotation,
    // boardHexID,
    // pieceCoords
  } = decodePieceID(selectedPieceID)
  if (!selectedPieceID) {
    return null
  }
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
      <Card sx={{ width: 275, height: 200 }}>
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Selected Piece
          </Typography>
          <Typography variant="h5" component="div">
            {getPieceNameByID(pieceID)}
          </Typography>
          <Typography variant="body2">
            Altitude: {altitude}
            <br />
            Rotation: {rotation}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Coming Soon: Stuff!</Button>
        </CardActions>
      </Card>
    </div>
  )
}
export const HoveredPieceReadout = () => {
  const hoveredPieceID = useBoundStore(s => s.hoveredPieceID)
  const {
    pieceID,
    // altitude,
    // rotation,
    // boardHexID,
    // pieceCoords
  } = decodePieceID(hoveredPieceID)
  if (!hoveredPieceID) {
    return null
  }
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 200,
        right: 0,
        padding: 20,
        margin: 20,
        // backgroundColor: 'var(--gunmetal-transparent)'
      }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Hovered Piece:
          </Typography>
          <Typography variant="h6" component="div" sx={{ fontSize: 16 }}>
            {getPieceNameByID(pieceID)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default SelectedPieceReadout
