import React from "react"
import { Canvas } from "@react-three/fiber"
import { Stats } from "@react-three/drei"
import Lights from "./Lights"
import MyCameraControls from "./camera/MyCameraControls"
import MapDisplay3D from "./MapDisplay3D"
import GridHelper from "./GridHelper"
import { CAMERA_FOV } from "../utils/constants"

const World = () => {
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
                {/* Stats displays the fps */}
                <Stats className='stats-panel' />
                <MapDisplay3D
                    cameraControlsRef={cameraControlsRef}
                />
                <Lights />
                <GridHelper />
                <MyCameraControls cameraControlsRef={cameraControlsRef} />
            </Canvas>
        </div>
    )
}

export default World
