import React from 'react'
import { Box, List, Collapse, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Link } from '@mui/material'
import { MdCreateNewFolder, MdEdit, MdExpandLess, MdExpandMore, MdFileDownload, MdUploadFile } from 'react-icons/md'
import LoadMapButtons from '../controls/LoadMapButtons'
import DownloadMapFileButtons from '../controls/DownloadMapFileButtons'
import useBoundStore from '../store/store'

export const DrawerList = ({
  toggleIsNavOpen,
}: {
  toggleIsNavOpen: (arg0: boolean) => void
}) => {
  const hexMapName = useBoundStore(s => s.hexMap.name)
  const [isUploadOpen, setIsUploadOpen] = React.useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = React.useState(false);
  const toggleIsNewMapDialogOpen = useBoundStore((state) => state.toggleIsNewMapDialogOpen)
  const isNewMapDialogOpen = useBoundStore((state) => state.isNewMapDialogOpen)
  const toggleIsEditMapDialogOpen = useBoundStore((state) => state.toggleIsEditMapDialogOpen)
  const handleClick = (e: any) => {
    e?.stopPropagation()
    setIsUploadOpen(!isUploadOpen);
  };
  const handleClickDownload = (e: any) => {
    e?.stopPropagation()
    setIsDownloadOpen(!isDownloadOpen);
  };
  return (
    <Box
      sx={{ width: 250, height: '100%' }}
      role="presentation"
      onClick={() => { setIsDownloadOpen(false); setIsUploadOpen(false); toggleIsNavOpen(false); }}
    >
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 0,
          overflow: 'hidden'
        }}
      >

        <List
        >
          <Typography
            sx={{
              fontSize: '1.8em',
              textAlign: 'center',
              marginY: '20px',
            }}
            variant="h1"
          >{hexMapName}</Typography>
          <Divider />
          <ListItemButton onClick={() => toggleIsEditMapDialogOpen(true)}>
            <ListItemIcon>
              <MdEdit />
            </ListItemIcon>
            <ListItemText primary={"Edit Map Details"} />
          </ListItemButton>
          {/* DOWNLAD FILE */}
          <ListItemButton onClick={handleClickDownload}>
            <ListItemIcon>
              <MdFileDownload />
            </ListItemIcon>
            <ListItemText primary="Download Map File" />
            {isDownloadOpen ? <MdExpandLess /> : <MdExpandMore />}
          </ListItemButton>
          <Collapse in={isDownloadOpen} timeout="auto">
            <List component="div" >
              <DownloadMapFileButtons />
            </List>
          </Collapse>
          {/* CREATE NEW MAP */}
          <ListItemButton onClick={() => toggleIsNewMapDialogOpen(!isNewMapDialogOpen)}>
            <ListItemIcon
              sx={{
                color: 'inherit',
              }}
            >
              <MdCreateNewFolder />
            </ListItemIcon>
            <ListItemText primary={'Create New Map'} />
          </ListItemButton>

          {/* LOAD MAP */}
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <MdUploadFile />
            </ListItemIcon>
            <ListItemText primary="Load Map" />
            {isUploadOpen ? <MdExpandLess /> : <MdExpandMore />}
          </ListItemButton>
          <Collapse in={isUploadOpen} timeout="auto">
            <List component="div" >
              <LoadMapButtons />
            </List>
          </Collapse>
        </List>


        <div
        // style={{ overflow: 'clip' }}
        >
          <Divider />
          <Typography variant={"subtitle1"} paddingX={2} paddingY={1}>
            Made with ❤️ in Austin, Texas
          </Typography>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-evenly',
              marginBottom: '1rem'
            }}
          >
            <Link
              href={"mailto:contact@hexoscape.com"}
              underline="hover"
              sx={{
                fontSize: '1rem',
              }}
            >
              Contact
            </Link>
            <Link
              href={"https://www.paypal.com/donate/?business=FY675ZX49UCQN&no_recurring=1&item_name=For+my+more+affluent+users%2C+a+%241-10+thank-you+means+a+lot+to+me%2C+and+will+help+buy+time+to+improve+the+app.+Thanks+y%27all%21&currency_code=USD"}
              underline="hover"
              target="_blank"
              rel="noopener"
              sx={{
                fontSize: '1rem',
              }}
            >
              Donate
            </Link>
          </div>
        </div>
      </div>

    </Box>
  )
}
