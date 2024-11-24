import { useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { BoardHex, HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { hexTerrainColor } from './hexColors'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'
import { CylinderGeometryArgs, InstanceRefType } from './instance-hex'


type InstanceSubTerrainWrapperProps = {
  jungleHexes: BoardHex[]
  glKey: string
}

const InstanceJungleWrapper = (props: InstanceSubTerrainWrapperProps) => {
  const numInstances = props.jungleHexes.length
  if (numInstances < 1) return null
  const key = `${props.glKey}${numInstances}` // IMPORTANT: to include numInstances in key, otherwise gl will crash on change
  return <InstanceJungle key={key} jungleHexes={props.jungleHexes} />
}
const jungleCylinderGeometryArgs: CylinderGeometryArgs = [0.3, 0.3, 1, 6, undefined, false, undefined, undefined]
const InstanceJungle = ({ jungleHexes }: { jungleHexes: BoardHex[] }) => {
  const instanceRef = useRef<InstanceRefType>(undefined!)
  const countOfJungles = jungleHexes.length

  // effect where we create and update instance mesh for each tree mesh
  useLayoutEffect(() => {
    const placeholder = new THREE.Object3D()
    jungleHexes.forEach((jungleHex, i) => {
      const { x, z } = getBoardHex3DCoords(jungleHex)
      const treeHeight = (jungleHex?.obstacleHeight ?? 10) * HEXGRID_HEX_HEIGHT // 5
      const yHex = (jungleHex.altitude - 1) * HEXGRID_HEX_HEIGHT
      const y = yHex + (treeHeight / 2)
      placeholder.scale.set(1, treeHeight, 1)
      placeholder.position.set(x, y, z)
      placeholder.updateMatrix()
      const jungleColor = new THREE.Color(hexTerrainColor[HexTerrain.jungle])
      instanceRef.current.setColorAt(i, jungleColor)
      instanceRef.current.setMatrixAt(i, placeholder.matrix)
    })
    instanceRef.current.instanceMatrix.needsUpdate = true
  }, [jungleHexes])
  return (
    <instancedMesh
      ref={instanceRef}
      args={[undefined, undefined, countOfJungles]} //args:[geometry, material, count]
      castShadow
      receiveShadow
    >
      <cylinderGeometry args={jungleCylinderGeometryArgs} />
      <meshLambertMaterial />
    </instancedMesh>
  )
}
export default InstanceJungleWrapper
