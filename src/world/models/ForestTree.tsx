import { useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain, Pieces } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'
import ObstacleBase from './ObstacleBase'
import { hexTerrainColor } from '../maphex/hexColors'

export default function SingleForestTree({ boardHex }: { boardHex: BoardHex }) {
  const {
    nodes,
    //  materials
  } = useGLTF('/forgotten-forest-tree-low-poly-colored.glb') as any
  const { x, z, yWithBase, yBase } = getBoardHex3DCoords(boardHex)
  const treeHeight = boardHex.pieceID.includes(Pieces.tree12)
    ? 12
    : boardHex.pieceID.includes(Pieces.tree11)
      ? 11
      : 10
  const options = getOptionsForTreeHeight(treeHeight)
  const rotation = boardHex?.pieceRotation ?? 0
  function getOptionsForTreeHeight(treeHeight: number) {
    switch (treeHeight) {
      case 11:
        return { scaleX: 0.039, scaleY: 0.04, y: yWithBase }
      case 12:
        return {
          scaleX: 0.04,
          scaleY: 0.044,
          y: yWithBase + HEXGRID_HEX_HEIGHT / 10,
        }
      case 10:
      default:
        return { scaleX: 0.038, scaleY: 0.038, y: yWithBase }
    }
  }
  return (
    <>
      <mesh
        geometry={nodes.Tree10_scanned.geometry}
        // material={materials.ForestTree}
        scale={[options.scaleX, options.scaleY, options.scaleX]}
        position={[x, options.y, z]}
        rotation={[0, (rotation * -Math.PI) / 3, 0]}
      >
        <meshMatcapMaterial color={hexTerrainColor[HexTerrain.tree]} />
      </mesh>
      {/* <Billboard
        position={[x, options.y + 1.5, z]}
        rotation={[0, (rotation * -Math.PI) / 3, 0]}
        scale={[1, 3, 1]}
        onPointerEnter={e => e.stopPropagation()}
      >
        <Image url='tree-img.jpg'></Image>
      </Billboard> */}
      <ObstacleBase x={x} y={yBase} z={z} color={hexTerrainColor.treeBase} />
    </>
  )
}

useGLTF.preload('/forgotten-forest-tree-low-poly-colored.glb')
