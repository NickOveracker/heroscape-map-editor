import { Drawer } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { DrawerList } from "../layout/DrawerList";
import HeaderNav from "../layout/HeaderNav";

export default function Layout() {
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
        keepMounted={true}
        open={isNavOpen}
        onClose={() => toggleIsNavOpen(false)}
      >
        <DrawerList toggleIsNavOpen={toggleIsNavOpen} />
      </Drawer>
      <HeaderNav toggleIsNavOpen={toggleIsNavOpen} />
      <div style={{
        width: '100%',
        flex: 1,
      }}
      ><Outlet /></div>
      <div style={{
        display: 'flex',
        flexFlow: 'column nowrap',
        width: '100%',
        height: '25vh',
        background: 'var(--black)',
        overflow: 'auto',
      }}
      >
        <span>CONTROLS WIP</span>
        {/* <HexxaformControls
          boardHexes={G.boardHexes}
          hexMap={G.hexMap}
          moves={moves}
          /> */}
      </div>
    </div>
  );
}

