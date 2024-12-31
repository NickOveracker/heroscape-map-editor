import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { Collapse, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { MdCreateNewFolder, MdExpandLess, MdExpandMore, MdFileDownload, MdUploadFile } from 'react-icons/md'
import React from 'react'
import LoadMapButtons from '../controls/LoadMapButtons'
import DownloadMapFileButtons from '../controls/DownloadMapFileButtons'
import useBoundStore from '../store/store'

export const DrawerList = ({
  toggleIsNavOpen,
}: {
  toggleIsNavOpen: (arg0: boolean) => void
}) => {
  const [isUploadOpen, setIsUploadOpen] = React.useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = React.useState(false);
  const toggleIsNewMapDialogOpen = useBoundStore((state) => state.toggleIsNewMapDialogOpen)
  const isNewMapDialogOpen = useBoundStore((state) => state.isNewMapDialogOpen)
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
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => { setIsDownloadOpen(false); setIsUploadOpen(false); toggleIsNavOpen(false); }}
    >
      <List>
        <ListItem disablePadding>
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
        </ListItem>

        {/* LOAD MAP */}
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <MdUploadFile />
          </ListItemIcon>
          <ListItemText primary="Load Map" />
          {isUploadOpen ? <MdExpandLess /> : <MdExpandMore />}
        </ListItemButton>
        <Collapse in={isUploadOpen} timeout="auto">
          <List component="div" disablePadding>
            <LoadMapButtons />
          </List>
        </Collapse>
        {/* DOWNLAD FILE */}
        <ListItemButton onClick={handleClickDownload}>
          <ListItemIcon>
            <MdFileDownload />
          </ListItemIcon>
          <ListItemText primary="Download Map File" />
          {isDownloadOpen ? <MdExpandLess /> : <MdExpandMore />}
        </ListItemButton>
        <Collapse in={isDownloadOpen} timeout="auto">
          <List component="div" disablePadding>
            <DownloadMapFileButtons />
          </List>
        </Collapse>

      </List>
    </Box>
  )
}
