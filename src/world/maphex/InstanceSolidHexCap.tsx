import { useRef, useLayoutEffect, useMemo } from 'react'
import { ThreeEvent } from '@react-three/fiber'
import {
  BufferGeometry,
  Color,
  InstancedMesh,
  InstancedMeshEventMap,
  Material,
  NormalBufferAttributes,
  Object3D,
  Vector3,
} from 'three'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { InstanceCapProps } from './InstanceCapWrapper'
import { hexTerrainColor } from './hexColors'

const tempColor = new Color()
const InstanceSolidHexCap = ({
  capHexesArray,
  onPointerEnter,
  onPointerOut,
  onPointerDown,
}: InstanceCapProps) => {
  const instanceRef = useRef<
    InstancedMesh<
      BufferGeometry<NormalBufferAttributes>,
      Material | Material[],
      InstancedMeshEventMap
    >
  >(undefined)
  const countOfCapHexes = capHexesArray.length
  const colorArray = useMemo(
    () => {
      return Float32Array.from(new Array(capHexesArray.length).fill(0).flatMap((_, i) => tempColor.set(hexTerrainColor[capHexesArray[i].terrain]).toArray()))
    },
    [capHexesArray]
  )

  // effect where we create and update instance position
  useLayoutEffect(() => {
    const placeholder = new Object3D()
    capHexesArray.forEach((boardHex, i) => {
      const altitude = boardHex.altitude
      const yAdjustFluidCap = altitude / 2
      const yAdjustSolidCap =
        yAdjustFluidCap - (0.0625)
      const { x, z } = getBoardHex3DCoords(boardHex)
      const capPosition = new Vector3(x, yAdjustSolidCap, z)

      placeholder.position.set(capPosition.x, capPosition.y, capPosition.z)
      placeholder.scale.set(1, 0.25, 1)
      placeholder.updateMatrix()
      instanceRef.current.setMatrixAt(i, placeholder.matrix)
    })
    instanceRef.current.instanceMatrix.needsUpdate = true
  }, [capHexesArray])

  const handleEnter = (e: ThreeEvent<PointerEvent>) => {
    onPointerEnter(e, capHexesArray[e.instanceId])
    tempColor.set('#fff').toArray(colorArray, e.instanceId * 3)
    instanceRef.current.geometry.attributes.color.needsUpdate = true
  }
  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    onPointerOut(e)
    tempColor.set(hexTerrainColor[capHexesArray[e.instanceId].terrain]).toArray(colorArray, e.instanceId * 3)
    instanceRef.current.geometry.attributes.color.needsUpdate = true
  }
  const handleDown = (e: ThreeEvent<PointerEvent>) => {
    onPointerDown(e, capHexesArray[e.instanceId])
  }

  return (
    <instancedMesh
      ref={instanceRef}
      args={[null, null, countOfCapHexes]} //args:[geometry, material, count]
      onPointerDown={handleDown}
      onPointerEnter={handleEnter}
      onPointerOut={handleOut}
    >
      <cylinderGeometry args={[1, 1, 0.25, 6]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </cylinderGeometry>
      <meshLambertMaterial toneMapped={false} vertexColors />

    </instancedMesh>
  )
}
export default InstanceSolidHexCap
