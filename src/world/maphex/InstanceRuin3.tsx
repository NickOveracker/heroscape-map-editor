import { useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { BoardHex, HexTerrain } from '../../types'
import { hexTerrainColor } from './hexColors'
import { InstanceRefType } from './instance-hex'


type InstanceRuin3WrapperProps = {
  ruin3Hexes: BoardHex[]
  glKey: string
}

const InstanceRuin3Wrapper = (props: InstanceRuin3WrapperProps) => {
  const numInstances = props.ruin3Hexes.length
  if (numInstances < 1) return null
  const key = `${props.glKey}${numInstances}` // IMPORTANT: to include numInstances in key, otherwise gl will crash on change
  return <InstanceRuin3 key={key} ruin3Hexes={props.ruin3Hexes} />
}
const InstanceRuin3 = ({ ruin3Hexes }: { ruin3Hexes: BoardHex[] }) => {
  const instanceRef = useRef<InstanceRefType>(undefined!)
  const countOfJungles = ruin3Hexes.length

  // effect where we create and update instance mesh for each tree mesh
  useLayoutEffect(() => {
    const placeholder = new THREE.Object3D()
    ruin3Hexes.forEach((ruinHex, i) => {
      // const { x, z } = getBoardHex3DCoords(ruinHex)
      // placeholder.scale.set(1, treeHeight, 1)
      // placeholder.position.set(x, y, z)
      placeholder.updateMatrix()
      const ruinColor = new THREE.Color(hexTerrainColor[HexTerrain.ruin])
      instanceRef.current.setColorAt(i, ruinColor)
      instanceRef.current.setMatrixAt(i, placeholder.matrix)
    })
    instanceRef.current.instanceMatrix.needsUpdate = true
  }, [ruin3Hexes])
  return (
    <instancedMesh
      ref={instanceRef}
      args={[undefined, undefined, countOfJungles]} //args:[geometry, material, count]
      castShadow
      receiveShadow
    >
      {/* <cylinderGeometry args={jungleCylinderGeometryArgs} /> */}
      <meshLambertMaterial />
    </instancedMesh>
  )
}
export default InstanceRuin3Wrapper
