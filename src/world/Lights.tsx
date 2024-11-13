import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, Stats } from '@react-three/drei'

import { BoardHexes, Glyphs, HexMap } from '../game/types'
import { HexopolisMapDisplay3D } from '../hexopolis-ui/world/HexopolisMapDisplay3D'
import { HexxaformMapDisplay3D } from '../hexxaform-ui/world/HexxaformMapDisplay3D'
import { CAMERA_FOV } from '../game/constants'
import { HexxaformMoves } from '../game/hexxaform/hexxaform-types'
import TakeAPictureBox from './TakeAPictureBox'
import MyCameraControls from './world/MyCameraControls'


export const World = ({
  boardHexes,
  hexMap,
  glyphs,
  isEditor,
  hexxaformMoves,
}: {
  boardHexes: BoardHexes
  hexMap: HexMap
  glyphs: Glyphs
  isEditor?: boolean
  hexxaformMoves?: HexxaformMoves
}) => {
  const cameraControlsRef = useRef(undefined)
  return (
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
      <WorldOverheadLights />
      <TakeAPictureBox />
      {/* Stats displays the fps */}
      <Stats className='stats-panel' />
      {isEditor ? (
        <HexxaformMapDisplay3D
          boardHexes={boardHexes}
          hexMapID={hexMap.id}
          moves={hexxaformMoves}
          glyphs={glyphs}
          cameraControlsRef={cameraControlsRef}
        />
      ) : (
        <HexopolisMapDisplay3D
          boardHexes={boardHexes}
          cameraControlsRef={cameraControlsRef}
        />
      )}
      <axesHelper scale={[100, 100, 100]} />
      <MyCameraControls cameraControlsRef={cameraControlsRef} />
    </Canvas>
  )
}

export default function WorldOverheadLights() {
  return (
    <>
      <ambientLight intensity={1} />
      {/* 4 in rectangle over top, shop-light style */}
      {/* <directionalLight position={[50, 50, 50]} intensity={0.65} />
      <directionalLight position={[50, 50, -50]} intensity={0.65} />
      <directionalLight position={[-50, 50, 50]} intensity={0.65} />
      <directionalLight position={[-50, 50, -50]} intensity={0.65} /> */}
      <hemisphereLight args={['rgb(255, 245, 177)', 'rgb(255, 205, 66)', 2]} />
      {/* scene.add(new THREE.HemisphereLight(0xffffbb, 0x080820, 1))
        scene.add(new THREE.AmbientLight(0x666666))
        const light = new THREE.DirectionalLight(0xdfebff, 1) */}
      {/* 4 on sides, picture-day style */}
      {/* <directionalLight position={[-50, 0, 0]} intensity={0.65} />
      <directionalLight position={[-50, 0, -50]} intensity={0.65} />
      <directionalLight position={[0, 0, 0]} intensity={0.65} />
      <directionalLight position={[0, 0, -50]} intensity={0.65} /> */}
    </>
  )
}
