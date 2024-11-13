import { Drawer } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import { DrawerList } from "../layout/DrawerList";

export default function Root() {
  const [isNavOpen, setIsNavOpen] = React.useState(false)
  const toggleIsNavOpen = (s: boolean) => {
    setIsNavOpen(s)
  }
  return (
    <>
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
        <div><Outlet /></div>
        <div style={{
          width: '100%',
          // height: var(--middle-size),
          flex: 1,
        }}
        ><Outlet /></div>
        <div></div>
      </div>

    </>
  );
}

