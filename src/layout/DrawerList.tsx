import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import CreateMapFormDialog from './CreateMapFormDialog'
import { Collapse, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { MdExpandLess, MdExpandMore, MdFileDownload, MdUploadFile } from 'react-icons/md'
import React from 'react'
import LoadMapButtons from '../controls/LoadMapButtons'
import DownloadMapFileButtons from '../controls/DownloadMapFileButtons'

export const DrawerList = ({
  toggleIsNavOpen,
}: {
  toggleIsNavOpen: (arg0: boolean) => void
}) => {
  const [isUploadOpen, setIsUploadOpen] = React.useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = React.useState(false);

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
          <CreateMapFormDialog />
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
