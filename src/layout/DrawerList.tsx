import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link } from 'react-router'
import { ROUTES } from '../routes/ROUTES'
import { MdHome } from 'react-icons/md'

export const DrawerList = ({
  toggleIsNavOpen,
}: {
  toggleIsNavOpen: (arg0: boolean) => void
}) => {
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleIsNavOpen(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to={ROUTES.home}>
            <ListItemIcon
              sx={{
                color: 'inherit',
              }}
            >
              <MdHome />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
