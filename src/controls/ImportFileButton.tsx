import React, { ChangeEvent } from 'react'
import { Button } from '@mui/material'
import { MdFileOpen } from 'react-icons/md'
import { GiDevilMask } from 'react-icons/gi'
import readVirtualscapeMapFile, {
  readGzipMapFile,
} from '../data/readVirtualscapeMapFile'
import buildupVSFileMap, { buildupJsonFileMap } from '../data/buildupMap'
import useBoundStore from '../store/store'

const ImportFileButton = () => {
  const loadMap = useBoundStore((state) => state.loadMap)
  const uploadElementID = 'upload'
  const virtualScapeUploadElementID = 'vsupload'
  const handleClickFileSelect = () => {
    const element = document.getElementById(uploadElementID)
    if (element) {
      element.click()
    }
  }
  const handleClickVSFileSelect = () => {
    const element = document.getElementById(virtualScapeUploadElementID)
    if (element) {
      element.click()
    }
  }
  const readJsonFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0]
    if (!file) {
      return
    }
    try {
      const data = await readGzipMapFile(file)
      const jsonMap = buildupJsonFileMap(data.boardPieces, data.hexMap)
      if (!jsonMap.hexMap.name) {
        jsonMap.hexMap.name = file.name
      }
      loadMap(jsonMap)
    } catch (error) {
      console.error(error)
    }
    event.target.value = '' // Reset the input value, otherwise choosing same file again will do nothing
  }

  const readVSFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0]
    if (!file) {
      return
    }

    try {
      const myMap = await readVirtualscapeMapFile(file)
      const myVirtualscapeMap = buildupVSFileMap(myMap.tiles, myMap.name)
      loadMap(myVirtualscapeMap)
    } catch (error) {
      console.error(error)
    }
    event.target.value = '' // Reset the input value, otherwise choosing same file again will do nothing
  }

  return (
    <>
      <Button
        startIcon={<MdFileOpen />}
        onClick={handleClickFileSelect}
        variant="contained"
      >
        Import Gzip Map File (.gz)
      </Button>
      <Button
        startIcon={<GiDevilMask />}
        onClick={handleClickVSFileSelect}
        variant="contained"
      >
        Import VirtualScape File (.hsc)
      </Button>
      <ReadFile id={uploadElementID} readFile={readJsonFile} />
      <ReadVSFile id={virtualScapeUploadElementID} readFile={readVSFile} />
    </>
  )
}
export default ImportFileButton

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
type ReadFileProps = {
  id: string
  readFile: (event: ChangeEvent<HTMLInputElement>) => void
}
const ReadFile = ({ id, readFile }: ReadFileProps) => {
  return (
    <input
      id={id}
      type="file"
      style={hiddenStyle}
      accept=".gz"
      onChange={readFile}
    />
  )
}
const ReadVSFile = ({ id, readFile }: ReadFileProps) => {
  return (
    <input
      id={id}
      type="file"
      style={hiddenStyle}
      accept=".hsc"
      onChange={readFile}
    />
  )
}
