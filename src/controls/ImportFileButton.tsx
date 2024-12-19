import React, { ChangeEvent } from 'react'
import { Button } from '@mui/material'
import { MdFileOpen } from 'react-icons/md'
import { GiDevilMask } from 'react-icons/gi'
import readVirtualscapeMapFile from '../data/readVirtualscapeMapFile'
import buildupVSFileMap from '../data/buildupMap'
import useBoundStore from '../store/store'
import { MapState } from '../types'

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
  const readJsonFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event?.target?.files?.[0]
    console.log("🚀 ~ readJsonFile ~ file:", file)
    if (!file) {
      return
    }
    const fileReader = new FileReader()
    fileReader.onloadend = (): void => {
      if (typeof fileReader.result === 'string') {
        let data
        if (file.name.endsWith('.json')) {
          try {
            data = JSON.parse(fileReader.result)
            const jsonMap: MapState = {
              boardHexes: data.boardHexes,
              hexMap: data.hexMap,
              boardPieces: data.boardPieces,
            }
            loadMap(jsonMap)
          } catch (error) {
            console.error(error)
          }
        } else {
          throw new Error('Unknown File type to import')
        }
      }
    }
    try {
      fileReader.readAsText(file)
    } catch (error) {
      console.error(error)
    }
    event.target.value = ""; // Reset the input value
  }
  const readVSFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0]
    console.log("🚀 ~ readVSFile ~ file:", file)
    if (!file) {
      return
    }

    try {
      const myMap = await readVirtualscapeMapFile(file)
      const myVirtualscapeMap = buildupVSFileMap(myMap.tiles, file.name)
      loadMap(myVirtualscapeMap)
    } catch (error) {
      console.error(error)
    }
    event.target.value = ""; // Reset the input value
  }

  return (
    <>
      <Button
        startIcon={<MdFileOpen />}
        onClick={handleClickFileSelect}
        variant="contained"
      >
        Import Map File
      </Button>
      <Button
        startIcon={<GiDevilMask />}
        onClick={handleClickVSFileSelect}
        variant="contained"
      >
        Import VirtualScape File
      </Button>
      <ReadFile id={uploadElementID} readFile={readJsonFile} />
      <ReadVSFile id={virtualScapeUploadElementID} readFile={readVSFile} />
    </>
  )
}
export default ImportFileButton

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
      accept="application/json"
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
      // accept="application/json"
      onChange={readFile}
      onSubmit={readFile}
      multiple
    />
  )
}
