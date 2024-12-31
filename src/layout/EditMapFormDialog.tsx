import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box, useMediaQuery } from '@mui/material'
import useBoundStore from '../store/store'
import { useSnackbar } from 'notistack'

export default function EditMapFormDialog() {
  const fullScreen = useMediaQuery('(max-width:600px)');
  const changeMapName = useBoundStore((state) => state.changeMapName)
  const mapName = useBoundStore((state) => state.hexMap.name)
  const toggleIsEditMapDialogOpen = useBoundStore((state) => state.toggleIsEditMapDialogOpen)
  const isEditMapDialogOpen = useBoundStore((state) => state.isEditMapDialogOpen)
  const handleClose = () => toggleIsEditMapDialogOpen(false)
  const { enqueueSnackbar } = useSnackbar()

  return (
    <React.Fragment>
      <Dialog
        open={isEditMapDialogOpen}
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth={!fullScreen}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const newMapName = formJson.newMapName;
            changeMapName(newMapName)
            enqueueSnackbar({
              message: `Updated Map Name: ${newMapName}`,
              autoHideDuration: 3000,
            })
            handleClose()
          },
        }}
      >
        <DialogTitle>Edit Map</DialogTitle>
        <DialogContent>
          <Box sx={{ marginY: '1em' }}>
            <TextField
              id="newMapName"
              name="newMapName"
              autoFocus
              required
              defaultValue={mapName}
              margin="dense"
              label="Map Title"
              type="text"
              fullWidth
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
