import { useGLTF } from '@react-three/drei'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { BoardHex, HexTerrain, Pieces } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import ObstacleBase from './ObstacleBase'
import { HEXGRID_HEX_HEIGHT, HEXGRID_SPACING } from '../../utils/constants'
import { Vector3 } from 'three'
import { isSolidTerrainHex } from '../../utils/board-utils'
import { ThreeEvent } from '@react-three/fiber'

type Props = {
  boardHex: BoardHex,
  underHexTerrain: string
  overHexTerrain: string,
  onPointerUp: (e: ThreeEvent<PointerEvent>, hex: BoardHex) => void
}

export function CastleWall({
  boardHex,
  underHexTerrain,
  overHexTerrain,
  onPointerUp
}: Props) {

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
    <group>
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

export function CastleWallEnd({
  boardHex,
  underHexTerrain,
  overHexTerrain,
  onPointerUp
}: Props) {
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
    <group>
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

// export function Model(props) {
//   const { nodes, materials } = useGLTF('/adjustable-castle-wall-straight-handmade.glb')
//   return (
//     <group {...props} dispose={null}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.CastleWallStraightBody.geometry}
//         material={nodes.CastleWallStraightBody.material}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.CastleWallStraightCap.geometry}
//         material={nodes.CastleWallStraightCap.material}
//       />
//     </group>
//   )
// }

// useGLTF.preload('/adjustable-castle-wall-straight-handmade.glb')

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

// export function Model(props) {
//   const { nodes, materials } = useGLTF('/adjustable-castle-wall-corner-handmade.glb')
//   return (
//     <group {...props} dispose={null}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.CastleWallCornerBody.geometry}
//         material={nodes.CastleWallCornerBody.material}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.CastleWallCornerCap.geometry}
//         material={nodes.CastleWallCornerCap.material}
//       />
//     </group>
//   )
// }

// useGLTF.preload('/adjustable-castle-wall-corner-handmade.glb')

useGLTF.preload('/castle-wall-corner-handmade.glb')
