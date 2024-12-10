import { useGLTF } from '@react-three/drei'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { BoardHex, HexTerrain } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import ObstacleBase from './ObstacleBase'
import { HEXGRID_HEX_HEIGHT, HEXGRID_SPACING } from '../../utils/constants'
import { Vector3 } from 'three'
import { isSolidTerrainHex } from '../../utils/board-utils'
import { ThreeEvent } from '@react-three/fiber'

export function CastleWallEnd({
  boardHex,
  underHexTerrain,
  overHexTerrain,
  onPointerUp
}: {
  boardHex: BoardHex,
  underHexTerrain: string
  overHexTerrain: string,
  onPointerUp: (e: ThreeEvent<PointerEvent>, hex: BoardHex) => void
}) {
  const { nodes } = useGLTF('/adjustable-castle-wall-end-handmade.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  const isCastleUnder = underHexTerrain === HexTerrain.castle
  const isShowCap = !isSolidTerrainHex(overHexTerrain)
  const scaleDown = 0.05 // just a little to get it out of the subterrain
  const positionDown = scaleDown / 2
  const scaleY = (boardHex?.obstacleHeight ?? 9) + (1 - scaleDown)
  const scale = new Vector3(1, scaleY, 1)
  const position = new Vector3(x, yBase - positionDown, z)
  return (
    <group >
      <group
        position={position}
        rotation={[0, rotation * -Math.PI / 3, 0]}
        castShadow
        receiveShadow
      >
        <mesh
          scale={scale}
          geometry={nodes.CastleWallEndBody.geometry}
        >
          <meshMatcapMaterial
            color={hexTerrainColor[HexTerrain.castle]}
          />
        </mesh>
        {isShowCap &&
          <mesh
            geometry={nodes.CastleWallEndCap.geometry}
            position={[0, (scaleY - 1) * HEXGRID_HEX_HEIGHT, 0]}
            onPointerUp={e => onPointerUp(e, boardHex)}
          >
            <meshMatcapMaterial
              color={hexTerrainColor[HexTerrain.castle]}
            />
          </mesh>
        }
      </group>
      {!isCastleUnder && <ObstacleBase x={x} y={yBaseCap} z={z} color={hexTerrainColor[underHexTerrain]} />}
    </group>
  )
}
useGLTF.preload('/adjustable-castle-wall-end-handmade.glb')

export function CastleWallStraight({ boardHex, underHexTerrain }: { boardHex: BoardHex, underHexTerrain: string }) {
  const { nodes } = useGLTF('/castle-wall-straight-handmade.glb') as any
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  const isCastleUnder = underHexTerrain === HexTerrain.castle
  const scaleY = 0.99
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
  const scaleY = 0.99
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
