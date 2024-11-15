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
import { InstanceCapProps } from './InstanceCapWrapper'
import { hexTerrainColor } from './hexColors'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'



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
    >(undefined)
    const countOfCapHexes = capHexesArray.length

    const colorArray = useMemo(() => {
        return Float32Array.from(new Array(capHexesArray.length).fill(0).flatMap((_, i) => {
            return tempColor.set(hexTerrainColor[capHexesArray[i].terrain]).toArray()
        }))
    }, [capHexesArray])
    useLayoutEffect(() => {
        const placeholder = new Object3D()
        capHexesArray.forEach((boardHex, i) => {
            const { x, z, y } = getBoardHex3DCoords(boardHex)
            placeholder.position.set(x, y, z)
            placeholder.scale.set(1, 1, 1)
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
            args={[undefined, undefined, countOfCapHexes]} //args:[geometry, material, count]
            onPointerDown={handleDown}
            onPointerEnter={handleEnter}
            onPointerOut={handleOut}
        >
            <cylinderGeometry args={[1, HEXGRID_HEX_HEIGHT / 2, 1, 6]}>
                <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
            </cylinderGeometry>
            <meshLambertMaterial
                transparent
                opacity={0.5}
                vertexColors
            />
        </instancedMesh>
    )
}
export default InstanceEmptyHexCap
