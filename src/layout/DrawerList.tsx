import React from 'react'
import { Box, List, Collapse, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Link } from '@mui/material'
import { MdCreateNewFolder, MdEdit, MdExpandLess, MdExpandMore, MdFileDownload, MdOutlineShare, MdUploadFile } from 'react-icons/md'
import LoadMapButtons from '../controls/LoadMapButtons'
import DownloadMapFileButtons from '../controls/DownloadMapFileButtons'
import useBoundStore from '../store/store'
import { useSnackbar } from 'notistack'
import JSONCrush from 'jsoncrush'

export const DrawerList = ({
  toggleIsNavOpen,
}: {
  toggleIsNavOpen: (arg0: boolean) => void
}) => {
  const hexMap = useBoundStore(s => s.hexMap)
  const boardPieces = useBoundStore(s => s.boardPieces)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
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
  const onClickCopy = async () => {
    const myUrl = encodeURI(
      JSONCrush.crush(
        JSON.stringify([
          hexMap, // 1
          ...Object.keys(boardPieces),
        ]),
      ),
    )
    const fullUrl = window.location.origin + window.location.pathname + '?m=' + myUrl
    if (fullUrl.length > 2082) {
      enqueueSnackbar({
        message: `Map is too big to be stored in a URL, sorry!`,
        variant: 'error',
        autoHideDuration: 3000,
      })
      return
    }
    try {
      await navigator.clipboard.writeText(fullUrl);
      enqueueSnackbar({
        message: `Copied shareable map URL to clipboard`,
        variant: 'success',
        autoHideDuration: 3000,
      })

    } catch (err) {
      console.log("Attempted clipboard write, failed:", err)
      const action: any = (snackbarId: string) => (
        <>
          {/* <button onClick={() => { alert(`I belong to snackbar with id ${snackbarId}`); }}>
            Undo
          </button> */}
          <button onClick={() => { closeSnackbar(snackbarId) }}>
            Dismiss
          </button>
        </>
      );
      enqueueSnackbar({
        message: `Failed to copy url to clipboard, here it is: ${fullUrl}`,
        variant: 'error',
        // autoHideDuration: 3000,
        action: action
      })
    }
  }
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
          >{hexMap.name}</Typography>
          <Divider />
          {/* OPEN EDIT MAP DETAILS DIALOG */}
          <ListItemButton onClick={() => toggleIsEditMapDialogOpen(true)}>
            <ListItemIcon>
              <MdEdit />
            </ListItemIcon>
            <ListItemText primary={"Edit Map Details"} />
          </ListItemButton>
          {/* COPY URL */}
          <ListItemButton onClick={onClickCopy}>
            <ListItemIcon>
              <MdOutlineShare />
            </ListItemIcon>
            <ListItemText primary="Copy Shareable URL" />
          </ListItemButton>

          {/* EXPAND DOWNLAD MAP FILE BTNS */}
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
          {/* OPEN CREATE MAP DIALOG */}
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

          {/* EXPAND LOAD MAP BTNS */}
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
              title="contact@hexoscape.com"
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
