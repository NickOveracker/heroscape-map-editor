import { TREE_BASE_HEIGHT } from "../../utils/constants"
import { hexTerrainColor } from "../maphex/hexColors"
import { CylinderGeometryArgs } from "../maphex/instance-hex"

type ForestTreeBaseProps = {
  x: number
  y: number
  z: number
  color?: string
}

const treeBaseCylinderArgs: CylinderGeometryArgs = [0.999, 0.997, TREE_BASE_HEIGHT, 6, undefined, false, undefined, undefined]

export default function TreeBase({ x, y, z, color }: ForestTreeBaseProps) {
  return (
    <mesh position={[x, y, z]}>
      <cylinderGeometry args={treeBaseCylinderArgs} />
      <meshLambertMaterial color={color || hexTerrainColor['treeBase']} />
    </mesh>
  )
}