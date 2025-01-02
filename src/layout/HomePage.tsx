import React from 'react'
import { Drawer } from '@mui/material'
import { DrawerList } from './DrawerList'
import HeaderNav from './HeaderNav'
import Controls from '../controls/Controls'
import World from '../world/World'
import CreateMapFormDialog from './CreateMapFormDialog'
import EditMapFormDialog from './EditMapFormDialog'
import { LoadMapInputs } from './LoadMapButtons'
import CameraSpeedDial from './CameraSpeedDial'

export default function HomePage() {
  const cameraControlsRef = React.useRef(undefined!)
  // https://robohash.org/you.png?size=200x200
  const [isNavOpen, setIsNavOpen] = React.useState(false)
  const toggleIsNavOpen = (s: boolean) => {
    setIsNavOpen(s)
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        padding: 0,
        margin: 0,
        backgroundColor: 'var(--outer-space)',
        justifyContent: 'space-between',
      }}
    >
      <CreateMapFormDialog />
      <EditMapFormDialog />
      <HeaderNav toggleIsNavOpen={toggleIsNavOpen} />
      <Drawer
        open={isNavOpen}
        // open={true} // DEV toggle
        onClose={() => toggleIsNavOpen(false)}
      >
        <DrawerList toggleIsNavOpen={toggleIsNavOpen} />
      </Drawer>
      <div
        style={{
          position: 'relative',
          width: '100%',
          flex: 1,
        }}
      >
        <CameraSpeedDial cameraControlsRef={cameraControlsRef} />
        <World cameraControlsRef={cameraControlsRef} />
      </div>
      <div
        style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          width: '100%',
          height: '30vh',
          background: 'var(--black)',
          overflow: 'auto',
        }}
      >
        <Controls />
        <LoadMapInputs />
      </div>
    </div>
  )
}
