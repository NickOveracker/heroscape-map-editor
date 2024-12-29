import React, { ChangeEvent } from 'react'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { MdFolderZip, MdOutlineHexagon } from 'react-icons/md'
import readVirtualscapeMapFile, {
  readGzipMapFile,
} from '../data/readVirtualscapeMapFile'
import buildupVSFileMap, { buildupJsonFileMap } from '../data/buildupMap'
import useBoundStore from '../store/store'

const LoadMapButtons = () => {
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
      <ReadFile id={uploadElementID} readFile={readJsonFile} />
      <ReadVSFile id={virtualScapeUploadElementID} readFile={readVSFile} />
      <ListItemButton
        sx={{ pl: 4 }}
        onClick={handleClickFileSelect}
      >
        <ListItemIcon>
          <MdFolderZip />
        </ListItemIcon>
        <ListItemText primary="Gzip/JSON (.gz/.json)" />
      </ListItemButton>
      <ListItemButton
        sx={{ pl: 4 }}
        onClick={handleClickVSFileSelect}
      >
        <ListItemIcon>
          <MdOutlineHexagon />
        </ListItemIcon>
        <ListItemText primary="Virtualscape (.hsc)" />
      </ListItemButton>
    </>
  )
}
export default LoadMapButtons

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
