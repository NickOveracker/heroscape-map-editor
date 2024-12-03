import { useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain, Pieces } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'
import useBoundStore from '../../store/store'
import { piecesSoFar } from '../../data/pieces'
import BigTree415 from './BigTree415'
import ObstacleBase from './ObstacleBase'
import { hexTerrainColor } from '../maphex/hexColors'



export default function ForestTree({ boardHex }: { boardHex: BoardHex }) {
  const boardPieces = useBoundStore(s => s.boardPieces)
  const piece = piecesSoFar[boardPieces[boardHex.pieceID]]
  const isBigTree = piece.inventoryID === Pieces.tree415
  return isBigTree ? <BigTree415 boardHex={boardHex} /> : <SingleForestTree boardHex={boardHex} />
}
function SingleForestTree({ boardHex }: { boardHex: BoardHex }) {
  const {
    nodes,
    //  materials 
  } = useGLTF('/forgotten-forest-tree-low-poly-colored.glb') as any
  const { x, z, yWithBase, yBase } = getBoardHex3DCoords(boardHex)
  const options = getOptionsForTreeHeight(boardHex?.obstacleHeight ?? 10)
  function getOptionsForTreeHeight(treeHeight: number) {
    switch (treeHeight) {
      case 11:
        return { scaleX: 0.039, scaleY: 0.040, y: yWithBase }
      case 12:
        return { scaleX: 0.040, scaleY: 0.044, y: yWithBase + HEXGRID_HEX_HEIGHT / 10 }
      case 10:
      default:
        return { scaleX: 0.038, scaleY: 0.038, y: yWithBase }
    }
  }
  return (
    <group
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tree10_scanned.geometry}
        // material={materials.ForestTree}
        scale={[options.scaleX, options.scaleY, options.scaleX]}
        position={[x, options.y, z]}
      >
        <meshMatcapMaterial color={hexTerrainColor[HexTerrain.tree]} />
      </mesh>
      <ObstacleBase x={x} y={yBase} z={z} color={'#944c00'} />
    </group>
  )
}

useGLTF.preload('/forgotten-forest-tree-low-poly-colored.glb')