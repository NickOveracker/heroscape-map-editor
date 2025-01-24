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