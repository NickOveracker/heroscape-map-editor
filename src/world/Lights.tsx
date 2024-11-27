import { Vector3 } from "three";

export default function Lights() {
  return (
    <>
      <ambientLight intensity={3} />
      {/* 4 in rectangle over top, shop-light style */}
      <directionalLight
        position={[0, 0, 1000]}
        castShadow
        // position={[50, 50, 50]}
        lookAt={() => new Vector3(0, 30, -1000)}
        color={"#fff"}
        intensity={1} />
      <directionalLight
        position={[0, 0, 1000]}
        castShadow
        // position={[50, 50, -50]}
        lookAt={() => new Vector3(0, 30, -1000)}
        color={"#f2f2e8"}
        intensity={1} />
      <directionalLight
        position={[0, 0, 1000]}
        castShadow
        // position={[-50, 50, 50]}
        lookAt={() => new Vector3(0, 30, -1000)}
        color={"#ffcd42"}
        intensity={1} />
      <directionalLight
        position={[0, 0, 1000]}
        castShadow
        // position={[-50, 50, -50]}
        lookAt={() => new Vector3(0, 30, -1000)}
        color={"#fff5b1"}
        intensity={1} />
      {/* <hemisphereLight args={['#fff5b1', '#ffcd42', 2]} /> */}


      {/* 4 on sides, picture-day style */}
      <directionalLight
        position={[0, 30, 1000]}
        castShadow
        // position={[-50, 0, 0]}
        lookAt={() => new Vector3(0, -30, -1000)}
        color={"#fff"}
        intensity={1} />
      <directionalLight
        position={[0, 30, 1000]}
        castShadow
        // position={[-50, 0, -50]}
        lookAt={() => new Vector3(0, -30, -1000)}
        color={"#f2f2e8"}
        intensity={1} />
      <directionalLight
        position={[0, 30, 1000]}
        castShadow
        // position={[0, 0, 0]}
        lookAt={() => new Vector3(0, -30, -1000)}
        color={"#ffcd42"}
        intensity={1} />
      <directionalLight
        position={[0, 30, 1000]}
        castShadow
        // position={[0, 0, -50]}
        lookAt={() => new Vector3(0, -30, -1000)}
        color={"#fff5b1"}
        intensity={1} />
    </>
  )
}
