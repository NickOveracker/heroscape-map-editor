import React from 'react'
import { Drawer, useMediaQuery } from '@mui/material'
import { DrawerList } from './DrawerList'
import HeaderNav from './HeaderNav'
import Controls from '../controls/Controls'
import World from '../world/World'
import CreateMapFormDialog from './CreateMapFormDialog'
import EditMapFormDialog from './EditMapFormDialog'
import { LoadMapInputs } from './LoadMapButtons'
import CameraSpeedDial from './CameraSpeedDial'
import PdfMapDisplay from '../PdfMapDisplay'
import useBoundStore from '../store/store'
import useAutoLoadMapFile from '../hooks/useAutoLoadMapFile'

export default function HomePage() {
  const cameraControlsRef = React.useRef(undefined!)
  const boardHexes = useBoundStore((state) => state.boardHexes)
  const boardPieces = useBoundStore((state) => state.boardPieces)
  const hexMap = useBoundStore((state) => state.hexMap)
  // https://robohash.org/you.png?size=200x200
  // USE EFFECT: automatically load up map from URL, OR from file
  useAutoLoadMapFile()


  // MUI BREAKPOINTS
  //   xs, extra-small: 0px
  // sm, small: 600px
  // md, medium: 900px
  // lg, large: 1200px
  // xl, extra-large: 1536px

  const isLargeScreenLayout = useMediaQuery('(min-width:1200px)');

  const [isNavOpen, setIsNavOpen] = React.useState(false)
  const toggleIsNavOpen = (s: boolean) => {
    setIsNavOpen(s)
  }
  const [isPdfOpen, setIsPdfOpen] = React.useState(false)
  const toggleIsPdfOpen = (s: boolean) => {
    setIsPdfOpen(s)
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
        }}
      >
        <HeaderNav
          isNavOpen={isNavOpen}
          toggleIsNavOpen={toggleIsNavOpen}
          isPdfOpen={isPdfOpen}
          toggleIsPdfOpen={toggleIsPdfOpen}
        />
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: isLargeScreenLayout ? 'row-reverse' : 'column',
            width: '100%',
            padding: 0,
            margin: 0,
            overflow: 'auto',
          }}
        >

          <div
            style={{
              flex: 1,
              position: 'relative',
              width: isLargeScreenLayout ? '70vw' : '100%',
              height: isLargeScreenLayout ? '100%' : '70vh',
            }}
          >
            {
              isPdfOpen ? (
                <PdfMapDisplay
                  boardHexes={boardHexes}
                  boardPieces={boardPieces}
                  hexMap={hexMap}
                />
              ) : (
                <>
                  <CameraSpeedDial cameraControlsRef={cameraControlsRef} />
                  <World cameraControlsRef={cameraControlsRef} />
                </>
              )
            }
          </div>
          <div
            style={{
              display: 'flex',
              flexFlow: 'column nowrap',
              width: isLargeScreenLayout ? '450px' : '100%',
              height: isLargeScreenLayout ? '100%' : '30vh',
              background: 'var(--black)',
              overflow: 'auto',
            }}
          >
            <Controls />
            <LoadMapInputs />
          </div>
        </div>
      </div>
    </>
  )
}
