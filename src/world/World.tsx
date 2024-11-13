import { Canvas } from "@react-three/fiber"
import { CAMERA_FOV } from "../constants"
import Lights from "./Lights"
import { Stars, Stats } from "@react-three/drei"
import React from "react"
import MyCameraControls from "./MyCameraControls"


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
                <mesh>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshPhongMaterial />
                </mesh>
                <Lights />
                <axesHelper scale={[100, 100, 100]} />
                <MyCameraControls cameraControlsRef={cameraControlsRef} />
            </Canvas>

        </div>
    )
}

export default World
