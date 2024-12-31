import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera, PerspectiveCamera, Stars, Stats } from '@react-three/drei'
import Lights from './Lights'
import MyCameraControls from './camera/MyCameraControls'
import MapDisplay3D from './MapDisplay3D'
import { CAMERA_FOV } from '../utils/constants'
import GridHelper from './GridHelper'
import * as THREE from 'three'
import useBoundStore from '../store/store'
import TakeAPictureBox from './camera/TakeAPictureBox'

const World = () => {
  const cameraControlsRef = React.useRef(undefined!)
  const mapGroupRef = React.useRef<THREE.Group<THREE.Object3DEventMap>>(undefined!)
  const isOrthoCam = useBoundStore(s => s.isOrthoCam)
  const isTakingPicture = useBoundStore(s => s.isTakingPicture)

  return (
    <div
      id="canvas-container"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <Canvas >
        <color attach="background" args={["white"]} />
        <PerspectiveCamera position={[10, 10, 10]} fov={CAMERA_FOV} makeDefault={!isOrthoCam} />
        <OrthographicCamera position={[0, 100, 100]} zoom={50} makeDefault={isOrthoCam} />
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
        <Stats className="stats-panel" />
        <MapDisplay3D mapGroupRef={mapGroupRef} cameraControlsRef={cameraControlsRef} />
        <Lights />
        {!isTakingPicture && <GridHelper />}
        <MyCameraControls
          cameraControlsRef={cameraControlsRef}
          mapGroupRef={mapGroupRef}
        />
        <TakeAPictureBox />
      </Canvas>
    </div>
  )
}

export default World
