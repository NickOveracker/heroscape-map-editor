import { ChangeEvent } from 'react'
import { Button } from '@mui/material'
import { MdFileOpen } from 'react-icons/md'
import { GiDevilMask } from 'react-icons/gi'
import { processVirtualScapeArrayBuffer } from '../data/readVirtualscapeMapFile'

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

function readVirtualscapeMapFile(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const arrayBuffer = reader.result
      const virtualScapeMap = processVirtualScapeArrayBuffer(arrayBuffer as ArrayBuffer)
      resolve(virtualScapeMap)
    }
    reader.onerror = () => {
      reject(reader.error)
    }
    reader.readAsArrayBuffer(file)
  })
}

const ImportFileButton = () => {
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
            const jsonMap = {
              boardHexes: data.boardHexes,
              hexMap: data.hexMap,
            }
            console.log("🚀 ~ readJsonFile ~ jsonMap:", jsonMap)
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
  }
  const readVSFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0]
    if (!file) {
      return
    }

    try {
      const myMap: any = await readVirtualscapeMapFile(file)
      console.log('🚀 ~ readVSFile ~ myMap:', myMap)
    } catch (error) {
      console.error(error)
    }
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
    />
  )
}
