import { useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { BoardHex, HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { hexTerrainColor } from './hexColors'
import { SubTerrainHex } from '../MapDisplay3D'
import { HEXGRID_HEX_HEIGHT, HEXGRID_HEXCAP_HEIGHT } from '../../utils/constants'


type InstanceSubTerrainWrapperProps = {
    subTerrainHexes: SubTerrainHex[]
    glKey: string
}

const InstanceSubTerrainWrapper = (props: InstanceSubTerrainWrapperProps) => {
    const numInstances = props.subTerrainHexes.length
    if (numInstances < 1) return null
    const key = `${props.glKey}${numInstances}` // IMPORTANT: to include numInstances in key, otherwise gl will crash on change
    return <InstanceSubTerrain key={key} subTerrainHexes={props.subTerrainHexes} />
}
const dirtColor = new THREE.Color(hexTerrainColor[HexTerrain.dirt])
const InstanceSubTerrain = ({ subTerrainHexes }: { subTerrainHexes: SubTerrainHex[] }) => {
    const instanceRef = useRef<any>(undefined!)
    const countOfSubTerrains = subTerrainHexes.length

    // effect where we create and update instance mesh for each subterrain mesh
    useLayoutEffect(() => {
        const placeholder = new THREE.Object3D()
        subTerrainHexes.forEach((boardHex, i) => {
            const { x, z } = getBoardHex3DCoords(boardHex)
            const top = boardHex.altitude * HEXGRID_HEX_HEIGHT
            const bottom = (boardHex?.baseHexAltitude ?? 0) * HEXGRID_HEX_HEIGHT // if not specified, it's the bottom
            const y = ((top + bottom) / 2)
            const height = top - bottom
            const scaleY = height

            const subTerrainPosition = new THREE.Vector3(x, y, z)
            placeholder.scale.set(1, scaleY, 1)
            const isDirtSubterrain = boardHex.terrain === HexTerrain.grass || boardHex.terrain === HexTerrain.sand || boardHex.terrain === HexTerrain.rock
            // const subTerrainColor = isDirtSubterrain ? dirtColor : new THREE.Color(hexTerrainColor[boardHex.terrain])
            const subTerrainColor = new THREE.Color(hexTerrainColor[boardHex.terrain])
            placeholder.position.set(
                subTerrainPosition.x,
                subTerrainPosition.y,
                subTerrainPosition.z)
            placeholder.updateMatrix()
            instanceRef.current.setColorAt(i, subTerrainColor)
            instanceRef.current.setMatrixAt(i, placeholder.matrix)
        })
        instanceRef.current.instanceMatrix.needsUpdate = true
    }, [subTerrainHexes])

    return (
        <instancedMesh
            ref={instanceRef}
            args={[undefined, undefined, countOfSubTerrains]} //args:[geometry, material, count]
        >
            <cylinderGeometry args={[1, 1, 1, 6, undefined, true]} />
            <meshBasicMaterial />
        </instancedMesh>
    )
}
export default InstanceSubTerrainWrapper
