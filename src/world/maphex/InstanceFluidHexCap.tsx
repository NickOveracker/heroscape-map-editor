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
import { hexTerrainColor } from './hexColors'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { CylinderGeometryArgs, InstanceCapProps } from './instance-hex'
import { HEXGRID_HEX_HEIGHT, HEXGRID_HEXCAP_FLUID_HEIGHT } from '../../utils/constants'

const baseFluidCapCylinderArgs: CylinderGeometryArgs = [0.999, 0.997, HEXGRID_HEXCAP_FLUID_HEIGHT, 6, undefined, false, undefined, undefined]
const tempColor = new Color()
const capFluidOpacity = 0.85
const InstanceFluidHexCap = ({
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
  >(null!)
  const countOfCapHexes = capHexesArray.length
  const colorArray = useMemo(
    () => Float32Array.from(new Array(capHexesArray.length).fill(0).flatMap((_, i) => tempColor.set(hexTerrainColor[capHexesArray[i].terrain]).toArray())),
    [capHexesArray]
  )
  useLayoutEffect(() => {
    const placeholder = new Object3D()
    capHexesArray.forEach((boardHex, i) => {
      const { x, z } = getBoardHex3DCoords(boardHex)
      const y = (boardHex.altitude - 1) * HEXGRID_HEX_HEIGHT + (HEXGRID_HEXCAP_FLUID_HEIGHT / 2)

      placeholder.position.set(x, y, z)
      placeholder.updateMatrix()
      instanceRef.current.setMatrixAt(i, placeholder.matrix)
    })
    instanceRef.current.instanceMatrix.needsUpdate = true
  }, [capHexesArray])

  const handleEnter = (e: ThreeEvent<PointerEvent>) => {
    if (e.instanceId === 0 || !!e.instanceId) {
      onPointerEnter(capHexesArray[e.instanceId])
      tempColor.set('#fff').toArray(colorArray, e.instanceId * 3)
      instanceRef.current.geometry.attributes.color.needsUpdate = true
    }
  }
  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    onPointerOut()
    if (e.instanceId === 0 || !!e.instanceId) {
      tempColor.set(hexTerrainColor[capHexesArray[e.instanceId].terrain]).toArray(colorArray, e.instanceId * 3)
      instanceRef.current.geometry.attributes.color.needsUpdate = true
    }
  }
  const handleDown = (e: ThreeEvent<PointerEvent>) => {
    if (e.instanceId === 0 || !!e.instanceId) {
      onPointerDown(e, capHexesArray[e.instanceId])
    }
  }


  return (
    <instancedMesh
      ref={instanceRef}
      args={[undefined, undefined, countOfCapHexes]} //args:[geometry, material, count]
      onPointerEnter={handleEnter}
      onPointerOut={handleOut}
      onPointerDown={handleDown}
    >
      <meshLambertMaterial
        transparent
        opacity={capFluidOpacity}
        vertexColors
        toneMapped={false}
      />
      <cylinderGeometry args={baseFluidCapCylinderArgs}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </cylinderGeometry>
    </instancedMesh>
  )
}

export default InstanceFluidHexCap
