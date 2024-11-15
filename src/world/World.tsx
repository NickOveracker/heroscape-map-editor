import React from "react"
import { Canvas } from "@react-three/fiber"
import { Stars, Stats } from "@react-three/drei"
import Lights from "./Lights"
import MyCameraControls from "./camera/MyCameraControls"
import MapEditor from "./MapEditor"
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
