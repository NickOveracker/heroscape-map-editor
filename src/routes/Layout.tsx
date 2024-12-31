import React, { PropsWithChildren } from 'react'
import { Drawer } from '@mui/material'
import { DrawerList } from '../layout/DrawerList'
import HeaderNav from '../layout/HeaderNav'
import Controls from '../controls/Controls'

export default function Layout(props: PropsWithChildren) {
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
      <Drawer
        // keepMounted={true} // don't know why this was enabled, but disabling closes collapse buttons in nav nicely
        open={isNavOpen}
        // open={true} // DEV toggle
        onClose={() => toggleIsNavOpen(false)}
      >
        <DrawerList toggleIsNavOpen={toggleIsNavOpen} />
      </Drawer>
      <HeaderNav toggleIsNavOpen={toggleIsNavOpen} />
      <div
        style={{
          width: '100%',
          flex: 1,
        }}
      >
        {props.children}
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
      </div>
    </div>
  )
}
