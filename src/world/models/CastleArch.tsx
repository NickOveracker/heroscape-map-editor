import { useGLTF } from '@react-three/drei'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { BoardHex, HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import ObstacleBase from './ObstacleBase'
import { HEXGRID_SPACING } from '../../utils/constants'

type Props = {
  boardHex: BoardHex,
  underHexTerrain: string
  // overHexTerrain: string,
  // onPointerUp: (e: ThreeEvent<PointerEvent>, hex: BoardHex) => void
}

export function CastleArch({
  boardHex,
  underHexTerrain,
  // overHexTerrain,
  // onPointerUp,
}: Props) {
  const { nodes } = useGLTF('/castle-arch-handmade.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  const isDoor = !boardHex.pieceID.includes("NoDoor") // hacky but fast
  const isCastleUnder = underHexTerrain === HexTerrain.castle
  if (!(boardHex.isAuxiliary || boardHex.isObstacleOrigin)) {
    return null
  }
  if (boardHex.isAuxiliary) {
    return !isCastleUnder ? <ObstacleBase x={x} y={yBaseCap} z={z} color={hexTerrainColor[underHexTerrain]} /> : <></>
  }
  return (
    <group>
      <group
        position={[x, yBase, z]}
        rotation={[0, rotation * -Math.PI / 3, 0]}
        scale={[HEXGRID_SPACING, 1, 1]} // this stretches the arch to full span 3 hexes (warping should be almost imperceptible)
      >

        <mesh
          geometry={nodes.CastleArchBody.geometry}
        >
          <meshMatcapMaterial
            color={hexTerrainColor[HexTerrain.castle]}
          />
        </mesh>
        <mesh
          geometry={nodes.CastleArchCapNear.geometry}
        >
          <meshMatcapMaterial
            color={hexTerrainColor[HexTerrain.castle]}
          />
        </mesh>
        <mesh
          geometry={nodes.CastleArchCapMiddle.geometry}
        >
          <meshMatcapMaterial
            color={hexTerrainColor[HexTerrain.castle]}
          />
        </mesh>
        <mesh
          geometry={nodes.CastleArchCapFar.geometry}
        >
          <meshMatcapMaterial
            color={hexTerrainColor[HexTerrain.castle]}
          />
        </mesh>
        {isDoor && <mesh
          geometry={nodes.ArchDoor.geometry}
        >
          <meshMatcapMaterial
            color={hexTerrainColor['dirt']}
          />
        </mesh>}
      </group>
      <ObstacleBase x={x} y={yBaseCap} z={z} color={hexTerrainColor[underHexTerrain]} />
    </group>
  )
}

useGLTF.preload('/castle-arch-handmade.glb')