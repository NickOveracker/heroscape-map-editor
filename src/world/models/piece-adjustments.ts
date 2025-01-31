import { Pieces } from '../../types'
import { HEXGRID_HEX_APOTHEM, HEXGRID_HEX_RADIUS } from '../../utils/constants'

export function getLadderBattlementOptions(rotation: number) {
  switch (rotation) {
    case 0:
      return { xAdd: HEXGRID_HEX_APOTHEM, zAdd: 0 }
    case 1:
      return { xAdd: HEXGRID_HEX_RADIUS * Math.sqrt(3) / 4, zAdd: HEXGRID_HEX_RADIUS - (HEXGRID_HEX_RADIUS / 4) }
    case 2:
      return { xAdd: -(HEXGRID_HEX_RADIUS * Math.sqrt(3) / 4), zAdd: HEXGRID_HEX_RADIUS - (HEXGRID_HEX_RADIUS / 4) }
    case 3:
      return { xAdd: -HEXGRID_HEX_APOTHEM, zAdd: 0 }
    case 4:
      return { xAdd: -(HEXGRID_HEX_RADIUS * Math.sqrt(3) / 4), zAdd: -(HEXGRID_HEX_RADIUS - (HEXGRID_HEX_RADIUS / 4)) }
    case 5:
      return { xAdd: HEXGRID_HEX_RADIUS * Math.sqrt(3) / 4, zAdd: -(HEXGRID_HEX_RADIUS - (HEXGRID_HEX_RADIUS / 4)) }
    default:
      return { xAdd: HEXGRID_HEX_APOTHEM, zAdd: 0 }
  }
}
export function getRoadWallOptions(rotation: number) {
  // const wallBlenderModelThickness = 0.075
  switch (rotation) {
    case 0:
      return { xAdd: -HEXGRID_HEX_APOTHEM, zAdd: HEXGRID_HEX_RADIUS / 2 }
    case 1:
      // return { xAdd: 0, zAdd: 0 }
      return { xAdd: -HEXGRID_HEX_APOTHEM, zAdd: -HEXGRID_HEX_RADIUS / 2 }
    case 2:
      return { xAdd: 0, zAdd: -HEXGRID_HEX_RADIUS }
    case 3:
      return { xAdd: HEXGRID_HEX_APOTHEM, zAdd: -HEXGRID_HEX_RADIUS / 2 }
    case 4:
      return { xAdd: HEXGRID_HEX_APOTHEM, zAdd: HEXGRID_HEX_RADIUS / 2 }
    case 5:
      return { xAdd: 0, zAdd: HEXGRID_HEX_RADIUS }
    default:
      return { xAdd: 0, zAdd: 0 }
  }
}
export function getOptionsForBigTree(rotation: number) {
  const xLength = Math.cos(Math.PI / 6) * 1.5
  const zLength = Math.sin(Math.PI / 6) * 1.5
  switch (rotation) {
    case 0:
      return { rotationY: Math.PI / 3, xAdd: xLength, zAdd: zLength }
    case 1:
      return { rotationY: 0, xAdd: 0, zAdd: 1.5 * HEXGRID_HEX_RADIUS }
    case 2:
      return { rotationY: -Math.PI / 3, xAdd: -xLength, zAdd: zLength }
    case 3:
      return { rotationY: Math.PI / 3, xAdd: -xLength, zAdd: -zLength }
    case 4:
      return { rotationY: 0, xAdd: 0, zAdd: -1.5 * HEXGRID_HEX_RADIUS }
    case 5:
      return { rotationY: -Math.PI / 3, xAdd: xLength, zAdd: -zLength }
    default:
      return { rotationY: 0, xAdd: 0, zAdd: 0 }
  }
}
export function getOptionsForPalmHeight(pieceID: string) {
  const treeHeight = pieceID.includes(Pieces.palm16)
    ? 16
    : pieceID.includes(Pieces.palm15) || pieceID.includes(Pieces.laurPalm15)
      ? 15
      : pieceID.includes(Pieces.palm14) || pieceID.includes(Pieces.laurPalm14)
        ? 14
        : 13 // laurPalm13
  // We use the same model and just stretch it a little for the taller trees
  switch (treeHeight) {
    case 13:
      return { scaleX: 0.038, scaleY: 0.035 }
    case 14:
      return { scaleX: 0.038, scaleY: 0.038 }
    case 15:
      return { scaleX: 0.038, scaleY: 0.042 }
    case 16:
    default:
      return { scaleX: 0.038, scaleY: 0.046 }
  }
}