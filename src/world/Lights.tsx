
export default function Lights() {
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
