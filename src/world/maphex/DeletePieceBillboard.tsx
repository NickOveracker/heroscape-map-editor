import { Button, Tooltip } from '@mui/material'
import { Billboard, Html } from '@react-three/drei'
import React from 'react'
import { FcCancel } from 'react-icons/fc'

type Props = { pieceID: string }

const DeletePieceBillboard = (pieceID: Props) => {
  return (
    <Billboard position={[0.5, 100, 0]}>
      <Html>
        <Tooltip
          title={'Delete piece'}
        >
          <Button
            sx={{ backgroundColor: ('var(--black)') }}
            variant='contained' size="small"
            onPointerDown={e => e?.stopPropagation()}
            onPointerUp={e => {
              e?.stopPropagation()
              console.log(`DELETE ${pieceID}`)
            }}
          >
            <FcCancel />
          </Button>
        </Tooltip>
      </Html>
    </Billboard>

  )
}
export const DeleteSubterrainBillboard = (pieceID: Props) => {
  return (
    <Billboard position={[0, 1, 0]}>
      <Html>
        <Tooltip
          title={'Delete piece'}
        >
          <Button
            sx={{ backgroundColor: ('var(--black)') }}
            variant='contained'
            //  size="small"
            onPointerDown={e => e?.stopPropagation()}
            onPointerUp={e => {
              e?.stopPropagation()
              console.log(`DELETE ${pieceID}`)
            }}
          >
            <FcCancel />
          </Button>
        </Tooltip>
      </Html>
    </Billboard>

  )
}

export default DeletePieceBillboard