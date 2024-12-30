import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MapControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three'
export function MyMapCamera() {
  const [oldType, setOldType] = useState('OrthographicCamera');
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const gl = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera);

  const proxyRef = useRef<THREE.Group>(null);
  const mapControlsRef = useRef<OrbitControlsImpl>(null);
  const orthographicRef = useRef<THREE.OrthographicCamera>(null);
  const perspectiveRef = useRef<THREE.PerspectiveCamera>(null!);

  const { set } = useThree(({ get, set }) => ({ get, set }));

  useEffect(() => {
    set({ camera: perspectiveRef.current });

    const handleWindowMouseMove = (event: { clientX: number; clientY: number }) => {
      setCoords({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, []);

  useFrame(() => {
    // HACK: Mouse capture resets when switching cameras because MapControls creates a new instance
    // of itself. The group element and proxyRef is part of this hack in order to keep the MapControls
    // target property from resetting.
    if (camera.type !== oldType) {
      gl.domElement.dispatchEvent(
        new PointerEvent('pointerdown', { button: 2, pointerType: 'mouse', clientX: coords.x, clientY: coords.y })
      );

      setOldType(camera.type);
    }

    if (!mapControlsRef.current || !proxyRef.current) return;

    if (mapControlsRef.current !== proxyRef.current.userData['controls']) {
      if (proxyRef.current.userData['controls']) {
        mapControlsRef.current.target.copy(proxyRef.current.userData['controls'].target);
        mapControlsRef.current.update();
      }
      proxyRef.current.userData['controls'] = mapControlsRef.current;
    }

    const angle = mapControlsRef.current.getPolarAngle();

    if (+angle.toFixed(2) === 0.0) {
      if (
        camera.type === 'OrthographicCamera' ||
        !orthographicRef.current ||
        !perspectiveRef.current ||
        !mapControlsRef.current
      )
        return;

      orthographicRef.current.position.copy(perspectiveRef.current.position);
      const distance = perspectiveRef.current.position.distanceTo(mapControlsRef.current.target);
      const halfWidth = frustumWidthAtDistance(perspectiveRef.current, distance) / 2;
      const halfHeight = frustumHeightAtDistance(perspectiveRef.current, distance) / 2;

      orthographicRef.current.top = halfHeight;
      orthographicRef.current.bottom = -halfHeight;
      orthographicRef.current.left = -halfWidth;
      orthographicRef.current.right = halfWidth;
      orthographicRef.current.zoom = 1;
      orthographicRef.current.lookAt(mapControlsRef.current.target);
      orthographicRef.current.updateProjectionMatrix();

      set({ camera: orthographicRef.current });
    } else if (camera.type === 'OrthographicCamera') {
      if (!orthographicRef.current || !perspectiveRef.current || !mapControlsRef.current) return;

      const oldY = perspectiveRef.current.position.y;
      perspectiveRef.current.position.copy(orthographicRef.current.position);
      perspectiveRef.current.position.y = oldY / orthographicRef.current.zoom;
      perspectiveRef.current.updateProjectionMatrix();

      set({ camera: perspectiveRef.current });
    }
  });

  useFrame((state) => {
    gl.render(state.scene, camera);
  }, 1);

  return (
    <>
      <group ref={proxyRef}></group>
      <MapControls ref={mapControlsRef} domElement={gl.domElement} />
      <PerspectiveCamera ref={perspectiveRef} position={[150, 1300, 1100]} fov={71} far={4000} />
      <OrthographicCamera ref={orthographicRef} near={1} far={4000} />
    </>
  );
}

function frustumHeightAtDistance(camera: THREE.PerspectiveCamera, distance: number) {
  const vFov = (camera.fov * Math.PI) / 180;
  return Math.tan(vFov / 2) * distance * 2;
}

function frustumWidthAtDistance(camera: THREE.PerspectiveCamera, distance: number) {
  return frustumHeightAtDistance(camera, distance) * camera.aspect;
}