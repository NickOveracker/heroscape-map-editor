import { useGLTF } from '@react-three/drei'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { BoardHex, HexTerrain, Pieces } from '../../types'
import { hexTerrainColor } from '../maphex/hexColors'
import ObstacleBase from './ObstacleBase'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'
import { Vector3 } from 'three'
import { isSolidTerrainHex } from '../../utils/board-utils'
import { ThreeEvent } from '@react-three/fiber'
import React from 'react'

type Props = {
  boardHex: BoardHex,
  underHexTerrain: string
  overHexTerrain: string,
  onPointerUp: (e: ThreeEvent<PointerEvent>, hex: BoardHex) => void
}

// type GLTFResult = GLTF & {
//   nodes: {
//     CastleWallEndBody: THREE.Mesh
//     CastleWallEndCap: THREE.Mesh
//     CastleWallCornerBody: THREE.Mesh
//     CastleWallCornerCap: THREE.Mesh
//     CastleWallStraightBody: THREE.Mesh
//     CastleWallStraightCap: THREE.Mesh
//     WallCap: THREE.Mesh // this is the one that shows for all the walls
//   }
//   materials: {}
// }

export function CastleWall({
  boardHex,
  underHexTerrain,
  overHexTerrain,
  onPointerUp
}: Props) {

  const { nodes } = useGLTF('/adjustable-castle-walls.glb') as any
  const [color, setColor] = React.useState(hexTerrainColor[HexTerrain.castle])
  const { x, z, yBase, yBaseCap } = getBoardHex3DCoords(boardHex)
  const rotation = boardHex?.pieceRotation ?? 0
  const isCastleUnder = underHexTerrain === HexTerrain.castle
  const isShowCap = !isSolidTerrainHex(overHexTerrain)
  const scaleDown = 0.05 // just a little to get it out of the subterrain
  const positionDown = scaleDown / 2
  const scaleY = (boardHex?.obstacleHeight ?? 9) + (1 - scaleDown)
  const scale = new Vector3(1, scaleY, 1)
  const position = new Vector3(x, yBase - positionDown, z)
  const pieceID = boardHex.pieceID
  const endGeo = [nodes.CastleWallEndBody.geometry, nodes.CastleWallEndCap.geometry]
  const straightGeo = [nodes.CastleWallStraightBody.geometry, nodes.CastleWallStraightCap.geometry]
  const cornerGeo = [nodes.CastleWallCornerBody.geometry, nodes.CastleWallCornerCap.geometry]
  const geometryPair = pieceID.includes(Pieces.castleWallEnd) ? endGeo : pieceID.includes(Pieces.castleWallStraight) ? straightGeo : cornerGeo
  const onPointerEnter = (e: ThreeEvent<PointerEvent>) => {
    setColor('white')
    e.stopPropagation()
  }
  const onPointerOut = (e: ThreeEvent<PointerEvent>) => {
    setColor(hexTerrainColor[HexTerrain.castle])
    e.stopPropagation()
  }
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
          geometry={geometryPair[0]}
          onPointerEnter={onPointerEnter}
          onPointerOut={onPointerOut}
        >
          <meshMatcapMaterial
            color={color}
          />
        </mesh>

        {isShowCap &&
          <>
            <mesh
              geometry={geometryPair[1]}
              position={[0, (scaleY - 1) * HEXGRID_HEX_HEIGHT, 0]}
              onPointerUp={e => onPointerUp(e, boardHex)}
            >
              <meshMatcapMaterial
                color={color}
              />
            </mesh>
            <mesh
              geometry={nodes.WallCap.geometry}
              position={[0, (scaleY - 1) * HEXGRID_HEX_HEIGHT, 0]}
              onPointerUp={e => onPointerUp(e, boardHex)}
            >
              <meshMatcapMaterial
                color={color}
              />
            </mesh>
          </>
        }
      </group>
      {!isCastleUnder && <ObstacleBase x={x} y={yBaseCap} z={z} color={hexTerrainColor[underHexTerrain]} />}
    </group>
  )
}
