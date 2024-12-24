import { useGLTF } from '@react-three/drei'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { HEXGRID_HEXCAP_HEIGHT } from '../../utils/constants'
import { BoardHex, HexTerrain, Pieces } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import ObstacleBase from './ObstacleBase'

export default function TicallaPalm({ boardHex }: { boardHex: BoardHex }) {
  const {
    nodes,
    // materials
  } = useGLTF('/ticalla-palm-colored-lowpoly.glb') as any
  const { x, y, z } = getBoardHex3DCoords(boardHex)
  const yTree = y + HEXGRID_HEXCAP_HEIGHT / 2
  const yBase = y + HEXGRID_HEXCAP_HEIGHT / 2
  const treeHeight = boardHex.pieceID.includes(Pieces.palm16) ? 16 : boardHex.pieceID.includes(Pieces.palm15) ? 15 : 14
  const options = getOptionsForTreeHeight(treeHeight)
  const rotation = boardHex?.pieceRotation ?? 0
  const {
    // I botched these exports in Blender
    AlienGrassUFO_v01_Tuft_a_1: accompanyingBrush,
    AlienGrassUFO_v01_Tuft_a_3: palmLeaf,
    AlienGrassUFO_v01_Tuft_a_2: palmTrunk,
  } = nodes
  function getOptionsForTreeHeight(height: number) {
    // We use the same model and just stretch it a little for the taller trees
    switch (height) {
      case 14:
        return { scaleX: 0.038, scaleY: 0.038 }
      case 15:
        return { scaleX: 0.038, scaleY: 0.042 }
      case 16:
      default:
        return { scaleX: 0.038, scaleY: 0.046 }
    }
  }
  return (
    <group>
      <group
        scale={[options.scaleX, options.scaleY, options.scaleX]}
        position={[x, yTree, z]}
        rotation={[0, (rotation * -Math.PI) / 3, 0]}
      >
        <mesh geometry={palmTrunk.geometry}>
          <meshMatcapMaterial color={hexTerrainColor.ticallaPalmModel1} />
        </mesh>
        <mesh geometry={accompanyingBrush.geometry}>
          <meshMatcapMaterial color={hexTerrainColor.ticallaBrush2} />
        </mesh>
        <mesh geometry={palmLeaf.geometry}>
          <meshMatcapMaterial color={hexTerrainColor.ticallaPalmModel3} />
        </mesh>
      </group>
      <ObstacleBase
        x={x}
        y={yBase}
        z={z}
        color={hexTerrainColor[HexTerrain.swamp]}
      />
    </group>
  )
}

useGLTF.preload('/ticalla-palm-colored-lowpoly.glb')
