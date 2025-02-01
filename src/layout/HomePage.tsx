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

  // MUI BREAKPOINTS
  //   xs, extra-small: 0px
  // sm, small: 600px
  // md, medium: 900px
  // lg, large: 1200px
  // xl, extra-large: 1536px

  // const isScreenOver1200 = useMediaQuery('(min-width:1200px)');
  // const isScreenUnder900px = useMediaQuery('(max-width:900px)');

  const [isNavOpen, setIsNavOpen] = React.useState(false)
  const toggleIsNavOpen = (s: boolean) => {
    setIsNavOpen(s)
  }
  return (
    <>
      <CreateMapFormDialog />
      <EditMapFormDialog />
      <Drawer
        open={isNavOpen}
        // open={true} // DEV toggle
        onClose={() => toggleIsNavOpen(false)}
        keepMounted
      >
        <DrawerList toggleIsNavOpen={toggleIsNavOpen} />
      </Drawer>
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
        <HeaderNav isNavOpen={isNavOpen} toggleIsNavOpen={toggleIsNavOpen} />
        <div
          style={{
            // flex: 1,
            position: 'relative',
            width: '100%',
            height: '70vh',
          }}
        >
          <CameraSpeedDial cameraControlsRef={cameraControlsRef} />
          <World cameraControlsRef={cameraControlsRef} />
        </div>
        <div
          style={{
            flex: 1,
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
    </>
  )
}
