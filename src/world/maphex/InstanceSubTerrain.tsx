import { useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { BoardHex, HexTerrain } from '../../types'
import { getBoardHex3DCoords } from '../../utils/map-utils'
import { hexTerrainColor } from './hexColors'
import { HEXGRID_HEX_HEIGHT } from '../../utils/constants'
import { CylinderGeometryArgs, InstanceRefType } from './instance-hex'


type InstanceSubTerrainWrapperProps = {
    subTerrainHexes: BoardHex[]
    glKey: string
}

const InstanceSubTerrainWrapper = (props: InstanceSubTerrainWrapperProps) => {
    const numInstances = props.subTerrainHexes.length
    if (numInstances < 1) return null
    const key = `${props.glKey}${numInstances}` // IMPORTANT: to include numInstances in key, otherwise gl will crash on change
    return <InstanceSubTerrain key={key} subTerrainHexes={props.subTerrainHexes} />
}

const baseSubTerrainCylinderArgs: CylinderGeometryArgs = [1, 1, 1, 6, undefined, true, undefined, undefined]
const dirtColor = new THREE.Color(hexTerrainColor[HexTerrain.dirt])
const InstanceSubTerrain = ({ subTerrainHexes }: { subTerrainHexes: BoardHex[] }) => {
    const instanceRef = useRef<InstanceRefType>(undefined!)
    const countOfSubTerrains = subTerrainHexes.length

    // effect where we create and update instance mesh for each subterrain mesh
    useLayoutEffect(() => {
        const placeholder = new THREE.Object3D()
        subTerrainHexes.forEach((boardHex, i) => {
            const { x, z } = getBoardHex3DCoords(boardHex)
            const top = boardHex.altitude * HEXGRID_HEX_HEIGHT
            const bottom = top - HEXGRID_HEX_HEIGHT
            const y = ((top + bottom) / 2) // place it halfway between top and bottom
            const scaleY = top - bottom // since cylinder's base height is 1

            placeholder.scale.set(1, scaleY, 1)
            const isDirtSubterrain = boardHex.terrain === HexTerrain.grass || boardHex.terrain === HexTerrain.sand || boardHex.terrain === HexTerrain.rock
            const subTerrainColor = isDirtSubterrain ? dirtColor : new THREE.Color(hexTerrainColor[boardHex.terrain])
            placeholder.position.set(x, y, z)
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
            castShadow
            receiveShadow
        >
            <cylinderGeometry args={baseSubTerrainCylinderArgs} />
            <meshLambertMaterial />
        </instancedMesh>
    )
}
export default InstanceSubTerrainWrapper
