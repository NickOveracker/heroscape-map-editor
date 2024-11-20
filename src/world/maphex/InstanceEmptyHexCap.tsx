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
} from 'three'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { hexTerrainColor } from './hexColors'
import { HEXGRID_EMPTYHEX_HEIGHT, HEXGRID_HEX_HEIGHT } from '../../utils/constants'
import { CylinderGeometryArgs, InstanceCapProps } from './instance-hex'


const baseEmptyCapCylinderArgs: CylinderGeometryArgs = [0.999, 0.997, HEXGRID_EMPTYHEX_HEIGHT, 6, undefined, false, undefined, undefined]
const tempColor = new Color()
const InstanceEmptyHexCap = ({
    capHexesArray,
    onPointerEnter,
    onPointerOut,
    onPointerDown,
}: InstanceCapProps) => {
    const instanceRef = useRef<InstancedMesh<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        InstancedMeshEventMap
    >
    >(null!)
    const countOfCapHexes = capHexesArray.length

    const colorArray = useMemo(() => {
        return Float32Array.from(new Array(capHexesArray.length).fill(0).flatMap((_, i) => {
            return tempColor.set(hexTerrainColor[capHexesArray[i].terrain]).toArray()
        }))
    }, [capHexesArray])
    useLayoutEffect(() => {
        const placeholder = new Object3D()
        capHexesArray.forEach((boardHex, i) => {
            const { x, z } = getBoardHex3DCoords(boardHex)
            const y = boardHex.altitude * HEXGRID_HEX_HEIGHT
            placeholder.position.set(x, y, z)
            placeholder.updateMatrix()
            instanceRef.current.setMatrixAt(i, placeholder.matrix)
        })
        instanceRef.current.instanceMatrix.needsUpdate = true
    }, [capHexesArray])

    const handleEnter = (e: ThreeEvent<PointerEvent>) => {
        if (e.instanceId === 0 || !!e.instanceId) {
            onPointerEnter(e, capHexesArray[e.instanceId])
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
            onPointerDown={handleDown}
            onPointerEnter={handleEnter}
            onPointerOut={handleOut}
        >
            {/* <cylinderGeometry args={[1, 1, 0.25, 6]}> */}
            <cylinderGeometry args={baseEmptyCapCylinderArgs}>
                <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
            </cylinderGeometry>
            <meshLambertMaterial
                // transparent
                // opacity={0.5}
                vertexColors
            />
        </instancedMesh>
    )
}
export default InstanceEmptyHexCap
