import React from 'react'
import { Box, List, Collapse, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
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
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => { setIsDownloadOpen(false); setIsUploadOpen(false); toggleIsNavOpen(false); }}
    >
      <List>
        <Typography
          sx={{
            fontSize: '2rem',
            textAlign: 'center'
          }}
          variant="h1"
        >{hexMapName}</Typography>
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
    </Box>
  )
}
