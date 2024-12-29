import { useGLTF } from '@react-three/drei'
import { BoardHex, HexTerrain, Pieces } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import ObstacleBase from './ObstacleBase'
import { hexTerrainColor } from '../maphex/hexColors'
import React from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { DoubleSide, Vector3 } from 'three'
import { HEXGRID_HEX_APOTHEM } from '../../utils/constants'

export default function LaurWallAddon({
  boardHex,
  onPointerUpLaurWall,
}: {
  boardHex: BoardHex
  onPointerUpLaurWall: (
    e: ThreeEvent<PointerEvent>,
    hex: BoardHex,
    side: string,
  ) => void
}) {
  const { x, z, yBaseCap, yWithBase } = getBoardHex3DCoords(boardHex)
  const {
    LaurWallRuin,
    LaurWallRuinBustedConcrete,
    LaurWallLong,
    LaurWallLongDecorDeep,
    LaurWallShort,
    LaurWallShortDecorDeep,
  } = useGLTF('/laurwall-addons.glb').nodes as any

  const rotation = boardHex?.pieceRotation ?? 0
  const pillarColor = hexTerrainColor[HexTerrain.laurWall]
  const interiorPillarColor = hexTerrainColor.laurModelColor2
  const yellowColor = 'yellow'
  // const laurRuins = Object.values(boardHex?.laurAddons ?? {}).filter(
  //   (addon) => {
  //     return addon.pieceID === Pieces.laurWallRuin
  //   },
  // )
  // const laurLongs = Object.values(boardHex?.laurAddons ?? {}).filter(
  //   (addon) => {
  //     return addon.pieceID === Pieces.laurWallLong
  //   },
  // )
  // const laurShorts = Object.values(boardHex?.laurAddons ?? {}).filter(
  //   (addon) => {
  //     return addon.pieceID === Pieces.laurWallShort
  //   },
  // )

  const ruinPositionMap: { [key: string]: Vector3 } = {
    '0': new Vector3(HEXGRID_HEX_APOTHEM, 0, 0),
    '0.5': new Vector3(0.75, 0, HEXGRID_HEX_APOTHEM / 2),
    '1': new Vector3(
      HEXGRID_HEX_APOTHEM / 2 + 0.001,
      0,
      HEXGRID_HEX_APOTHEM - 0.114,
    ),
    '1.5': new Vector3(-0.005, 0, HEXGRID_HEX_APOTHEM - 0.005),
    '2': new Vector3(
      -HEXGRID_HEX_APOTHEM / 2 - 0.001,
      0,
      HEXGRID_HEX_APOTHEM - 0.114,
    ),
    '2.5': new Vector3(-0.743, 0, HEXGRID_HEX_APOTHEM / 2 + 0.0018),
    '3': new Vector3(-HEXGRID_HEX_APOTHEM + 0.01, 0, 0),
    '3.5': new Vector3(-0.743, 0, -(HEXGRID_HEX_APOTHEM / 2) + 0.0018),
    '4': new Vector3(
      -HEXGRID_HEX_APOTHEM / 2 + 0.003,
      0,
      -HEXGRID_HEX_APOTHEM + 0.124,
    ),
    '4.5': new Vector3(0.005, 0, -HEXGRID_HEX_APOTHEM + 0.005),
    '5': new Vector3(
      HEXGRID_HEX_APOTHEM / 2 - 0.005,
      0,
      -HEXGRID_HEX_APOTHEM + 0.1235,
    ),
    '5.5': new Vector3(0.75, 0, -(HEXGRID_HEX_APOTHEM / 2 - 0.01)),
  }
  return (
    <group>
      {/* {(laurRuins ?? []).map((ruin) => {
        return (
          <group
            key={`${boardHex.id}.${ruin.side}`}
            position={new Vector3(x, yWithBase, z).add(
              ruinPositionMap[`${ruin.rotation}`],
            )}
            rotation={[0, ruin.rotation * (-Math.PI / 3), 0]}
          >
            <mesh geometry={LaurWallRuin.geometry}>
              <meshMatcapMaterial
                color={hexTerrainColor[HexTerrain.laurWall]}
              />
            </mesh>
            <mesh geometry={LaurWallRuinBustedConcrete.geometry}>
              <meshMatcapMaterial color={hexTerrainColor.laurModelColor2} />
            </mesh>
          </group>
        )
      })}
      {(laurLongs ?? []).map((ruin) => {
        return (
          <group
            key={`${boardHex.id}.${ruin.side}`}
            position={[x, yWithBase, z]}
          >
            <mesh geometry={LaurWallLong.geometry}>
              <meshMatcapMaterial
                color={hexTerrainColor[HexTerrain.laurWall]}
              />
            </mesh>
            <mesh geometry={LaurWallLongDecorDeep.geometry}>
              <meshMatcapMaterial color={hexTerrainColor.laurModelColor2} />
            </mesh>
          </group>
        )
      })}
      {(laurShorts ?? []).map((ruin) => {
        return (
          <group
            key={`${boardHex.id}.${ruin.side}`}
            // position={[x, yWithBase, z]}
            position={new Vector3(x, yWithBase, z).add(
              ruinPositionMap[`${ruin.rotation}`],
            )}
            rotation={[0, ruin.rotation * (-Math.PI / 3), 0]}
          >
            <mesh geometry={LaurWallShort.geometry}>
              <meshMatcapMaterial
                color={hexTerrainColor[HexTerrain.laurWall]}
              />
            </mesh>
            <mesh geometry={LaurWallShortDecorDeep.geometry}>
              <meshMatcapMaterial color={hexTerrainColor.laurModelColor2} />
            </mesh>
          </group>
        )
      })} */}
    </group>
  )
}

useGLTF.preload('/laurwall-addons.glb')

