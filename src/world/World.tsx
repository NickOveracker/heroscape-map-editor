import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import Lights from './Lights'
import MyCameraControls from './camera/MyCameraControls'
import MapDisplay3D from './MapDisplay3D'
import { CAMERA_FOV } from '../utils/constants'
import GridHelper from './GridHelper'
import { Group, Object3DEventMap } from 'three'

const World = () => {
  const cameraControlsRef = React.useRef(undefined!)
  const mapGroupRef = React.useRef<Group<Object3DEventMap>>(undefined!)
  return (
    <div
      id="canvas-container"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <Canvas
        // orthographic // looks really cool, but cannot figure out camera switching yet
        camera={{
          fov: CAMERA_FOV,
          position: [10, 10, 10]
        }}
      // shadows
      >
        {/* <Sky /> */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={2}
          saturation={0}
          fade
          speed={1}
        />
        {/* Stats displays the fps */}
        {/* <Stats className="stats-panel" /> */}
        <MapDisplay3D mapGroupRef={mapGroupRef} cameraControlsRef={cameraControlsRef} />
        <Lights />
        <GridHelper />
        <MyCameraControls
          cameraControlsRef={cameraControlsRef}
          mapGroupRef={mapGroupRef}
        />
      </Canvas>
    </div>
  )
}

export default World
