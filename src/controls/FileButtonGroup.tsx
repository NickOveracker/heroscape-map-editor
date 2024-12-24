import { LoadSaveMapButtons } from './LoadSaveMapButtons'
import ExportJsonFileButton from './ExportJsonFileButton'
import ImportFileButton from './ImportFileButton'
import ControlButtonGroup from './ControlButtonGroup'
// import ExportBinaryFileButton from './ExportBinaryFileButton'

const FileButtonGroup = () => {
  return (
    <ControlButtonGroup>
      <LoadSaveMapButtons />
      {/* <ExportBinaryFileButton /> */}
      <ExportJsonFileButton />
      <ImportFileButton />
    </ControlButtonGroup>
  )
}

export default FileButtonGroup
