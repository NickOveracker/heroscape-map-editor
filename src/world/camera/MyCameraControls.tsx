import React from 'react'
import { CameraControls } from '@react-three/drei'
import useBoundStore from '../../store/store'
import { useHotkeys } from 'react-hotkeys-hook'
import { Group, Object3DEventMap } from 'three'

export default function MyCameraControls({
  cameraControlsRef,
  mapGroupRef,
}: {
  cameraControlsRef: React.RefObject<CameraControls>
  mapGroupRef: React.RefObject<Group<Object3DEventMap>>
}) {
  const isCameraDisabled = useBoundStore((s) => s.isCameraDisabled || s.isTakingPicture)
  const enabled = {
    enabled: !isCameraDisabled,
  }
  const fitToMap = () => {
    if (mapGroupRef.current) {
      cameraControlsRef.current?.fitToBox?.(mapGroupRef.current, true)
    }
  }

  useHotkeys('home', () => fitToMap(), enabled)
  useHotkeys('0', () => cameraControlsRef?.current?.reset(true), enabled)
  useHotkeys('up', () => { cameraControlsRef?.current?.truck(0, -1, true) }, enabled)
  useHotkeys('down', () => cameraControlsRef?.current?.truck(0, 1, true), enabled)
  useHotkeys('left', () => cameraControlsRef?.current?.truck(-1, 0, true), enabled)
  useHotkeys('right', () => cameraControlsRef?.current?.truck(1, 0, true), enabled)
  useHotkeys('shift+up', () => { cameraControlsRef.current?.rotate(0, -Math.PI / 27, true) }, enabled)
  useHotkeys('shift+down', () => { cameraControlsRef.current?.rotate(0, Math.PI / 27, true) }, enabled)
  useHotkeys('shift+left', () => { cameraControlsRef.current?.rotate(-Math.PI / 27, 0, true) }, enabled)
  useHotkeys('shift+right', () => { cameraControlsRef.current?.rotate(Math.PI / 27, 0, true) }, enabled)
  useHotkeys('mod+up', () => { cameraControlsRef?.current?.dolly(1, true) }, enabled)
  useHotkeys('mod+down', () => { cameraControlsRef?.current?.dolly(-1, true) }, enabled)
  useHotkeys('mod+left', () => { cameraControlsRef?.current?.zoom(-cameraControlsRef.current.camera.zoom / 2, true) }, enabled)
  useHotkeys('mod+right', () => { cameraControlsRef?.current?.zoom(cameraControlsRef.current.camera.zoom / 2, true) }, enabled)


  return (
    <CameraControls
      ref={cameraControlsRef}
      makeDefault
      enabled={!isCameraDisabled}
      maxPolarAngle={Math.PI / 2} // this keeps the camera on a half-sphere around the map, rather than allowing camera to go under the map
      minDistance={1} // this keeps the camera above ground and out of the board hexes nether region
      maxDistance={100} // this prevents camera from dollying out too far
      smoothTime={0.3}
    />
  )
}
