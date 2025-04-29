import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { MdMenu, MdPictureAsPdf } from 'react-icons/md'

type Props = {
  isNavOpen: boolean
  toggleIsNavOpen: (arg0: boolean) => void
  isPdfOpen: boolean
  toggleIsPdfOpen: (arg0: boolean) => void
}

export default function HeaderNav({
  isNavOpen,
  toggleIsNavOpen,
  isPdfOpen,
  toggleIsPdfOpen
}: Props) {
  // AppBar height is 64px when screen > 600px
  // AppBar height is 56px when screen < 600px
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
        <IconButton
          size="large"
          edge="end"
          aria-label="pdf"
          sx={{ mr: 2 }}
          onClick={() => toggleIsPdfOpen(!isPdfOpen)}
        >
          <MdPictureAsPdf />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
