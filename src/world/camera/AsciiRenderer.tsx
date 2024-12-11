import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { useMemo, useEffect, useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { AsciiEffect } from "three-stdlib";
import '../../layout/index.css'
export function AsciiRenderer({
  renderIndex = 1,
  characters = " .:-+*=%@#",
  bgColor = "black",
  fgColor = "white",
  invert = true,
  color = false,
  resolution = 0.175
}) {
  // Reactive state
  const { size, gl, scene, camera } = useThree();

  // Create effect
  const effect = useMemo(() => {
    const effect = new AsciiEffect(gl, characters, {
      invert,
      color,
      resolution
    });
    effect.domElement.style.position = "absolute";
    effect.domElement.style.top = "0px";
    effect.domElement.style.left = "0px";
    effect.domElement.style.pointerEvents = "none";
    return effect;
  }, [characters, invert, color, resolution]);

  // Styling
  useLayoutEffect(() => {
    effect.domElement.style.color = fgColor;
    effect.domElement.style.backgroundColor = bgColor;
  }, [fgColor, bgColor]);

  // Append on mount, remove on unmount
  useEffect(() => {
    gl.domElement.style.opacity = "0";
    gl?.domElement?.parentNode?.appendChild(effect.domElement);
    return () => {
      gl.domElement.style.opacity = "1";
      gl?.domElement?.parentNode?.removeChild(effect.domElement);
    };
  }, [effect]);

  // Set size
  useEffect(() => {
    effect.setSize(size.width, size.height);
  }, [effect, size]);

  // Take over render-loop (that is what the index is for)
  useFrame(() => {
    effect.render(scene, camera);
  }, renderIndex);

  // This component returns nothing, it is a purely logical
  return null;
}

export default function AsciiApp() {
  return (
    <div
      id="canvas-container"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: 'black',
      }}
    >

      <Canvas camera={{ position: [0, 20, 0] }}>
        <Suspense fallback={null}>
          <color attach="background" args={["black"]} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.45}
            penumbra={1}
            intensity={1}
          />
          <pointLight position={[-10, -10, -10]} />
          <ambientLight intensity={0.4} />
          <Model />
        </Suspense>
        <OrbitControls />
        <AsciiRenderer fgColor="white" bgColor="black" />
      </Canvas>
    </div>
  );
}

function Model() {
  const ref = useRef<any>(undefined!);
  // Rotate per frame
  useFrame((_state, delta) => {
    ref.current.rotation.x = ref.current.rotation.y += delta / 5;
    ref.current.rotation.y = ref.current.rotation.x += delta / 5;
  });

  return (
    <group dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <Box args={[10, 10, 10]} ref={ref} />
      </group>
    </group>
  );
}
