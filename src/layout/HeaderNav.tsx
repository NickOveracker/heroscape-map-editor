import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { Md3dRotation, MdMenu, MdPictureAsPdf } from 'react-icons/md'
import { Typography } from '@mui/material'
import useBoundStore from '../store/store'

type Props = {
  isNavOpen: boolean
  toggleIsNavOpen: (arg0: boolean) => void
  isPdfOpen: boolean
  toggleIsPdfOpen: (arg0: boolean) => void
  is2DOpen: boolean
  toggleIs2DOpen: (arg0: boolean) => void
}

export default function HeaderNav({
  isNavOpen,
  toggleIsNavOpen,
  isPdfOpen,
  toggleIsPdfOpen,
  is2DOpen,
  toggleIs2DOpen
}: Props) {
  // AppBar height is 64px when screen > 600px
  // AppBar height is 56px when screen < 600px
  const hexMap = useBoundStore(s => s.hexMap)
  return (
    <AppBar
      position="static"
    // sx={{ backgroundColor: 'var(--black)' }}
    // sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} //drawer is 1200, appbar is 1100
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => toggleIsNavOpen(!isNavOpen)}
        >
          <MdMenu />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {hexMap.name || 'Hexoscape Map Editor'}
        </Typography>
        <IconButton
          size="large"
          // edge="end"
          aria-label="pdf"
          sx={{ mr: 2 }}
          onClick={() => toggleIsPdfOpen(!isPdfOpen)}
        >
          <MdPictureAsPdf />
        </IconButton>
        <IconButton
          size="large"
          // edge="end"
          aria-label={is2DOpen ? '3D Map' : '2D Map'}
          title={is2DOpen ? 'View 3D Map' : 'View 2D Map'}
          sx={{ mr: 2 }}
          onClick={() => toggleIs2DOpen(!is2DOpen)}
        >
          <Md3dRotation />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
