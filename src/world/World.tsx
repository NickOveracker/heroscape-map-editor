import { Canvas } from "@react-three/fiber"
import { CAMERA_FOV } from "../utils/constants"
import Lights from "./Lights"
import { Stars, Stats } from "@react-three/drei"
import React from "react"
import MyCameraControls from "./MyCameraControls"
import useAppState from "../store/store"
import MapEditor from "./MapEditor"
import { Vector3 } from "three"

const World = () => {
    const boardHexes = useAppState((state) => state.boardHexes)
    const hexMap = useAppState((state) => state.hexMap)
    const cameraControlsRef = React.useRef(undefined)
    return (
        <div
            id="canvas-container"
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
            }}
        >
            <Canvas camera={{
                fov: CAMERA_FOV,
            }}>
                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={0.1}
                />
                {/* Stats displays the fps */}
                <Stats className='stats-panel' />
                <MapEditor
                    boardHexes={boardHexes}
                    hexMapID={hexMap.id}
                    cameraControlsRef={cameraControlsRef}
                />
                <Lights />
                <axesHelper scale={[0, 10, 0]} />
                <axesHelper scale={[10, 0, 10]} position={new Vector3(0, 0 / 2, 0)} />
                <axesHelper scale={[10, 0, 10]} position={new Vector3(0, 1 / 2, 0)} />
                <axesHelper scale={[10, 0, 10]} position={new Vector3(0, 2 / 2, 0)} />
                <axesHelper scale={[10, 0, 10]} position={new Vector3(0, 3 / 2, 0)} />
                <axesHelper scale={[10, 0, 10]} position={new Vector3(0, 4 / 2, 0)} />
                <axesHelper scale={[10, 0, 10]} position={new Vector3(0, 5 / 2, 0)} />
                <axesHelper scale={[10, 0, 10]} position={new Vector3(0, 6 / 2, 0)} />
                <axesHelper scale={[10, 0, 10]} position={new Vector3(0, 7 / 2, 0)} />
                <MyCameraControls cameraControlsRef={cameraControlsRef} />
            </Canvas>

        </div>
    )
}

export default World
