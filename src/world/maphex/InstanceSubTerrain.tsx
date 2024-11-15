import { useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { BoardHex, HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { hexTerrainColor } from './hexColors'


type InstanceSubTerrainWrapperProps = {
    boardHexes: BoardHex[] // OVERHANGS will change this, somehow
    glKey: string
}

const InstanceSubTerrainWrapper = (props: InstanceSubTerrainWrapperProps) => {
    const numInstances = props.boardHexes.length
    if (numInstances < 1) return null
    const key = `${props.glKey}${numInstances}` // IMPORTANT: to include numInstances in key, otherwise gl will crash on change
    return <InstanceSubTerrain key={key} boardHexes={props.boardHexes} />
}

const InstanceSubTerrain = ({ boardHexes }: { boardHexes: BoardHex[] }) => {
    const instanceRef = useRef<any>(undefined!)
    const countOfSubTerrains = boardHexes.length

    // effect where we create and update instance mesh for each subterrain mesh
    useLayoutEffect(() => {
        const placeholder = new THREE.Object3D()
        boardHexes.forEach((boardHex, i) => {
            const subTerrainColor = new THREE.Color(hexTerrainColor[HexTerrain.grass])
            const { x, y: scaleY, z } = getBoardHex3DCoords(boardHex)
            const y = scaleY / 2 // vertical position is halfway between top and bottom

            const subTerrainPosition = new THREE.Vector3(x, y, z)
            placeholder.scale.set(1, scaleY, 1)
            placeholder.position.set(
                subTerrainPosition.x,
                subTerrainPosition.y,
                subTerrainPosition.z)
            placeholder.updateMatrix()
            instanceRef.current.setColorAt(i, subTerrainColor)
            instanceRef.current.setMatrixAt(i, placeholder.matrix)
        })
        instanceRef.current.instanceMatrix.needsUpdate = true
    }, [boardHexes])

    return (
        <instancedMesh
            ref={instanceRef}
            args={[undefined, undefined, countOfSubTerrains]} //args:[geometry, material, count]
        >
            <cylinderGeometry args={[1, 1, 1, 6]} />
            <meshBasicMaterial />
        </instancedMesh>
    )
}
export default InstanceSubTerrainWrapper
