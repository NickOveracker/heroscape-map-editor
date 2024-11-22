import { useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { BoardHex, HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { hexTerrainColor } from './hexColors'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'
import { CylinderGeometryArgs } from './instance-hex'


type InstanceSubTerrainWrapperProps = {
  treeHexes: BoardHex[]
  glKey: string
}

const InstanceForestTreeWrapper = (props: InstanceSubTerrainWrapperProps) => {
  const numInstances = props.treeHexes.length
  if (numInstances < 1) return null
  const key = `${props.glKey}${numInstances}` // IMPORTANT: to include numInstances in key, otherwise gl will crash on change
  return <InstanceForestTree key={key} treeHexes={props.treeHexes} />
}
const treeCylinderGeometryArgs: CylinderGeometryArgs = [0.1, 0.8, 1, 12, undefined, false, undefined, undefined]
const InstanceForestTree = ({ treeHexes }: { treeHexes: BoardHex[] }) => {
  const instanceRef = useRef<any>(undefined!)
  const countOfTrees = treeHexes.length

  // effect where we create and update instance mesh for each tree mesh
  useLayoutEffect(() => {
    const placeholder = new THREE.Object3D()
    treeHexes.forEach((treeHex, i) => {
      const { x, z } = getBoardHex3DCoords(treeHex)
      const treeHeight = (treeHex?.obstacleHeight ?? 10) * HEXGRID_HEX_HEIGHT // 5
      const yHex = (treeHex.altitude - 1) * HEXGRID_HEX_HEIGHT
      const y = yHex + (treeHeight / 2)
      placeholder.scale.set(1, treeHeight, 1)
      placeholder.position.set(x, y, z)
      placeholder.updateMatrix()
      const treeColor = new THREE.Color(hexTerrainColor[HexTerrain.tree])
      instanceRef.current.setColorAt(i, treeColor)
      instanceRef.current.setMatrixAt(i, placeholder.matrix)
    })
    instanceRef.current.instanceMatrix.needsUpdate = true
  }, [treeHexes])
  return (
    <instancedMesh
      ref={instanceRef}
      args={[undefined, undefined, countOfTrees]} //args:[geometry, material, count]
      castShadow
      receiveShadow
    >
      <cylinderGeometry args={treeCylinderGeometryArgs} />
      <meshLambertMaterial />
    </instancedMesh>
  )
}
export default InstanceForestTreeWrapper
