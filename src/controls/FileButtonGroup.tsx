import { LoadSaveMapButtons } from './LoadSaveMapButtons'
import ExportJsonFileButton from './ExportJsonFileButton'
import ImportFileButton from './ImportFileButton'
import { ButtonGroup } from '@mui/material'
import ExportBinaryFileButton from './ExportBinaryFileButton'

const FileButtonGroup = () => {
  return (
    <ButtonGroup
      sx={{ padding: '10px' }}
      variant="contained"
      orientation="vertical"
      size={'small'}
      aria-label="Save and load map"
    >
      <LoadSaveMapButtons
      />
      <ExportBinaryFileButton />
      <ExportJsonFileButton />
      <ImportFileButton />
    </ButtonGroup>
  )
}

export default FileButtonGroup
