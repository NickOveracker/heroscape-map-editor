import { Color, Vector3 } from 'three'
import { CylinderGeometryArgs } from './instance-hex'
import { hexTerrainColor } from './hexColors'
import { HexTerrain } from '../../types'
import { HEXGRID_HEX_HEIGHT, TREE_BASE_HEIGHT } from '../../utils/constants'

type Props = {
  position: Vector3
}

const ForestTree10WithBase = ({ position }: Props) => {
  const treeHeight = 10 * HEXGRID_HEX_HEIGHT // 5
  const heightBottom = treeHeight - TREE_BASE_HEIGHT
  const treeBase: CylinderGeometryArgs = [0.999, 0.997, TREE_BASE_HEIGHT, 6, undefined, false, undefined, undefined]
  const treeBottom: CylinderGeometryArgs = [0.1, 0.8, heightBottom, 12, undefined, false, undefined, undefined]
  const treeColor = new Color(hexTerrainColor[HexTerrain.tree])
  const treeBaseColor = new Color(hexTerrainColor['treeBase'])
  const yBase = TREE_BASE_HEIGHT / 2
  const yBottom = heightBottom / 2 + TREE_BASE_HEIGHT
  return (
    <group position={position} castShadow receiveShadow>
      <mesh position={[0, yBase, 0]}>
        <cylinderGeometry args={treeBase} />
        <meshLambertMaterial color={treeBaseColor} />
      </mesh>
      <mesh position={[0, yBottom, 0]}>
        <cylinderGeometry args={treeBottom} />
        <meshLambertMaterial color={treeColor} />
      </mesh>
    </group>
  )
}

export default ForestTree10WithBase