import React, { ChangeEvent } from 'react'
import { Box, List, Collapse, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Link } from '@mui/material'
import { MdExpandLess, MdExpandMore, MdInventory, MdOutlineInventory } from 'react-icons/md'
import LoadMapButtons from './LoadMapButtons'
import DownloadMapFileButtons from './DownloadMapFileButtons'
import useBoundStore from '../store/store'
import { useSnackbar } from 'notistack'
import JSONCrush from 'jsoncrush'
import { FcAddImage, FcDownload, FcLink, FcUpload, FcVlc } from 'react-icons/fc'
import { parse, ParseResult } from 'papaparse'
import { useLocalPieceInventory } from '../hooks/useLocalPieceInventory'
import { Pieces } from '../types'
import tsvTemplate from '/inventory_template.tsv?url';

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
  const personalInventoryTsvUploadElementID = 'tsvinventoryupload'
  const inventory = useLocalPieceInventory()
  const handleClick = (e: any) => {
    e?.stopPropagation()
    setIsUploadOpen(!isUploadOpen);
  };
  const handleClickDownload = (e: any) => {
    e?.stopPropagation()
    setIsDownloadOpen(!isDownloadOpen);
  };
  const handleClickUploadPersonalInventoryTsv = (e: any) => {
    e?.stopPropagation()
    const element = document.getElementById(personalInventoryTsvUploadElementID)
    if (element) {
      element.click()
    }
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
        message: `Map is too large to be stored in a URL. You can try downloading your map as a file and sharing the file.`,
        variant: 'error',
        autoHideDuration: 3000,
      })
      return
    }
    try {
      await navigator.clipboard.writeText(fullUrl);
      enqueueSnackbar({
        message: `Copied shareable map URL to clipboard!`,
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
        autoHideDuration: 30000,
        action: action
      })
    }
  }
  const readPersonalInventoryTsvFile = async (event: ChangeEvent<HTMLInputElement>) => {
    let file : File | undefined = event?.target?.files?.[0]
  
    if (!file) {
      return
    }
  
    try {
      parse<File>(file, {
          delimiter: '\t',
          header: true,
          complete: (results: ParseResult<Record<string, string>>) => {
              const dataMap: Record<string, number> = {}
              results.data.forEach(datum => {
                  if(Pieces.hasOwnProperty(datum.ID)) {
                      const id: string = Pieces[datum.ID]
                      dataMap[id] = parseInt(datum.Count)
                  }
              })
              inventory.setPieceInventory(dataMap)
              console.log(inventory.pieceInventory)
          },
          error: (err) => {
              console.error(err)
          }
      })
    } catch (error: any) {
      console.error(error)
    }
    event.target.value = '' // Reset the input value, otherwise choosing same file again will do nothing
  };

  return (
    <Box
      sx={{ width: 350, height: '100%' }}
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
          // overflow: 'hidden'
        }}
      >

        <List
        >
          <Typography
            sx={{
              fontSize: '1.8em',
              textAlign: 'center',
              marginY: '20px',
              wordBreak: 'break-all'
            }}
            variant="h1"
          >{hexMap.name}</Typography>
          <Divider />
          {/* OPEN EDIT MAP DETAILS DIALOG */}
          <ListItemButton onClick={() => toggleIsEditMapDialogOpen(true)}>
            <ListItemIcon>
              <FcVlc />
            </ListItemIcon>
            <ListItemText primary={"Edit Map Details"} />
          </ListItemButton>
          {/* COPY URL */}
          <ListItemButton onClick={onClickCopy}>
            <ListItemIcon>
              <FcLink />
            </ListItemIcon>
            <ListItemText primary="Copy Shareable URL" />
          </ListItemButton>

          {/* EXPAND DOWNLAD MAP FILE BTNS */}
          <ListItemButton onClick={handleClickDownload}>
            <ListItemIcon>
              <FcDownload />
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
              <FcAddImage />
            </ListItemIcon>
            <ListItemText primary={'Create New Map'} />
          </ListItemButton>

          {/* EXPAND LOAD MAP BTNS */}
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <FcUpload />
            </ListItemIcon>
            <ListItemText primary="Load Map" />
            {isUploadOpen ? <MdExpandLess /> : <MdExpandMore />}
          </ListItemButton>
          <Collapse in={isUploadOpen} timeout="auto">
            <List component="div" >
              <LoadMapButtons />
            </List>
          </Collapse>

          {/* LOAD PERSONAL PIECE INVENTORY */}
          <ListItemButton onClick={handleClickUploadPersonalInventoryTsv}>
            <ListItemIcon
              sx={{
                color: 'inherit',
              }}
            >
              <MdInventory />
            </ListItemIcon>
            <ListItemText primary={'Load Personal Inventory (.tsv)'} />
          </ListItemButton>

          { /* DOWNLOAD PERSONAL INVENTORY TSV TEMPLATE */ }
          <a style={{textDecoration: 'none', color: 'inherit'}} href={tsvTemplate} download="inventory_template.tsv">
            <ListItemButton>
              <ListItemIcon
                sx={{
                  color: 'inherit',
                }}
              >
                <MdOutlineInventory />
              </ListItemIcon>
              <ListItemText primary={'Download Inventory Template File'} />
            </ListItemButton>
          </a>
        </List>

        <input
          id={personalInventoryTsvUploadElementID}
          type="file"
          style={hiddenStyle}
          accept=".tsv"
          onChange={readPersonalInventoryTsvFile}
        />


        <div>
          <Divider />
          <Typography variant={"subtitle1"} paddingX={2} paddingY={1} align={'center'}>
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
          </div>
        </div>
      </div>
    </Box>
  )
}

const hiddenStyle = {
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1',
  overflow: 'hidden',
  position: 'absolute' as const,
  bottom: '0',
  left: '0',
  whiteSpace: 'nowrap',
  width: '1',
}
