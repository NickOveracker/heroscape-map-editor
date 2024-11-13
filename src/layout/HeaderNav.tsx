import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import { MdMenu } from 'react-icons/md'

type Props = {
    toggleIsNavOpen: (arg0: boolean) => void
}

export default function HeaderNav({ toggleIsNavOpen }: Props) {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'var(--black)' }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => toggleIsNavOpen(true)}
                >
                    <MdMenu />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
