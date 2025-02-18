import React from 'react'
import { Canvas } from '@react-three/fiber'
import { CameraControls, OrthographicCamera, PerspectiveCamera, Stars, Stats } from '@react-three/drei'
import Lights from './Lights'
import MyCameraControls from './camera/MyCameraControls'
import MapDisplay3D from './MapDisplay3D'
import * as THREE from 'three'
import useBoundStore from '../store/store'
import TakeAPictureBox from './camera/TakeAPictureBox'
import { ClickAwayListener } from '@mui/material'
import { CAMERA_FOV } from '../utils/constants'
import SelectedPieceReadout, { HoveredPieceReadout } from '../controls/SelectedPieceReadout'

const World = ({
  cameraControlsRef
}: {
  cameraControlsRef: React.RefObject<CameraControls>
}) => {
  const mapGroupRef = React.useRef<THREE.Group<THREE.Object3DEventMap>>(undefined!)
  const isOrthoCam = useBoundStore(s => s.isOrthoCam)
  // const isTakingPicture = useBoundStore(s => s.isTakingPicture)
  const toggleHoveredPieceID = useBoundStore(s => s.toggleHoveredPieceID)
  const toggleSelectedPieceID = useBoundStore(s => s.toggleSelectedPieceID)
  const handleClickAway = () => {
    toggleHoveredPieceID('')
    toggleSelectedPieceID('')
  }
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <Canvas
          onPointerMissed={(event) => {
            if (event.button !== 0) {
              // THIS IS A RIGHT CLICK
              // TODO: Can paste in copied templates! BUT, user must agree to reading text/images from the clipboard
              // const myClipboard = await navigator.clipboard.readText()
              return
            }
            toggleHoveredPieceID('')
            toggleSelectedPieceID('')
          }}
          onPointerLeave={() => {
            toggleHoveredPieceID('')
          }}
        >
          {/* <color attach="background" args={["white"]} /> */}
          <PerspectiveCamera
            position={[10, 10, 10]}
            fov={CAMERA_FOV}
            makeDefault={!isOrthoCam}
          />
          <OrthographicCamera position={[100, 1000, 100]} zoom={30} makeDefault={isOrthoCam} />
          {!isOrthoCam && <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={2}
            saturation={0}
            fade
            speed={1}
          />}
          {/* Stats displays the fps */}
          <Stats className="stats-panel" />
          <MapDisplay3D mapGroupRef={mapGroupRef} cameraControlsRef={cameraControlsRef} />
          <Lights />
          {/* {!isTakingPicture && <GridHelper />} */}
          <MyCameraControls
            cameraControlsRef={cameraControlsRef}
            mapGroupRef={mapGroupRef}
          />
          <TakeAPictureBox />
        </Canvas>
        <SelectedPieceReadout />
        <HoveredPieceReadout />
      </div>
    </ClickAwayListener>
  )
}

export default World
