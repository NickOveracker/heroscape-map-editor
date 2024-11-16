import { LoadSaveMapButtons } from './LoadSaveMapButtons'
import ExportFileButton from './ExportFileButton'
import ImportFileButton from './ImportFileButton'
import { ButtonGroup } from '@mui/material'

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
      <ExportFileButton />
      <ImportFileButton />
    </ButtonGroup>
  )
}

export default FileButtonGroup
