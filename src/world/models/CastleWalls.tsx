import { useGLTF } from '@react-three/drei'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { BoardHex, HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import ObstacleBase from './ObstacleBase'
import { HEXGRID_SPACING } from '../../utils/constants'
import { Vector3 } from 'three'

export function CastleWallEnd({ boardHex, underHexTerrain }: { boardHex: BoardHex, underHexTerrain: string }) {
  const { nodes } = useGLTF('/castle-wall-end-handmade.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  const isCastleUnder = underHexTerrain === HexTerrain.castle
  const scaleY = isCastleUnder ? 0.9 : 0.99
  const scale = new Vector3(1, scaleY, 1)
  return (
    <group scale={scale} >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        position={[x, yBase, z]}
        rotation={[0, rotation * -Math.PI / 3, 0]}

      >
        <meshMatcapMaterial
          color={hexTerrainColor[HexTerrain.castle]}
        />
      </mesh>
      {!isCastleUnder && <ObstacleBase x={x} y={yBaseCap} z={z} color={hexTerrainColor[underHexTerrain]} />}
    </group>
  )
}
useGLTF.preload('/castle-wall-end-handmade.glb')

export function CastleWallStraight({ boardHex, underHexTerrain }: { boardHex: BoardHex, underHexTerrain: string }) {
  const { nodes } = useGLTF('/castle-wall-straight-handmade.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  const isCastleUnder = underHexTerrain === HexTerrain.castle
  const scaleY = isCastleUnder ? 0.9 : 0.99
  const scale = new Vector3(1, scaleY, 1)
  return (
    <group scale={scale} >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        position={[x, yBase, z]}
        rotation={[0, rotation * -Math.PI / 3, 0]}
      >
        <meshMatcapMaterial
          color={hexTerrainColor[HexTerrain.castle]}
        />
      </mesh>
      {!isCastleUnder && <ObstacleBase x={x} y={yBaseCap} z={z} color={hexTerrainColor[underHexTerrain]} />}
    </group>
  )
}
useGLTF.preload('/castle-wall-straight-handmade.glb')

export function CastleWallCorner({ boardHex, underHexTerrain }: { boardHex: BoardHex, underHexTerrain: string }) {
  const { nodes } = useGLTF('/castle-wall-corner-handmade.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  const isCastleUnder = underHexTerrain === HexTerrain.castle
  const scaleY = isCastleUnder ? 0.9 : 0.99
  const scale = new Vector3(1, scaleY, 1)
  return (
    <group scale={scale} >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CastleWallCorner.geometry}
        position={[x, yBase, z]}
        rotation={[0, rotation * -Math.PI / 3, 0]}
      >
        <meshMatcapMaterial
          color={hexTerrainColor[HexTerrain.castle]}
        />
      </mesh>
      {!isCastleUnder && <ObstacleBase x={x} y={yBaseCap} z={z} color={hexTerrainColor[underHexTerrain]} />}
    </group>
  )
}
useGLTF.preload('/castle-wall-corner-handmade.glb')

export function CastleArch({ boardHex, underHexTerrain }: { boardHex: BoardHex, underHexTerrain: string }) {
  console.log("🚀 ~ CastleArch ~ underHexTerrain:", underHexTerrain)
  // const boardPieces = useBoundStore(s=>s.boardPieces)
  const { nodes } = useGLTF('/castle-arch-handmade.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  const isDoor = boardHex.pieceID.includes("NoDoor") // hacky but fast
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
          castShadow
          receiveShadow
          geometry={nodes.CastleArch.geometry}
        >
          <meshMatcapMaterial
            color={hexTerrainColor[HexTerrain.castle]}
          />
        </mesh>
        {isDoor && <mesh
          castShadow
          receiveShadow
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
